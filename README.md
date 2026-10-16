# Avorion Tools

A companion app for [Avorion](https://www.avorion.net/): a turret crafting planner, a map of your galaxy generated from the server seed, and a database of goods, factories and stations. Everything the app knows about the game is read from the installed game files.

Live: https://sovgut.github.io/avorion-tools/

## Features

- **Turret planner.** Group turrets into tabs (one per ship, for example), copy the component counts from the in-game turret factory, and get the cargo to buy, its volume and its cost at a price level you choose, from a cheap factory to the turret factory's supplier. Enter what is already in your hold and tick goods off as you buy them in the game; both come off the estimate. Save component sets as blueprints. With a galaxy loaded, every good still to buy shows its nearest producer.
- **Galaxy.** Type `/seed` in the game chat and enter the result. The app generates all 1,000,000 sectors the way the server does: faction territories, rifts, the barrier, every sector's template and name, and the stations in each sector, factory productions included. Layers show shipyards, equipment docks, turret factories, trading posts and more; the map shows the galaxy as it was generated, before players changed it.
- **Database.** Every good with price, volume and tags, the factories and mines that make it (all recipe variants and sizes, founding and upgrade costs from the game's own formulas), and what uses it: turrets, factories and consumer stations.
- Search (F2), English and Russian (names come from the game's own translations), and a mobile layout.

## How the data is built

```bash
npm run analyze -- <path to the Avorion installation>
```

Run it whenever the game updates, review the diff and commit it. The analyzer:

1. runs the game's data scripts (`goods`, `productions`, `turretingredients`, `weapontype`, `consumergoods`, `sectorspecifics`) and writes `src/generated/database.json`;
2. reads `data/localization/ru.po` into `src/generated/i18n/ru.json`;
3. copies the referenced icons to `public/game-icons`;
4. compiles the galaxy generation scripts and everything they include to JavaScript (`src/generated/galaxy-scripts.js`);
5. checks the API documentation for enum members the app does not know, and generates a test region to catch scripts that no longer run.

On Steam for Linux the game is usually at `~/.local/share/Steam/steamapps/common/Avorion`.

### Checking the galaxy against the game

```bash
npm run verify -- <path to the Avorion installation> [--seed <seed>] [--rows -160:-61]
```

Starts the game's dedicated server with a throwaway galaxy, has its own Lua dump the given rows of sectors and compares them with the app's generator, sector by sector. On Linux the server runs through Steam's Proton (set `PROTON` to a `proton` script if it is not found), which limits the seed to printable ASCII; on Windows it runs directly. When sectors differ, the server's galaxy folder and the dump are kept and their paths printed. Use it after a game update to confirm the map still matches.

## How galaxy generation works

Avorion generates its galaxy in Lua: `sectorspecifics.lua`, `factionsmap.lua`, `passagemap.lua`, the sector templates and `factorypredictor.lua`, on top of a few native functions. The app does not reimplement that logic. It compiles the game's scripts to JavaScript and runs them against:

- **a Lua 5.2 runtime** (`src/engine/lua`) that reproduces the game's embedded Lua 5.2.1 where scripts can observe it. Tables follow `ltable.c` exactly (array and hash parts, node placement, collision chains, rehash), because `pairs` order feeds weighted random choices; numbers hash the way an x86-64 build with `LUA_IEEE754TRICK` does. `table.sort`, string patterns and number formatting (msvcrt `%.14g`) are ports of the reference library.
- **the natives** (`src/engine/avorion`), recovered from `AvorionServer.exe`: `Random` is `std::mt19937_64` (`getInt(a, a)` answers without drawing), `Seed(string)` is `CityHash64WithSeed`, `SectorSeed` hashes the coordinates with a shift-xor byte hasher, `makeFastHash` chains Thomas Wang's integer mix, and `QuadTree` reproduces the game's tie-breaking. Enum values come from a running server, since the documentation lists names only.

The browser runs the generator on a pool of web workers and caches each galaxy in IndexedDB. A few results only the server knows are not predicted: names of AI factions and whether a neighbouring faction adds a trading post to a sector.

Tests compare natives and generated sectors with values dumped from a 2.5.13 server (`test/fixtures`).

## Development

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev        # http://localhost:5173/avorion-tools/
npm test           # vitest
npm run typecheck  # tsc -b
npm run lint       # biome check; `npm run format` applies fixes
npm run build
npm run deploy     # builds and publishes dist/ to GitHub Pages
```

Stack: Vite, React 19 with React Compiler, Redux Toolkit, React Router, Radix dialogs, CSS Modules, Biome.

| Path | Contents |
| :--- | :--- |
| `src/engine/lua` | Lua 5.2 runtime and the Lua → JavaScript compiler |
| `src/engine/avorion` | Avorion natives |
| `src/engine/galaxy` | the generator that drives the compiled scripts |
| `src/features` | planner, galaxy, database and search screens |
| `src/generated` | analyzer output (do not edit) |
| `analyzer` | `npm run analyze` |
| `tools/verify` | `npm run verify` |

Plans and saved data live in the browser's local storage; data saved by the previous version of the app is carried over on first start.

## License

MIT. Avorion and its assets belong to Boxelware; Avorion Tools is a community work, not created or maintained by Boxelware.
