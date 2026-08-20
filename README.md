# Skylog

Skylog is a personal Granblue Fantasy account planner for comparing teams,
weapon-grid milestones, backline projects, and character investments across all
six elements.

The current data is tailored to one account and is intended as a practical
Full Auto roadmap, not a universal tier list.

## Features

- Primary and alternative teams for every element
- Academy Magna and later progression grids
- Weapon artwork synchronized from GBF Wiki
- Local ownership checklists saved in the browser
- Extended Mastery priorities for the core Water frontline
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
```

## Notes

The planner and notes contain time-sensitive game recommendations. Check the
dates in each note before treating them as current advice.

Granblue Fantasy and its assets belong to Cygames. This is an unofficial fan
project and is not affiliated with or endorsed by Cygames.
