# Skylog master handover

Last updated: 2026-08-24

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

Finally, the Markdown plan was converted into Skylog and later split into
routed roadmap, guide, and reference surfaces. During that work the session:

- created the six-element visual planner;
- added primary/alternative team tabs and progression-grid tabs;
- added a 3-by-3 weapon-grid presentation with a prominent mainhand;
- removed dark gradients from character and weapon artwork;
- added versioned local weapon and exchange tracking;
- added frontline awakening and Over Mastery priorities for all six elements;
- separated broad, one-turn, and high-level Full Auto gacha targets and retained
  their source-backed account reasoning;
- added six Magna III summon presets and the intended double-Varuna layout;
- added a sourced Manadiver guide with account presets, skill configuration,
  Manatura choices, and one-turn notes;
- added a post-Manadiver class roadmap for unattended and low-intervention play;
- added pendant, Daily Point, event-reward, and weapon-skill references;
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
| `app/(skylog)/` | Routed roadmap, guide, and reference pages |
| `app/globals.css` | Main layout and responsive presentation |
| `components/shell/` | Desktop sidebar and mobile navigation sheet |
| `components/roadmaps/` | Six-element account roadmap presentation |
| `components/guides/` | Manadiver and post-Manadiver class guide presentation |
| `components/reference/` | Exchange and skill-level reference presentation |
| `components/ui/` | Reusable Radix-based interface primitives |
| `data/roadmaps.ts` | Account teams, grids, priorities, backlines, and mastery data |
| `data/roadmap-advice.ts` | Dated general, one-turn, high-level FA, and summon recommendations |
| `data/roadmap-identity.ts` | Immutable URL and checklist IDs for roadmap records |
| `data/guides/manadiver.ts` | Sourced Manadiver mechanics and account presets |
| `data/guides/class-roadmap.ts` | Sourced post-Manadiver unlock order and account boundaries |
| `data/reference/` | Exchange recommendations and skill-level tables |
| `lib/progress/` | Versioned local progress storage and legacy migration |
| `lib/weapons/assets.ts` | Direct weapon-art lookup from the generated manifest |
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
npx tsc --noEmit --incremental false
```

### Updating a character or team

1. Edit the appropriate entry in `plans` inside `data/roadmaps.ts`.
2. Keep exactly two meaningful team archetypes unless a third one serves a
   genuinely different encounter type.
3. Add a character `id` when GBF Wiki has matching portrait artwork.
4. When adding or reordering a team, add or reorder its literal ID in
   `data/roadmap-identity.ts`. Never change an existing ID merely because its
   display name changes: that ID preserves URLs and saved progress.
5. Update the corresponding element note with the reasoning and date.
6. Confirm that Primary and Alternative labels still match the intended order.

### Updating a weapon grid

1. Add the weapon's GBF Wiki English title to `scripts/weapon-catalog.json`.
2. Add aliases when the display name in `data/roadmaps.ts` differs.
3. When adding or reordering a weapon group, update the matching literal ID in
   `data/roadmap-identity.ts`. Existing IDs are immutable even when labels are
   corrected.
4. Run:

   ```bash
   npm run assets:weapons
   ```

5. Commit the catalog, both generated manifests, and the downloaded image.
6. Verify that expanded quantities still total ten visible slots and that the
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

No D1 database or R2 bucket is currently needed. Checklist state is stored only
in the user's browser through `localStorage`. The v2 schema uses immutable IDs;
the migration retains the legacy key and lets existing v2 values win.

## Known limitations and next work

- Account roadmap data remains centralized in one typed file; per-element files
  may become clearer if the research surface grows substantially.
- Several character cards still use initials because their portrait IDs have
  not been entered.
- Summon presets are recommendation-based because a complete summon-inventory
  import is not yet available.
- There is no inventory import, global search, or designed overview route; `/`
  intentionally redirects to the Water roadmap.
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
6. Run lint, type-check, and build. Commit or deploy only when the user asks.
