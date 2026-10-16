// npm run analyze -- <path to the Avorion installation>
// Rebuilds everything the app knows about the game from the installed game files.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkEnums } from './enums';
import { extractDatabase } from './extract';
import { GameFiles } from './game';
import { parsePo, selectTranslations } from './localization';
import { BUNDLE_DTS, collectClosure, compileBundle, findNativeReferences, GENERATION_ENTRIES } from './scripts';
import { smokeTestGalaxy } from './smoke';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(repo, 'src/generated');
const ICON_DIR = path.join(repo, 'public/game-icons');
const LANGUAGES: Record<string, string> = { ru: 'ru.po' };

function write(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function step<T>(title: string, fn: () => T): T {
  const t0 = Date.now();
  process.stdout.write(`• ${title}… `);
  const r = fn();
  process.stdout.write(`${Date.now() - t0} ms\n`);
  return r;
}

function main() {
  const gamePath = process.argv.slice(2).find((a) => !a.startsWith('--'));
  if (!gamePath) {
    console.error('Usage: npm run analyze -- <path to the Avorion installation>');
    process.exit(2);
  }
  const game = new GameFiles(gamePath);
  const version = game.version();
  console.log(`Avorion ${version} at ${game.root}`);
  const warnings: string[] = [];

  const { db, strings, icons, warnings: dbWarnings } = step('Reading goods, productions and turrets', () => extractDatabase(game));
  warnings.push(...dbWarnings);
  write(path.join(OUT_DIR, 'database.json'), `${JSON.stringify(db, null, 1)}\n`);

  step('Collecting translations', () => {
    for (const [lang, file] of Object.entries(LANGUAGES)) {
      const rel = `data/localization/${file}`;
      if (!game.exists(rel)) {
        warnings.push(`no ${rel}; ${lang} names stay in English`);
        continue;
      }
      const { translations, missing } = selectTranslations(parsePo(game.readText(rel)), strings);
      if (missing.length > 0)
        warnings.push(`${lang}: ${missing.length} strings have no translation (e.g. ${missing.slice(0, 3).join(', ')})`);
      write(path.join(OUT_DIR, 'i18n', `${lang}.json`), `${JSON.stringify(translations, null, 1)}\n`);
    }
  });

  step('Copying icons', () => {
    fs.rmSync(ICON_DIR, { recursive: true, force: true });
    fs.mkdirSync(ICON_DIR, { recursive: true });
    for (const icon of [...icons].sort()) {
      if (!game.exists(icon)) {
        warnings.push(`icon ${icon} is missing`);
        continue;
      }
      fs.writeFileSync(path.join(ICON_DIR, path.posix.basename(icon)), game.readBuffer(icon));
    }
  });

  const closure = step('Compiling galaxy generation scripts', () => {
    const c = collectClosure(game, GENERATION_ENTRIES);
    const header = `Avorion ${version}: ${c.files.length} scripts`;
    write(path.join(OUT_DIR, 'galaxy-scripts.js'), compileBundle(game, c.files, header));
    write(path.join(OUT_DIR, 'galaxy-scripts.d.ts'), BUNDLE_DTS);
    const stubs = findNativeReferences(game, c.files);
    write(path.join(OUT_DIR, 'galaxy-meta.json'), `${JSON.stringify({ version, scripts: c.files.length, stubs }, null, 1)}\n`);
    // the game ships these only inside the encrypted scripts.db; generation does not reach them
    const unexpected = [...new Set(c.unresolved.map((u) => u.name))].filter((n) => !n.startsWith('internal/'));
    for (const n of unexpected) warnings.push(`scripts include "${n}", which is not in data/scripts; it becomes an empty table`);
    return c;
  });

  step('Checking native enums against the API documentation', () => warnings.push(...checkEnums(game)));
  const smoke = step('Generating a test galaxy region', () => smokeTestGalaxy(game, closure.files));
  console.log(`  ${smoke.sectors} sectors, ${smoke.withContent} with content, ${smoke.stations} station sectors`);
  if (smoke.stubLeaks.length > 0) warnings.push(`stand-ins for natives reached generated data: ${smoke.stubLeaks.join(', ')}`);

  console.log(
    `\nDatabase: ${db.goods.length} goods, ${db.productions.length} productions, ${db.turrets.length} turret types, ${db.consumers.length} consumer stations`,
  );
  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  ! ${w}`);
  }
  console.log('\nDone. Review the diff in src/generated and public/game-icons, then commit it.');
}

main();
