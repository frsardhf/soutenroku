# Skylog

Skylog is a personal Granblue Fantasy account planner for comparing teams,
weapon-grid milestones, backline projects, and character investments across all
six elements.

The current data is tailored to one account and is intended as a practical
Full Auto roadmap, not a universal tier list.

## Features

- Primary and alternative teams for every element
- Routed Academy Magna, Magna III, and long-term progression grids
- Weapon artwork synchronized from GBF Wiki
- Versioned local ownership and monthly-exchange checklists saved in the browser
- Frontline awakening and Over Mastery priorities for all six elements
- Separate general-account, one-turn, and high-level Full Auto gacha targets with preserved reasoning
- Magna III summon presets for every element plus the double-Varuna destination
- A sourced Manadiver guide with account presets kept separate from generic advice
- A post-Manadiver class roadmap for unattended and low-intervention play
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

## Validate

```bash
npm run build
npm run lint
npx tsc --noEmit --incremental false
```

## Notes

The planner and notes contain time-sensitive game recommendations. Check the
dates in each note before treating them as current advice.

Granblue Fantasy and its assets belong to Cygames. This is an unofficial fan
project and is not affiliated with or endorsed by Cygames.
