// Read-only access to an Avorion installation.
import fs from 'node:fs';
import path from 'node:path';

/** Search order the game's scripts set up through package.path before calling include(). */
export const INCLUDE_PATTERNS = ['data/scripts/lib/?.lua', 'data/scripts/?.lua', 'data/scripts/sectors/?.lua', '?.lua', '?'];

export class GameFiles {
  readonly root: string;

  constructor(root: string) {
    this.root = path.resolve(root);
    const scripts = path.join(this.root, 'data', 'scripts');
    if (!fs.existsSync(scripts)) {
      throw new Error(`${this.root} does not look like an Avorion installation: data/scripts is missing`);
    }
  }

  exists(rel: string): boolean {
    return fs.existsSync(path.join(this.root, rel));
  }

  /** File contents as a byte string (one char per byte), the representation Lua strings use. */
  readBytes(rel: string): string {
    return fs.readFileSync(path.join(this.root, rel)).toString('latin1');
  }

  readText(rel: string): string {
    return fs.readFileSync(path.join(this.root, rel), 'utf8');
  }

  readBuffer(rel: string): Buffer {
    return fs.readFileSync(path.join(this.root, rel));
  }

  list(relDir: string, ext?: string): string[] {
    const dir = path.join(this.root, relDir);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => !ext || f.endsWith(ext))
      .map((f) => path.posix.join(relDir, f));
  }

  resolveInclude(name: string): string | undefined {
    for (const p of INCLUDE_PATTERNS) {
      const rel = p.replace('?', name);
      if (fs.existsSync(path.join(this.root, rel)) && fs.statSync(path.join(this.root, rel)).isFile()) return rel;
    }
    return undefined;
  }

  /** The game version: the newest data/release_notes/patchnotesX.Y.Z.txt. */
  version(): string {
    const versions = this.list('data/release_notes')
      .map((f) => /patchnotes(\d+)\.(\d+)(?:\.(\d+))?\.txt$/.exec(path.basename(f)))
      .filter((m): m is RegExpExecArray => m !== null)
      .map((m) => [Number(m[1]), Number(m[2]), Number(m[3] ?? 0)])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    const last = versions[versions.length - 1];
    return last ? last.join('.') : 'unknown';
  }
}
