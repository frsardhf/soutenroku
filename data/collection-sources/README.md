# Collection data sources

Snapshot captured from GBF Wiki on 3 September 2026 for Soutenroku's personal,
non-commercial collection tracker.

- `tracker.json`: [Collection Tracker](https://gbf.wiki/Collection_Tracker)
- `gamewith.json`: [Gamewith Grades](https://gbf.wiki/Character_Tier_List/Gamewith/Grades), including ratings and remarks
- `kamigame.json`: [Kamigame Grades](https://gbf.wiki/Character_Tier_List/Kamigame/Grades), including ratings and remarks

Rating remarks preserve the visible bullet hierarchy, linked terms, and inline
icons from the tier-list hover cards. Hidden tooltip definitions are excluded so
they do not get concatenated into the displayed summaries.

The Ratings pages were separately checked to reproduce their rating-band ×
element layout. Gamewith and Kamigame remain the rating sources; GBF Wiki is the
mirrored English presentation and collection metadata source.

GBF Wiki content is available under
[CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/3.0/). Rebuild the
served catalog after replacing these snapshots with:

```sh
npm run collection:build
npm run collection:check
```
