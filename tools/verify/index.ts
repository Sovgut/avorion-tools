// npm run verify -- <path to the Avorion installation> [--seed <seed>] [--rows <from>:<to>]
//
// Starts the game's dedicated server with a throwaway galaxy, has it dump sectors through its
// own Lua (via the server console's /run, read from commands.txt), and compares them with what
// the app's generator predicts. Run it after `npm run analyze` when the game updates.
// Linux runs AvorionServer.exe through Steam's Proton; Windows runs it directly.
import { type ChildProcess, spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GalaxyGenerator, type SectorInfo, SectorKind } from '../../src/engine/galaxy/generator';
import meta from '../../src/generated/galaxy-meta.json';
import { modules } from '../../src/generated/galaxy-scripts.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROWS_PER_RUN = 50;
/** Contents fields that are not stations, or that only the server can know. */
const IGNORED = new Set([
  'faction',
  'neighbor',
  'neighborTradingPosts',
  'seed',
  'ships',
  'stations',
  'defenders',
  'resourceAsteroids',
  'claimableAsteroids',
  'miners',
  'pirates',
]);

interface Options {
  game: string;
  seed: string;
  from: number;
  to: number;
}

function parseArgs(): Options {
  const args = process.argv.slice(2);
  const game = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
  if (!game) {
    console.error('Usage: npm run verify -- <path to the Avorion installation> [--seed <seed>] [--rows <from>:<to>]');
    process.exit(2);
  }
  const opt = (name: string) => {
    const i = args.indexOf(`--${name}`);
    return i === -1 ? undefined : args[i + 1];
  };
  const [from, to] = (opt('rows') ?? '-160:-120').split(':').map(Number);
  return { game: path.resolve(game), seed: opt('seed') ?? 'avorion-tools-verify', from: Math.max(-499, from), to: Math.min(500, to) };
}

interface Server {
  child: ChildProcess;
  galaxyDir: string;
  moddata: string;
  log: () => string;
}

function findProton(): string {
  if (process.env.PROTON) return process.env.PROTON;
  const roots = [path.join(os.homedir(), '.local/share/Steam/steamapps/common'), path.join(os.homedir(), '.steam/steam/steamapps/common')];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    const found = fs
      .readdirSync(root)
      .filter((d) => d.startsWith('Proton') && fs.existsSync(path.join(root, d, 'proton')))
      .sort()
      .reverse();
    if (found.length > 0) return path.join(root, found[0], 'proton');
  }
  throw new Error('Proton not found; set PROTON to the path of a Proton "proton" script');
}

function steamRoot(): string {
  for (const p of [path.join(os.homedir(), '.local/share/Steam'), path.join(os.homedir(), '.steam/steam')]) if (fs.existsSync(p)) return p;
  return path.join(os.homedir(), '.local/share/Steam');
}

function startServer(game: string, seed: string, work: string): Server {
  const galaxies = path.join(work, 'galaxies');
  fs.mkdirSync(galaxies, { recursive: true });
  const exe = path.join(game, 'bin', 'AvorionServer.exe');
  const args = ['--galaxy-name', 'verify', '--seed', seed, '--admin', 'admin', '--listed', 'false', '--use-steam-networking', 'false'];
  let child: ChildProcess;
  let moddata: string;
  if (process.platform === 'win32') {
    child = spawn(exe, [...args, '--datapath', galaxies], { cwd: game, stdio: 'ignore' });
    moddata = path.join(process.env.APPDATA ?? '', 'Avorion', 'moddata');
  } else {
    const prefix = path.join(os.homedir(), '.cache', 'avorion-tools', 'proton-prefix');
    fs.mkdirSync(prefix, { recursive: true });
    child = spawn(findProton(), ['run', exe, ...args, '--datapath', `Z:${galaxies}`], {
      cwd: game,
      stdio: 'ignore',
      env: {
        ...process.env,
        STEAM_COMPAT_DATA_PATH: prefix,
        STEAM_COMPAT_CLIENT_INSTALL_PATH: steamRoot(),
        SteamAppId: '445220',
        SteamGameId: '445220',
      },
    });
    moddata = path.join(prefix, 'pfx', 'drive_c', 'users', 'steamuser', 'AppData', 'Roaming', 'Avorion', 'moddata');
  }
  fs.mkdirSync(moddata, { recursive: true });
  const galaxyDir = path.join(galaxies, 'verify');
  const log = () => {
    if (!fs.existsSync(galaxyDir)) return '';
    const logs = fs
      .readdirSync(galaxyDir)
      .filter((f) => f.startsWith('serverlog'))
      .sort();
    return logs.length ? fs.readFileSync(path.join(galaxyDir, logs[logs.length - 1]), 'latin1') : '';
  };
  return { child, galaxyDir, moddata, log };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitFor(server: Server, text: string, timeoutMs: number): Promise<void> {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const log = server.log();
    if (log.includes(text)) return;
    // the console echoes each command, so only a printed failure (marker, then spacing) counts
    const err = /VERIFY_FAILED\s{2,}([^\r\n]*)/.exec(log);
    if (err) throw new Error(`the game's Lua failed: ${err[1]}`);
    await sleep(1000);
  }
  throw new Error(`timed out waiting for "${text}" in the server log`);
}

/** Runs a Lua file from moddata through the console; io in the game's sandbox only reaches moddata. */
function run(server: Server, script: string) {
  const cmd = `/run local fh = io.open("moddata/${script}", "r"); local src = fh:read("*a"); fh:close(); local fn, err = load(src, "${script}", "t", _ENV); if not fn then print("VERIFY_FAILED", err) else local ok, e = pcall(fn); if not ok then print("VERIFY_FAILED", tostring(e)) end end`;
  fs.writeFileSync(path.join(server.galaxyDir, 'commands.txt'), `${cmd}\n`);
}

interface Row {
  kind: string;
  faction: string;
  template: string;
  name: string;
  gates: string;
  generationSeed: string;
  stations: string;
  productions: string;
}

function parseDump(file: string): Map<string, Row> {
  const rows = new Map<string, Row>();
  for (const line of fs.readFileSync(file, 'latin1').split(/\r?\n/)) {
    if (!line) continue;
    const p = line.split('\t');
    const stations = p[8]
      .split(',')
      .filter(Boolean)
      .map((kv) => kv.split('='))
      .filter(([k, v]) => !IGNORED.has(k) && !k.endsWith('Estimation') && Number(v) > 0)
      .map(([k, v]) => `${k}=${v}`)
      .sort()
      .join(',');
    rows.set(`${p[0]}:${p[1]}`, {
      kind: p[2],
      faction: p[3],
      template: p[4],
      name: p[5],
      gates: p[6],
      generationSeed: p[7] === 'nil' ? '' : p[7],
      stations,
      productions: p[9] === '|' ? '' : (p[9] ?? ''),
    });
  }
  return rows;
}

function describe(s: SectorInfo): Row {
  const kind = s.kind === SectorKind.Regular ? 'R' : s.kind === SectorKind.Offgrid ? 'O' : s.kind === SectorKind.Blocked ? 'B' : '';
  return {
    kind,
    faction: s.faction === undefined ? 'nil' : String(s.faction),
    template: s.template,
    name: s.name,
    gates: String(s.gates),
    generationSeed: s.generationSeed,
    stations:
      s.kind === SectorKind.Regular
        ? Object.entries(s.stations ?? {})
            .map(([k, v]) => `${k}=${v}`)
            .sort()
            .join(',')
        : '',
    productions:
      s.kind === SectorKind.Regular && (s.factories || s.mines) ? `${(s.factories ?? []).join(';')}|${(s.mines ?? []).join(';')}` : '',
  };
}

async function main() {
  const o = parseArgs();
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'avorion-verify-'));
  console.log(`Starting AvorionServer for seed "${o.seed}" in ${work}…`);
  const server = startServer(o.game, o.seed, work);
  try {
    await waitFor(server, 'Server startup complete.', 240_000);
    const source = fs.readFileSync(path.join(here, 'lua', 'galaxy.lua'), 'utf8');
    for (let y = o.from; y <= o.to; y += ROWS_PER_RUN) {
      const to = Math.min(o.to, y + ROWS_PER_RUN - 1);
      fs.writeFileSync(
        path.join(server.moddata, 'verify-galaxy.lua'),
        `GT_FROM = ${y}\nGT_TO = ${to}\nGT_RESET = ${y === o.from}\n${source}`,
      );
      run(server, 'verify-galaxy.lua');
      await waitFor(server, `VERIFY ROWS DONE ${to}`, 600_000);
      console.log(`  dumped rows ${y}..${to}`);
    }
  } finally {
    fs.writeFileSync(path.join(server.galaxyDir, 'commands.txt'), '/stop\n');
    await sleep(5000);
    server.child.kill();
  }

  const truth = parseDump(path.join(server.moddata, 'verify-galaxy.tsv'));
  const gen = new GalaxyGenerator({ settings: { seed: o.seed, mapFactions: 350, rifts: 200, barrier: true }, modules, stubs: meta.stubs });
  let sectors = 0;
  const mismatches: string[] = [];
  for (let y = o.from; y <= o.to; y++) {
    for (let x = -499; x <= 500; x++) {
      sectors++;
      const got = describe(gen.sector(x, y));
      const want = truth.get(`${x}:${y}`);
      const a = got.kind ? JSON.stringify(got) : '';
      const b = want ? JSON.stringify(want) : '';
      if (a !== b) mismatches.push(`${x}:${y}\n    app:  ${a || '(empty)'}\n    game: ${b || '(empty)'}`);
    }
  }
  console.log(`\nCompared ${sectors} sectors with the game: ${sectors - mismatches.length} match, ${mismatches.length} differ.`);
  for (const m of mismatches.slice(0, 20)) console.log(`  ${m}`);
  fs.rmSync(work, { recursive: true, force: true });
  process.exit(mismatches.length === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
