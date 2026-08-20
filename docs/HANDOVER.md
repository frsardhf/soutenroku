# Skylog master handover

Last updated: 2026-08-20

## Purpose of this project

Skylog turns one Granblue Fantasy account's research and progression plan into a
visual reference. It is designed for a casual, Full Auto-oriented player who
wants reliable event and Guild War rewards without building every premium grid
or optimizing for competitive racing.

The site answers four practical questions for each element:

1. Which owned characters form the primary and alternative teams?
2. Which Magna weapons should be used now and farmed next?
3. Which limited characters, summons, Evokers, and Eternals deserve future
   investment?
4. Which recommendations are account-specific rather than universal tier-list
   advice?

## Purpose and summary of the originating session

The session began as Japanese-community research into character value, team
archetypes, and Magna-versus-Primal investment. It covered Summer Galleon,
Yukata Ilsa, Payila/Haila, Grand Narmaya, Grand Zeta, Sandira, Grand Sariel and
other current targets. It also examined how Japanese ratings should be read,
spark and Sierotix priorities, Optimus summon investment, Belial/Beelzebub/Zero
uncaps, pendant-shop purchases, rings and earrings, class progression, creed
farming, weapon skill leveling, and Water Dark Opus choices.

The discussion then became an account audit. Character-list network payloads
were mapped by GBF character ID for Fire, Water, Earth, Wind, Light, and Dark.
Each element received two deliberately different teams instead of many minor
variants, plus backline projects and future spark targets. Detailed conclusions
were preserved in [`notes/`](../notes/).

Finally, the Markdown plan was converted into Skylog. During that build the
session:

- created the six-element visual planner;
- added primary/alternative team tabs and progression-grid tabs;
- added a 3-by-3 weapon-grid presentation with a prominent mainhand;
- removed dark gradients from character and weapon artwork;
- added local weapon ownership tracking;
- added Water frontline Extended Mastery priorities;
- added automatic local reload on Windows;
- created a GBF Wiki weapon-asset synchronization script;
- added exact Stage 7 Academy Magna grids for all six elements;
- made Sabrina the Earth primary team and Summer Azusa the Dark primary team;
- cleaned the starter repository and published it to GitHub.

Automation or gameplay scripting is intentionally not part of Skylog. The app
is a planning and reference tool only.

## Current account direction

These are concise routing decisions. The element notes remain authoritative for
details, substitutions, caveats, and roster evidence.

| Element | Current direction | Primary idea | Alternative idea |
| --- | --- | --- | --- |
| Fire | Remain Magna | Grand Zeta normal attacks | Sandira CA/Fated Chain |
| Water | Magna now, possible double Varuna later | Payila + Grand Gabriel + Grand Octavia | CA/high-difficulty core |
| Earth | Remain Magna | Sabrina fast normal attacks | Summer Seox general Full Auto |
| Wind | Remain Magna | Grand Narmaya fast normal attacks | Safer CA/long Full Auto |
| Light | Remain Magna | Summer Payila general Full Auto | Grand Cosmos CA team |
| Dark | Remain Magna | Summer Azusa CA team | Grand Lich skill/crest Full Auto |

General account philosophy:

- Use Magna where it already performs well for casual rewards.
- Do not spend Damascus bars merely because several Grand characters are owned.
- Treat Varuna as the most developed future Primal option, but complete the
  weapon and summon package before committing bars.
- Prefer deterministic upgrades such as Eternals, Evokers, Arcarum summons,
  sparks, and guaranteed shop resources.
- Revalidate seasonal and newly released characters against current Japanese
  testing before changing spark priorities.

## Repository map

| Path | Responsibility |
| --- | --- |
| `app/planner.tsx` | Account data, teams, grids, priorities, backlines, and mastery cards |
| `app/globals.css` | Main layout and responsive presentation |
| `app/card-assets.css` | Character and weapon artwork behavior |
| `app/weapon-asset-hydrator.tsx` | Applies generated weapon artwork to grid cards |
| `app/generated-weapon-assets.json` | Generated browser-side weapon mapping |
| `scripts/weapon-catalog.json` | Source list and aliases for weapon artwork |
| `scripts/sync-weapon-assets.mjs` | Resolves and downloads weapon images from GBF Wiki |
| `public/weapon-assets/` | Committed weapon images and generated manifest |
| `notes/` | Detailed account research and historical decisions |
| `worker/index.ts` | Cloudflare-compatible vinext worker entry point |
| `.openai/hosting.json` | OpenAI Sites project association; not required by direct Cloudflare hosting |

## Normal maintenance workflow

Install and run with Node.js 22.13 or newer:

```bash
npm install
npm run dev
```

Windows users can run `run-local.cmd`. The watcher uses polling on Windows, so
source edits should appear without restarting the command window.

Before committing application changes:

```bash
npm run lint
npm run build
```

### Updating a character or team

1. Edit the appropriate entry in `plans` inside `app/planner.tsx`.
2. Keep exactly two meaningful team archetypes unless a third one serves a
   genuinely different encounter type.
3. Add a character `id` when GBF Wiki has matching portrait artwork.
4. Update the corresponding element note with the reasoning and date.
5. Confirm that Primary and Alternative labels still match the intended order.

### Updating a weapon grid

1. Add the weapon's GBF Wiki English title to `scripts/weapon-catalog.json`.
2. Add aliases when the display name in `app/planner.tsx` differs.
3. Run:

   ```bash
   npm run assets:weapons
   ```

4. Commit the catalog, both generated manifests, and the downloaded image.
5. Verify that expanded quantities still total ten visible slots and that the
   first slot is the intended mainhand.

Do not manually edit `app/generated-weapon-assets.json` or
`public/weapon-assets/manifest.json`; the synchronization script owns them.

## Research-note structure

- `notes/README.md` is the index.
- The six element files are the current account plans.
- `gbf-conversation-research-log.md` stores cross-element mechanics and broader
  conclusions.
- `gbf-fire-varuna-plan.md` is a historical combined archive and should not
  override the newer Fire and Water files.

When advice changes, update the current element note and its visible planner
data together. Preserve useful older reasoning only when it helps explain why a
decision changed.

## Hosting status

The source repository is:

<https://github.com/frsardhf/skylog>

It is not yet deployed publicly. The current project supports the OpenAI Sites
workflow and includes `.openai/hosting.json`, but the intended future direction
may be direct Cloudflare deployment on the free tier.

For direct Cloudflare deployment:

1. Decide whether OpenAI Sites support should be retained.
2. If it is removed, delete `.openai/hosting.json`, remove `sites()` from
   `vite.config.ts`, remove `@openai/sites-vite-plugin`, and refresh the lockfile
   in one change.
3. Add and test explicit Cloudflare deployment configuration rather than
   assuming the OpenAI Sites project metadata is used by Cloudflare.
4. Set `NEXT_PUBLIC_SITE_URL` to the final public origin so social metadata uses
   the correct absolute URL.

No D1 database or R2 bucket is currently needed. Ownership checkmarks are stored
only in the user's browser through `localStorage`.

## Known limitations and next work

- The planner data is embedded in one compact TypeScript file. Moving it to
  typed per-element data files would improve maintainability.
- Several character cards still use initials because their portrait IDs have
  not been entered.
- Extended Mastery cards currently focus on the reviewed Water frontline.
- Academy grids are exact starting templates; later Magna roadmaps still need
  inventory-aware refinement for several elements.
- Summon layouts are described in notes but do not yet have a visual planner.
- Recommendations are dated and can become obsolete after balance changes or
  new releases.
- The site is account-specific and should not be presented as a general GBF
  optimization calculator.

## Continuation checklist

At the start of a future session:

1. Pull `main` and read this handover plus `notes/README.md`.
2. Check the date and current game state before changing recommendations.
3. Ask for updated character, weapon, or summon payloads when inventory matters.
4. Preserve the casual Full Auto goal and the two-team-per-element structure.
5. Keep planner data and its matching note synchronized.
6. Run lint and build, then commit and push the verified change.
