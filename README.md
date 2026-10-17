# Avorion Tools

A companion app for [Avorion](https://www.avorion.net/): a turret crafting planner and a database of goods, factories and stations. Everything the app knows about the game is read from the installed game files.

Live: https://sovgut.github.io/avorion-tools/

## Features

- **Turret planner.** Group turrets into tabs (one per ship, for example), copy the component counts from the in-game turret factory, and get the cargo to buy, its volume and its cost at a price level you choose, from a cheap factory to the turret factory's supplier. Enter what is already in your hold and tick goods off as you buy them in the game; both come off the estimate. Save a turret's component counts, price and sector as a blueprint and load them onto another turret of the same type.
- **Database.** Every good with price, volume and tags, the factories and mines that make it (all recipe variants and sizes, founding and upgrade costs from the game's own formulas), and what uses it: turrets, factories and consumer stations.
- Search (F2), every language the game ships (English, German, Spanish, French, Japanese, Brazilian Portuguese, Russian and Simplified Chinese; game names come from the game's own translations), and layouts for phones and tablets.

## How the data is built

```bash
npm run analyze -- <path to the Avorion installation>
```

Run it whenever the game updates, review the diff and commit it. The analyzer:

1. runs the game's data scripts (`goods`, `productions`, `turretingredients`, `weapontype`, `consumergoods`) and writes `src/generated/database.json`;
2. finds the game's languages from `data/localization/*.xml` and writes each one's translations of the names the app shows to `src/generated/i18n/<tag>.json`, with the list in `src/generated/languages.json`;
3. copies the referenced icons to `public/game-icons`;
4. checks the API documentation for enum members the app does not know.

A language the game adds shows up in the app with the game's names translated; the app's own strings stay in English until `src/i18n/locales` has a file for its tag.

On Steam for Linux the game is usually at `~/.local/share/Steam/steamapps/common/Avorion`.

### How the analyzer runs game scripts

The analyzer runs the game's own Lua instead of reimplementing it, on:

- **a Lua 5.2 runtime** (`src/engine/lua`) that compiles scripts to JavaScript and reproduces the game's embedded Lua 5.2.1 where scripts can observe it: table iteration order (`ltable.c`), `table.sort`, string patterns and number formatting (msvcrt `%.14g`);
- **the natives** (`src/engine/avorion`), recovered from `AvorionServer.exe`: `Random` is `std::mt19937_64`, `Seed(string)` is `CityHash64WithSeed`. Enum values come from a running server, since the documentation lists names only.

Tests compare the natives with values dumped from a 2.5.13 server (`test/fixtures`).

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
| `src/engine/avorion` | Avorion natives and the VM the analyzer runs game scripts in |
| `src/features` | planner, database and search screens |
| `src/i18n/locales` | the app's own UI strings, one file per language, keyed by the English text |
| `src/generated` | analyzer output (do not edit) |
| `analyzer` | `npm run analyze` |

Plans and saved data live in the browser's local storage; data saved by the previous version of the app is carried over on first start.

## License

MIT. Avorion and its assets belong to Boxelware; Avorion Tools is a community work, not created or maintained by Boxelware.
