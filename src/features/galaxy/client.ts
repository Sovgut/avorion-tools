// Generates galaxies on a pool of workers, caches them in IndexedDB and shares the result with React.
import * as Comlink from 'comlink';
import { useSyncExternalStore } from 'react';
import type { SectorInfo } from '@/engine/galaxy/generator';
import meta from '@/generated/galaxy-meta.json';
import type { GalaxyWorkerApi, GenerateSettings } from './galaxy.worker';
import { cacheKey, emptyGalaxy, type GalaxyData, type GalaxyKey, MAX, MIN, mergeBlock } from './model';

export type GalaxyStatus =
  | { state: 'idle' }
  | { state: 'loading'; key: GalaxyKey; progress: number }
  | { state: 'ready'; key: GalaxyKey; data: GalaxyData }
  | { state: 'error'; key: GalaxyKey; message: string };

const BLOCK = 8; // rows; matches the 8×8 grid the game names sectors in
const KEEP = 3;

let status: GalaxyStatus = { state: 'idle' };
const listeners = new Set<() => void>();
const setStatus = (s: GalaxyStatus) => {
  status = s;
  for (const l of listeners) l();
};

export function useGalaxy(): GalaxyStatus {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => status,
  );
}

export function galaxyKey(p: GenerateSettings): GalaxyKey {
  return { ...p, seed: p.seed.trim(), version: meta.version };
}

// ------------------------------------------------------------------ workers

interface PoolWorker {
  worker: Worker;
  api: Comlink.Remote<GalaxyWorkerApi>;
}

let pool: PoolWorker[] = [];
let poolKey = '';

function poolSize(): number {
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  return Math.max(2, Math.min(8, cores - 1));
}

async function ensurePool(key: GalaxyKey): Promise<PoolWorker[]> {
  const k = cacheKey(key);
  if (poolKey === k && pool.length > 0) return pool;
  for (const w of pool) w.worker.terminate();
  pool = Array.from({ length: poolSize() }, () => {
    const worker = new Worker(new URL('./galaxy.worker.ts', import.meta.url), { type: 'module' });
    return { worker, api: Comlink.wrap<GalaxyWorkerApi>(worker) };
  });
  poolKey = k;
  const settings: GenerateSettings = { seed: key.seed, mapFactions: key.mapFactions, rifts: key.rifts, barrier: key.barrier };
  await Promise.all(pool.map((w) => w.api.init(settings)));
  return pool;
}

let generation = 0;

/** Makes the galaxy for `params` current, from cache or by generating it. */
export async function loadGalaxy(params: GenerateSettings): Promise<void> {
  const key = galaxyKey(params);
  if ((status.state === 'ready' || status.state === 'loading') && cacheKey(status.key) === cacheKey(key)) return;
  const run = ++generation;
  setStatus({ state: 'loading', key, progress: 0 });
  try {
    const cached = await readCache(key);
    if (run !== generation) return;
    if (cached) {
      setStatus({ state: 'ready', key, data: cached });
      return;
    }
    const workers = await ensurePool(key);
    const data = emptyGalaxy(key);
    const blocks: [number, number][] = [];
    // block starts on multiples of 8 so a block holds whole naming grid cells
    for (let y = Math.floor(MIN / BLOCK) * BLOCK; y <= MAX; y += BLOCK) blocks.push([Math.max(MIN, y), Math.min(MAX, y + BLOCK - 1)]);
    let done = 0;
    let next = 0;
    const worker = async (w: PoolWorker) => {
      while (next < blocks.length) {
        const [y0, y1] = blocks[next++];
        const block = await w.api.block(y0, y1);
        if (run !== generation) return;
        mergeBlock(data, block);
        done++;
        setStatus({ state: 'loading', key, progress: done / blocks.length });
      }
    };
    const [factions] = await Promise.all([workers[0].api.factions(), ...workers.map(worker)]);
    if (run !== generation) return;
    data.factions = factions;
    data.stations.sort((a, b) => a.i - b.i);
    data.bosses.sort((a, b) => a.i - b.i);
    setStatus({ state: 'ready', key, data });
    void writeCache(data);
  } catch (e) {
    if (run === generation) setStatus({ state: 'error', key, message: e instanceof Error ? e.message : String(e) });
  }
}

/** Full details of one sector from the current galaxy's scripts. */
export async function sectorDetails(key: GalaxyKey, x: number, y: number): Promise<SectorInfo> {
  const [w] = await ensurePool(key);
  return w.api.sector(x, y);
}

// ------------------------------------------------------------------ cache

const DB_NAME = 'avorion-tools';
const STORE = 'galaxies';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readCache(key: GalaxyKey): Promise<GalaxyData | undefined> {
  try {
    const db = await openDb();
    return await new Promise((resolve) => {
      const req = db.transaction(STORE).objectStore(STORE).get(cacheKey(key));
      req.onsuccess = () => resolve(req.result?.data);
      req.onerror = () => resolve(undefined);
    });
  } catch {
    return undefined;
  }
}

async function writeCache(data: GalaxyData): Promise<void> {
  try {
    const db = await openDb();
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    store.put({ data, at: Date.now() }, cacheKey(data.key));
    // keep only the most recent galaxies
    const all = await new Promise<{ key: IDBValidKey; at: number }[]>((resolve) => {
      const out: { key: IDBValidKey; at: number }[] = [];
      const cur = store.openCursor();
      cur.onsuccess = () => {
        const c = cur.result;
        if (!c) return resolve(out);
        out.push({ key: c.key, at: c.value.at });
        c.continue();
      };
      cur.onerror = () => resolve(out);
    });
    all.sort((a, b) => b.at - a.at);
    for (const old of all.slice(KEEP)) store.delete(old.key);
  } catch {
    // caching is best effort
  }
}
