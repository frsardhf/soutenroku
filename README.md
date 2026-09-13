# Soutenroku

Soutenroku is a personal Granblue Fantasy account planner for comparing teams,
weapon-grid milestones, backline projects, and character investments across all
six elements.

The current data is tailored to one account and is intended as a practical
Full Auto roadmap, not a universal tier list.

## Features

- Primary and alternative teams for every element
- Routed Academy Magna, Magna III, and long-term progression grids
- Weapon artwork synchronized from GBF Wiki
- Versioned local roadmap selections, ownership, uncaps, and monthly-exchange checklists saved in the browser
- Character and summon collection tracking with collection, rating, and grade comparison views
- Search and filters for element, ownership, rarity, ratings, grades, effects, series, obtain source, release year, race, specialty, and style
- Pasted GBF character and summon inventory-response imports, with unmatched-entry reporting
- Local JSON backup, merge, restore, and reset tools for roadmap and collection data
- Frontline awakening and Over Mastery priorities for all six elements
- Separate general-account, one-turn, and high-level Full Auto gacha targets with preserved reasoning
- Magna III summon presets for every element plus the double-Varuna destination
- A sourced Manadiver guide with account presets kept separate from generic advice
- A post-Manadiver class roadmap for unattended and low-intervention play
- A sourced Arcarum route covering the six damage summons, Haaselia, and later Evoker decisions
- Pendant, Daily Point, event-reward, and weapon-skill reference pages
- Detailed research notes in [`notes/`](./notes/)
- A technical and session handover in [`docs/HANDOVER.md`](./docs/HANDOVER.md)

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

On Windows, `run-local.cmd` starts the development server with automatic reload.

To refresh weapon artwork after editing `scripts/weapon-catalog.json`:

```bash
npm run assets:weapons
```

To rebuild and verify the served collection catalog after updating its source
snapshots:

```bash
npm run collection:build
npm run collection:check
```

## Validate

```bash
npm test
npm run lint
npx tsc --noEmit --incremental false
```

`npm test` verifies the collection catalog and then builds the production app.

## Notes

The planner and notes contain time-sensitive game recommendations. Check the
dates in each note before treating them as current advice.

Granblue Fantasy and its assets belong to Cygames. This is an unofficial fan
project and is not affiliated with or endorsed by Cygames.
