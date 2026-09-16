import { applyRevansRoadmapExtensions } from "./roadmap-revans";

export type Unit = { name: string; role: string; id?: string };
export type Grid = {
  name: string;
  tag: string;
  note: string;
  weapons: [string, string, string][];
};
export type Mastery = {
  name: string;
  status: "DONE" | "PENDING";
  priority: string;
  note: string;
};
export type Awakening = {
  name: string;
  type: "Attack" | "Defense" | "Multiattack" | "Balance";
  note: string;
};
export type OverMastery = {
  name: string;
  ring3: string;
  ring4: string;
  earring: string;
  note: string;
};
export type ArtifactPriority = {
  name: string;
  weapon: string;
  starter: string;
  alternative: string;
  ideal: string;
  reroll: string;
  avoid: string;
  note: string;
};
export type OpusGuide = {
  team: string;
  cap: string;
  pendulum: string;
  transcend: string;
  note: string;
};
export type McGuide = {
  className: string;
  ca: string;
  mainhand: string;
  skills: string[];
  note: string;
};
export type TeamGuideLink = { href: string; label: string };
export type Plan = {
  element: string;
  subtitle: string;
  color: string;
  current: string;
  teams: {
    name: string;
    mode: string;
    note: string;
    units: Unit[];
    mc?: McGuide;
    guide?: TeamGuideLink;
  }[];
  grids: Grid[];
  priorities: string[];
  backline: string[];
  opus: OpusGuide[];
  mastery?: Mastery[];
  awakenings: Awakening[];
  overMastery: OverMastery[];
  artifacts?: ArtifactPriority[];
};
const team = (
  name: string,
  mode: string,
  note: string,
  units: Unit[],
  mc?: McGuide,
  guide?: TeamGuideLink,
) => {
  if (name === "Entry Diaspora CA")
    return {
      name: "Diaspora host · CA 100 handoff",
      mode: "HOST PREP · CA ON",
      note: "Owned no-Okto host test. Aletheia accelerates CAs; Satyr shortens the unremovable debuffs; Holiday Anthuria supplies gauge and defense. Stop at γ 100% and request backup with 奥義100.",
      units,
      mc: mc
        ? {
            ...mc,
            note: "Full Auto ON · Full Guard OFF · Quick summon optional. Use the opening All-Potion if needed, stop at the 97-hit Emergency Repair omen, then do not attack further. Caim only works when every equipped weapon name—including Additional Weapons—is unique.",
          }
        : mc,
      guide: {
        href: "/raids/revans/diaspora",
        label: "Open the complete Diaspora host guide",
      },
    };
  return { name, mode, note, units, mc, guide };
};
const basePlans: Plan[] = [
  {
    element: "Fire",
    subtitle: "Magna",
    color: "#e45a3f",
    current: "Magna III farm · Tien 150 progression",
    teams: [
      team(
        "Zeta / Ragazzo fast normal",
        "SHORT FA · CA OFF",
        "Use this account-ready shell now. Grand Percival eventually replaces frontline Michael for the current meta Zeta / Percival / Ragazzo burst core; Michael then moves to reserve. Use Michael + Alanaan for burst or Michael + Fraux for safer Full Auto.",
        [
          {
            name: "Grand Zeta",
            role: "Frontline · main DPS",
            id: "3040499000",
          },
          {
            name: "Michael",
            role: "Frontline · utility for now",
            id: "3040440000",
          },
          {
            name: "Ragazzo",
            role: "Frontline · fast normal DPS",
            id: "3040481000",
          },
          {
            name: "Alanaan",
            role: "Backline · burst option",
            id: "3040167000",
          },
          {
            name: "Fraux",
            role: "Backline · sustain option",
            id: "3040161000",
          },
        ],
        {
          className: "Manadiver",
          ca: "OFF",
          mainhand: "Exo Maitrah Karuna · Attack awakening",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "This is the low-intervention short-fight configuration. Alanaan is not a generic idle reserve: select him when the route uses his swap or burst utility; otherwise keep Fraux behind Michael.",
        },
      ),
      team(
        "Tien 150 progression Full Auto",
        "GENERAL FA · CA ON",
        "Tien 150 is a legitimate modern Full Auto frontline, not merely a drop-rate flex. This is the attainable Zeta / Tien / Ragazzo version; Grand Percival ultimately replaces Ragazzo in the current stronger general-FA shell.",
        [
          {
            name: "Grand Zeta",
            role: "Frontline · attacker",
            id: "3040499000",
          },
          {
            name: "Tien",
            role: "Frontline · transcendence 150",
            id: "3040039000",
          },
          {
            name: "Ragazzo",
            role: "Frontline · interim DPS",
            id: "3040481000",
          },
          { name: "Michael", role: "Backline · Primarch", id: "3040440000" },
          {
            name: "Fraux",
            role: "Backline · long-FA sustain",
            id: "3040161000",
          },
        ],
        {
          className: "Manadiver",
          ca: "ON",
          mainhand: "Exo Maitrah Karuna · Attack awakening",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "Keep charge attacks on for ordinary unattended fights so Tien can use her charge-attack-triggered skill cycle. The proven faster 150HELL-style Tien route turns charge attacks off and uses Percival instead of this progression shell.",
        },
      ),
    ],
    grids: [
      {
        name: "Magna III farm",
        tag: "CURRENT",
        note: "General Full Auto destination for the saved Manadiver team. Three Ira staves are the boost core; two Ira axes supply skill supplemental damage, while Nilakantha keeps HP and stamina instead of copying a fragile one-sided burst grid.",
        weapons: [
          ["MH", "Exo Maitrah Karuna", "Attack awakening"],
          ["×3", "Colossus Cane Ira", "Boost + cap"],
          ["×2", "Colossus Bomber Ira", "Skill supplemental"],
          ["×1", "Nilakantha", "Stamina + HP"],
          ["×1", "Sol Remnant", "EX + TA echo"],
          ["×1", "Scythe of Renunciation", "Omega Opus"],
          ["×1", "Sword of Valorblaze", "23% seraphic"],
        ],
      },
    ],
    priorities: [
      "Farm 3 Ira staves + 2 Ira axes",
      "Attack-awaken Exo Maitrah Karuna",
      "Raise Colossus toward 250",
      "Transcend Tien to 150",
      "Grand Percival when the banner timing is right",
    ],
    backline: [
      "Michael + Fraux for general Full Auto",
      "Michael + Alanaan for short or swap-enabled burst",
    ],
    opus: [
      {
        team: "TEAM A · PRIMARY GENERAL FA",
        cap: "Beta · Skill DMG Cap",
        pendulum: "Pendulum of Strength (Stamina)",
        transcend: "Pendulum of Extremity",
        note: "Closest 2026 Fire FA evidence pairs Skill Cap on Opus with Normal Cap on Ultima and uses Extremity. This fits Zeta and Wilnas: normal turns remain central while their automatic skill hits still receive the non-duplicated cap slot. Temptation is only a short-fight swap.",
      },
    ],
    mastery: [
      {
        name: "Grand Zeta",
        status: "DONE",
        priority:
          "Skill DMG Cap ★3 → Crit ★3 ×2 → CA DMG Cap ★3 → HP ★3 → Defense ★3",
        note: "General Full Auto path. Her guaranteed TA comes from her own kit, so DATA nodes are unnecessary; skill cap and critical nodes strengthen both her automatic skill damage and normal turns.",
      },
      {
        name: "Michael",
        status: "DONE",
        priority:
          "Skill DMG Cap ★3 ×2 → CA DMG Cap ★3 → Fire ATK ★3 → Crit ★3 ×2",
        note: "Full 18-star frontline setup from the current JP guide. The two cap nodes amplify her recurring dispel/slow skill, while CA cap supports the charge-attack cadence that builds Eclipse.",
      },
      {
        name: "Grand Wilnas",
        status: "DONE",
        priority:
          "Skill DMG Cap ★3 ×2 → Crit ★3 ×2 → CA DMG ★3 → LB Support ★3",
        note: "Do not spend LB on DATA: outside his post-CA guaranteed TA, his passive prevents multiattacks. Skill cap boosts Flame Claw every normal turn; his support LB adds charge bar when counters trigger.",
      },
    ],
    awakenings: [
      {
        name: "Grand Zeta",
        type: "Multiattack",
        note: "JP default for her high personal damage: the 5% normal-attack damage remains valuable even though her own kit guarantees TA. Swap to Attack only when this Magna grid cannot reach cap.",
      },
      {
        name: "Michael",
        type: "Multiattack",
        note: "TA helps her frontline cycle and the normal-damage bonus suits general Full Auto. Defense is the explicit high-difficulty swap when HP is the failure point.",
      },
      {
        name: "Grand Wilnas",
        type: "Attack",
        note: "His passive prevents ordinary multiattacks, so Multiattack is largely wasted outside the post-CA guaranteed TA turn. Attack also strengthens his extreme charge attack.",
      },
    ],
    overMastery: [
      {
        name: "Grand Zeta",
        ring3: "Stamina 5–10",
        ring4: "DEF 10–20%",
        earring: "Supplemental DMG 5–12",
        note: "JP rates Stamina as the general ring target and Supplemental as the best earring. DEF is the Full Auto fourth-slot choice because her kit already guarantees TA.",
      },
      {
        name: "Michael",
        ring3: "Stamina 5–10",
        ring4: "TA 5–10%",
        earring: "TA 5–12%",
        note: "Prioritize TA rolls: more triple attacks accelerate her frontline cycle. Stamina is the JP first-choice third roll.",
      },
      {
        name: "Grand Wilnas",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "DEF 10–20%",
        earring: "Stamina 5–12",
        note: "Skill cap strengthens Flame Claw, while Stamina suits his extreme CA. DATA rolls are dead outside his post-CA guaranteed-TA turn.",
      },
    ],
  },
  {
    element: "Water",
    subtitle: "Magna → Varuna",
    color: "#1599c4",
    current: "Magna III progression · Haaselia 5★ next",
    teams: [
      team(
        "Payila general Full Auto",
        "GENERAL FA · CA ON",
        "This is the owned general-use team, not a claim that Octavia is a substitute Water Zeta. Grand Yatima replaces Octavia when automatic dispels, durability, or Octavia's HP and TA conditions matter more than her post-attack damage.",
        [
          { name: "Payila", role: "Frontline · main DPS", id: "3040502000" },
          {
            name: "Grand Gabriel",
            role: "Frontline · echo / dispel",
            id: "3040492000",
          },
          {
            name: "Grand Octavia",
            role: "Frontline · post-attack DPS",
            id: "3040644000",
          },
          {
            name: "Haaselia",
            role: "Backline · first Water project",
            id: "3040168000",
          },
          {
            name: "Maria Theresa",
            role: "Backline · later utility",
            id: "3040160000",
          },
        ],
        {
          className: "Manadiver",
          ca: "ON",
          mainhand: "Ultima Staff (Water) · general-use option",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "Keep this as the low-intervention general template. The Omega Opus is reserved for the Falsehood short preset in the long-term two-Opus split, so do not force it into this team merely because Manadiver can equip it.",
        },
      ),
      team(
        "Yatima mechanic-heavy Full Auto",
        "DIFFICULT FA · CA ON",
        "Yatima, Gabriel and Octavia provide overlapping automatic or repeatable dispels for buff-heavy fights. This is the owned account adaptation; individual bosses can still require a defensive replacement rather than another damage dealer.",
        [
          {
            name: "Grand Yatima",
            role: "Frontline · automatic utility",
            id: "3040566000",
          },
          {
            name: "Grand Gabriel",
            role: "Frontline · echo / dispel",
            id: "3040492000",
          },
          {
            name: "Grand Octavia",
            role: "Frontline · damage / dispel",
            id: "3040644000",
          },
          {
            name: "Haaselia",
            role: "Backline · first Water project",
            id: "3040168000",
          },
          {
            name: "Maria Theresa",
            role: "Backline · dispel response",
            id: "3040160000",
          },
        ],
        {
          className: "Fighter Origin",
          ca: "ON",
          mainhand: "Fateless · defensive Full Auto",
          skills: ["Beast Fang", "Unlimited Boost", "Woolvhedin"],
          note: "This is the modern defensive class target seen in current 250HELL templates. Until Fighter Origin is unlocked, use Manadiver with the same frontline; do not repurpose the Wamdus Kengo preset as the generic difficult-fight team.",
        },
      ),
    ],
    grids: [
      {
        name: "Magna III",
        tag: "CURRENT",
        note: "Farm this before committing bars to a Primal weapon package. Personal Varuna is not required to test the later single-sided grid.",
        weapons: [
          ["MH", "Dark Opus", "Core"],
          ["×2", "Levi Gaze Mare", "Boost"],
          ["×2", "Levi Cranium Mare", "Stamina"],
          ["×2", "Wamdus Spear", "Supplemental"],
          ["×1", "Levi Spear", "Crit adjust"],
          ["×1", "Celestial Staff", "Cap"],
          ["×1", "Gabriel Wand", "Seraphic"],
        ],
      },
      {
        name: "Kengo CA",
        tag: "SPECIALIST",
        note: "Dedicated CA-on Full Auto target, not the default Payila grid. Kaneshige Devilry sustains gauge; Tyros Zither supplies boostable Sentence cap, while two Schrodingers add CA supplemental damage and 20% Special CA cap. Start with one Schrodinger and retain a second Cranium until Diaspora yields the second copy.",
        weapons: [
          ["MH", "Unsigned Kaneshige", "Water · Devilry emblem"],
          ["×2", "Levi Gaze Mare", "M3 boost + cap"],
          ["×1", "Levi Cranium Mare", "Stamina"],
          ["×1", "Tyros Zither", "CA DMG + CA cap"],
          ["×2", "Schrodinger", "CA supplemental + special cap"],
          ["×1", "Staff of Renunciation", "Omega Opus"],
          ["×1", "Altruism-Soul Staff", "General cap"],
          ["×1", "Wand of Charmtide", "23% seraphic"],
        ],
      },
      {
        name: "Single-sided Varuna",
        tag: "PRIMAL ENTRY",
        note: "Use an owned Providence or utility main summon and borrow Varuna 250. Two Rubea Stirias, Gabriel's passive and the exact crit pieces compensate for losing the second Varuna aura; verify 100% crit in the completed preset.",
        weapons: [
          ["MH", "Dark Opus", "Repudiation"],
          ["×2", "Rubea Stiria", "Exalto"],
          ["×1", "Taisai Bow", "Crit"],
          ["×1", "Galilei", "Crit + stamina"],
          ["×1", "Gabriel Dagger", "Supplemental"],
          ["×1", "Wamdus Spear", "Crit fill"],
          ["×1", "Knight of Ice", "Flex"],
          ["×1", "Ultima Staff (Water)", "1040410900 · cap keys"],
          ["×1", "Celestial / flex", "Cap"],
        ],
      },
      {
        name: "Double Varuna",
        tag: "LATER FLEX",
        note: "Personal Varuna 250 is a later durability and flexibility upgrade, not the transition gate. Use double-sided when boosted HP, Garrison, healing, TA or easier crit thresholds solve the encounter.",
        weapons: [
          ["MH", "Dark Opus", "Repudiation"],
          ["×2", "Rubea Stiria", "Exalto"],
          ["×1", "Taisai Bow", "Crit"],
          ["×1", "Galilei", "Crit + stamina"],
          ["×1", "Gabriel Dagger", "Supplemental"],
          ["×1", "Wamdus Spear", "Supplemental / crit"],
          ["×1", "Knight of Ice", "Defensive flex"],
          ["×1", "Ultima Staff (Water)", "1040410900 · cap keys"],
          ["×1", "Celestial / flex", "Cap"],
        ],
      },
      {
        name: "Hraes Ceiling",
        tag: "EXTREME",
        note: "Specialized Soldier setup; not casual Full Auto.",
        weapons: [
          ["MH", "Hraesvelgr", "150 moons"],
          ["×2", "Rubea Stiria", "Core"],
          ["×2", "Bridekeeper", "Supplemental"],
          ["×2", "Octavia Blade", "Deathstrike"],
          ["×1", "Taisai / Galilei", "Crit"],
          ["×1", "Dark Opus", "Core"],
          ["×1", "Destroyer", "Ceiling"],
        ],
      },
    ],
    priorities: [
      "Farm 2 Gaze + 2 Cranium",
      "Haaselia + The Moon",
      "Build Primal weapons; borrow Varuna 250",
      "Own Varuna 250 later",
    ],
    backline: [
      "Gabriel when not frontline",
      "Haaselia first",
      "Maria Theresa second",
    ],
    opus: [
      {
        team: "TEAM A · PRIMARY GENERAL FA",
        cap: "Beta · Skill DMG Cap",
        pendulum: "Strength for general FA · Falsehood for short burst",
        transcend: "Pendulum of Extremity",
        note: "Corrected from Alpha. Current Japanese Water grids put Skill Cap on Opus and Normal Cap on Ultima. Keep Strength for this CA-on unattended team; use Falsehood only with an Opus-mainhand short rotation, usually CA off except for the MC setup ougi.",
      },
    ],
    mastery: [
      {
        name: "Payila",
        status: "DONE",
        priority: "Water ATK ★3 ×2 → Crit ★3 ×3 → Skill DMG Cap ★3",
        note: "Normal-attack setup. She has permanent guaranteed TA, so do not spend LB on DATA. Raw ATK is only a fallback when you want deterministic damage instead of critical variance.",
      },
      {
        name: "Grand Gabriel",
        status: "DONE",
        priority: "Skill DMG Cap ★3 ×2 → Water ATK ★3 → TA ★3 ×2",
        note: "15 core stars. For the last 3, use Defense ★3 for casual Full Auto durability. TA helps her reliably generate Pargos and trigger her automatic damage/dispel.",
      },
      {
        name: "Grand Octavia",
        status: "DONE",
        priority: "TA ★3 ×3 → Skill DMG Cap ★3 ×2 → Water ATK ★3",
        note: "Full 18-star normal/skill setup. TA stabilizes her normal turns outside the 50% TA buff window; both cap nodes strengthen her post-attack and special-triggered skill damage.",
      },
    ],
    awakenings: [
      {
        name: "Payila",
        type: "Multiattack",
        note: "JP default once her normal attacks approach cap. Her guaranteed TA wastes the DATA portion, but the 5% normal-attack amplification scales every normal action and reattack. Attack is only an under-cap fallback for the current weak grid.",
      },
      {
        name: "Grand Gabriel",
        type: "Multiattack",
        note: "TA directly builds Pargos and increases the frequency of her automatic damage and dispel. The 5% normal-attack amplification remains useful after the team reaches its TA target.",
      },
      {
        name: "Grand Octavia",
        type: "Multiattack",
        note: "Preferred in the Payila normal team: the 5% normal-attack amplification scales her repeated attacks and post-CA assassin turn. Attack is a temporary alternative only while her normal and skill hits remain clearly under cap.",
      },
      {
        name: "Grand Yatima",
        type: "Defense",
        note: "Default for her medium/long-fight role. Extra HP and defense help her survive targeted turns while building delta Adaptation. Balance is an acceptable no-orb option; Multiattack is reserved for optimized fixed-turn routes.",
      },
      {
        name: "Grand Sylvia",
        type: "Defense",
        note: "Her owned-team role is CA sustain in difficult Full Auto, where survival is more valuable than personal damage. Attack is only a safe CA-farming specialization when durability is already solved.",
      },
    ],
    overMastery: [
      {
        name: "Payila",
        ring3: "Stamina 5–10",
        ring4: "DEF 10–20%",
        earring: "Supplemental DMG 5–12",
        note: "JP rates Stamina and Supplemental highest. Her permanent guaranteed TA makes a fourth-slot TA roll unnecessary, so keep a strong DEF pair for unattended play.",
      },
      {
        name: "Grand Gabriel",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "TA 5–10%",
        earring: "Supplemental DMG 5–12",
        note: "This is the explicit JP ideal pair: skill cap plus TA. TA builds Pargos; Supplemental improves her frequent multi-hit automatic skill.",
      },
      {
        name: "Grand Octavia",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "TA 5–10%",
        earring: "Supplemental DMG 5–12",
        note: "Skill cap and Supplemental scale her post-attack hits. TA is the practical fourth target until the team supplies enough to make her consistent.",
      },
    ],
    artifacts: [
      {
        name: "Payila",
        weapon: "Water Staff",
        starter: "Critical DMG Cap + CT10+ DMG Amplified",
        alternative: "Water ATK + Critical DMG Cap",
        ideal: "Water ATK / Critical DMG Cap / CT10+ DMG Amplified",
        reroll: "Add Water ATK in Group I",
        avoid: "TA; her passive already guarantees triple attacks.",
        note: "Secure Groups II and III first. All three skills meet the long-cooldown condition, while her repeated normal actions exploit the cap and amplification.",
      },
      {
        name: "Grand Gabriel",
        weapon: "Water Staff",
        starter: "TA + Skill DMG Cap",
        alternative: "Skill DMG Cap + Stackable DMG Cap",
        ideal: "TA / Skill DMG Cap / Stackable DMG Cap",
        reroll: "Add Stackable DMG Cap in Group III",
        avoid:
          "CA-specialist effects and penalty skills that reduce normal or skill cap.",
        note: "TA accelerates Pargos and her automatic two-hit damage/dispel. Skill cap is the immediate damage gain; the permanent Group III cap is the longer-FA completion roll.",
      },
      {
        name: "Grand Octavia",
        weapon: "Water Katana or Gun",
        starter: "Critical DMG Cap + CT10+ DMG Amplified",
        alternative: "TA + Critical DMG Cap",
        ideal: "TA / Critical DMG Cap / CT10+ DMG Amplified",
        reroll: "Add TA in Group I",
        avoid: "CA-specialist effects for this normal/skill frontline.",
        note: "The team already supplies substantial TA, so secure Groups II and III first. Her 13-turn first skill activates amplification on her double-strike burst turn.",
      },
    ],
  },
  {
    element: "Earth",
    subtitle: "Magna",
    color: "#aa7a45",
    current: "Magna III farm · Onmyoji unlocked",
    teams: [
      team(
        "General Full Auto",
        "CA ON",
        "Start here for ordinary long or mechanic-heavy fights. Five-star Cidala converts Onmyoji's buff and damage skills into automatic damage and dispels; Pholia and Satyr reward the higher charge-attack cadence.",
        [
          {
            name: "Cidala",
            role: "Frontline · core attacker",
            id: "3040377000",
          },
          {
            name: "Yukata Pholia",
            role: "Frontline · long-fight support",
            id: "3040469000",
          },
          {
            name: "Earth Satyr",
            role: "Frontline · sustain / dispel",
            id: "3040375000",
          },
          {
            name: "Summer Tikoh",
            role: "Backline · blue potion",
            id: "3040414000",
          },
          { name: "Uriel", role: "Backline · future target", id: "3040501000" },
        ],
        {
          className: "Onmyoji",
          ca: "ON",
          mainhand: "Exo Ashavan · 5★ Attack awakening",
          skills: [
            "Sealing Talisman",
            "Celestial Genesis",
            "Shikigami: Mizuchi",
            "Miserable Mist",
          ],
          note: "Use Execration or the Meditation configuration when a specific boss demands more dispels or omen control. This is the researched long-fight default, not the fastest class for trivial raids.",
        },
      ),
      team(
        "Sabrina fast normal",
        "SHORT FA · CA OFF",
        "This is the low-intervention normal setup. Sabrina supplies immediate full-HP damage, while Cidala and Pholia provide the stronger first-turn normal package.",
        [
          {
            name: "Sabrina",
            role: "Frontline · immediate DPS",
            id: "3040514000",
          },
          { name: "Cidala", role: "Frontline · attacker", id: "3040377000" },
          {
            name: "Yukata Pholia",
            role: "Frontline · assassin / TA",
            id: "3040469000",
          },
          { name: "Summer Tikoh", role: "Backline · safety", id: "3040414000" },
          { name: "Uriel", role: "Backline · future target", id: "3040501000" },
        ],
        {
          className: "Manadiver",
          ca: "OFF",
          mainhand: "Yggdrasil's Bough",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "Keep this as the short normal class. Luchador and Glorybringer can win specialized manual scripts, but Manadiver better matches unattended Full Auto.",
        },
      ),
      team(
        "Entry Diaspora CA",
        "CA ON",
        "No Okto investment. Aletheia supplies charge and strong CAs; Satyr and Holiday Anthuria keep the loop stable. Grand Bhaisa is the future CA-core upgrade, adding opening reactivation and gauge plus recurring healing and CA support.",
        [
          { name: "Aletheia", role: "Frontline · CA DPS", id: "3040002000" },
          {
            name: "Earth Satyr",
            role: "Frontline · CA sustain",
            id: "3040375000",
          },
          {
            name: "Holiday Anthuria",
            role: "Frontline · gauge / defense",
            id: "3040369000",
          },
          {
            name: "Caim",
            role: "Backline · unique-grid passive",
            id: "3040164000",
          },
          { name: "Uriel", role: "Backline · future target", id: "3040501000" },
        ],
        {
          className: "Kengo",
          ca: "ON",
          mainhand: "Unsigned Kaneshige · Earth · Devilry",
          skills: [
            "One with the Blade",
            "No More Doubt",
            "Fighting Spirit or Ashura Formation",
            "Miserable Mist",
          ],
          note: "Use this to build Diaspora's CA activation to 100% before requesting backup. Caim only contributes his reverse-position grid passive when every equipped weapon name is unique.",
        },
      ),
    ],
    grids: [
      {
        name: "Magna III farm",
        tag: "CURRENT",
        note: "General Full Auto uses the Attack-awakened Exo Ashavan as Onmyoji mainhand. Swap the mainhand to Yggdrasil's Bough for the Manadiver short team. Keep three Nibelung Horns until the summon and boost package is complete.",
        weapons: [
          ["MH", "Exo Ashavan", "Onmyoji · Attack awakening"],
          ["×3", "Yggdrasil Crystal Blade Arbos", "Boost + cap"],
          ["×3", "Nibelung Horn", "Stamina + crit"],
          ["×1", "Harp of Renunciation", "Omega Opus"],
          ["×1", "Bahamut Dagger Coda", "Race ATK + HP"],
          ["×1", "Gauntlet of Proudearth", "23% seraphic"],
        ],
      },
      {
        name: "Magna III 250",
        tag: "TARGET",
        note: "At 400% total Omega boost, two Nibelung Horns reach guaranteed critical. Ultima Claw uses Normal Cap plus the seraphic key; Covenant-Ruin Fist matches Cidala and Pholia. The Kengo Diaspora preset remains a separate all-unique specialist grid.",
        weapons: [
          ["MH", "Exo Ashavan", "Onmyoji · Attack awakening"],
          ["×3", "Yggdrasil Crystal Blade Arbos", "Boost + cap"],
          ["×2", "Nibelung Horn", "Stamina + 100% crit"],
          ["×1", "Harp of Renunciation", "Omega Opus"],
          ["×1", "Covenant-Ruin Fist", "Cidala + Pholia"],
          ["×1", "Ultima Claw", "Normal cap + seraphic"],
          ["×1", "Bahamut Dagger Coda", "Race ATK + HP"],
        ],
      },
    ],
    priorities: [
      "5★ Attack-awaken Exo Ashavan",
      "Farm 3 Arbos swords",
      "Raise Yggdrasil toward 250",
      "Build Earth Kaneshige · Devilry",
      "Spark Grand Uriel",
      "Target Grand Bhaisa for CA / high-level FA",
    ],
    backline: [
      "Summer Tikoh for general and short FA",
      "Caim only in an all-unique grid",
      "Uriel becomes the default reserve target",
    ],
    opus: [
      {
        team: "TEAM A · GENERAL FULL AUTO",
        cap: "Beta · Skill DMG Cap",
        pendulum: "Pendulum of Strength",
        transcend: "Pendulum of Extremity",
        note: "Strength is the safe unattended default. Beta improves Cidala's MC-triggered automatic skills while leaving Normal Cap to Ultima; Extremity supports the team's normal-led damage without forcing Falsehood into a CA-on sustain team.",
      },
      {
        team: "TEAM B · SHORT NORMAL",
        cap: "Beta · Skill DMG Cap",
        pendulum: "Chain of Falsehood · Strength if the fight extends",
        transcend: "Pendulum of Extremity",
        note: "Falsehood is only for the tested short route. Keep Normal Cap on Ultima and switch back to Strength whenever ordinary charge attacks or longer-fight sustain matter.",
      },
      {
        team: "TEAM C · DIASPORA CA",
        cap: "Gamma · CA DMG Cap",
        pendulum: "Pendulum of Strength",
        transcend: "Pendulum of Exaltation",
        note: "This preset exists to reach CA activation 100% consistently. Use CA Cap on Opus and the Earth Kaneshige loop; do not copy the short normal team's Falsehood configuration.",
      },
    ],
    mastery: [
      {
        name: "Sabrina",
        status: "DONE",
        priority: "Stamina ★3 ×2 → Crit ★3 ×2 → ATK ★3 ×2",
        note: "Short-Full-Auto damage path. Her best turns require maximum HP, which makes both stamina nodes the first priority; she already gains 100% TA at full HP, so DATA is wasted there.",
      },
      {
        name: "Cidala",
        status: "DONE",
        priority:
          "Skill DMG Cap ★3 → CA DMG Cap ★3 → Earth ATK ★3 → TA ★3 ×2 → LB Support ★3",
        note: "Full 18-star standard-style setup. TA stabilizes her before all permanent tiger buffs are online, while skill cap improves the automatic damage added by MC buff and damage skills.",
      },
      {
        name: "Yukata Pholia",
        status: "DONE",
        priority:
          "Earth ATK ★3 → Stamina ★3 → Debuff Success ★3 → Defense ★3 ×2 → ATK ★3",
        note: "The first 9 stars are the JP-guide core. This team already receives guaranteed TA from her burst buff, so the remaining general-FA stars go into durability and deterministic attack rather than DATA.",
      },
    ],
    awakenings: [
      {
        name: "Sabrina",
        type: "Multiattack",
        note: "Current JP first choice for her full-HP normal attacker role. The 5% normal-attack damage is the main gain; her own full-HP passive already supplies the TA.",
      },
      {
        name: "Cidala",
        type: "Balance",
        note: "Keep the no-orb general-use type for mixed CA, skill, normal damage, and HP. Multiattack is the optional normal-axis specialization after her permanent buffs are online.",
      },
      {
        name: "Yukata Pholia",
        type: "Attack",
        note: "JP priority for making her low-modifier assassin buff reach cap. Change to Multiattack only after the battle log shows those turns already capped.",
      },
    ],
    overMastery: [
      {
        name: "Sabrina",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "DEF 10–20%",
        earring: "Supplemental DMG 5–12",
        note: "The JP damage targets improve her automatic skill hits. DEF is preferred over TA because full HP already gives her guaranteed TA and must be preserved.",
      },
      {
        name: "Cidala",
        ring3: "Stamina 5–10",
        ring4: "TA 5–10%",
        earring: "Stamina 5–12",
        note: "JP prioritizes Stamina on both systems. TA is the useful secondary roll before her permanent tiger buffs are fully established.",
      },
      {
        name: "Yukata Pholia",
        ring3: "Stamina 5–10",
        ring4: "TA 5–10%",
        earring: "Stamina 5–12",
        note: "Double Stamina is the published JP target. TA is the broad fourth roll for turns outside her guaranteed-TA team buff.",
      },
    ],
  },
  {
    element: "Wind",
    subtitle: "Magna",
    color: "#39a978",
    current: "Magna III farm",
    teams: [
      team(
        "Arbos / fast normal Full Auto",
        "FAST FA · CA ON",
        "Azusa keeps the owned version relevant for Yggdrasil Arbos by supplying the debuffs that clear its 9 / 12 / 15-debuff buffs. Summer Galleon replaces Azusa in the target-complete fast shell once the route's debuff threshold is covered.",
        [
          { name: "Yukata Vampy", role: "Frontline · support / damage", id: "3040478000" },
          { name: "Grand Narmaya", role: "Frontline · main DPS", id: "3040335000" },
          { name: "Azusa", role: "Frontline · Arbos debuffs", id: "3040359000" },
          { name: "Raphael", role: "Backline · Primarch", id: "3040568000" },
          { name: "Ewiyar", role: "Backline · dodge sustain", id: "3040378000" },
        ],
        {
          className: "Manadiver",
          ca: "ON · OFF only after a tested short threshold",
          mainhand: "Tiamat Edge Aura",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "Keep CA on for unattended Arbos consistency. The published ceiling shell is Summer Galleon / Grand Narmaya / Yukata Vampy, but do not remove Azusa until MC, calls and Vampy reliably satisfy the boss's debuff checks.",
        },
      ),
      team(
        "General Full Auto",
        "GENERAL FA · CA ON",
        "The owned low-intervention team: Vampy supplies offense, Cagliostro and Clarisse answer specials with sustain and dispels, and Charlotta stabilizes longer fights. Grand Kaguya can replace Charlotta when maximum safety matters more than speed.",
        [
          { name: "Yukata Vampy", role: "Frontline · offense / support", id: "3040478000" },
          { name: "Cagliostro & Clarisse", role: "Frontline · heal / clear / dispel", id: "3040593000" },
          { name: "Grand Charlotta", role: "Frontline · defense / CA", id: "3040438000" },
          { name: "Raphael", role: "Backline · Primarch", id: "3040568000" },
          { name: "Ewiyar", role: "Backline · dodge sustain", id: "3040378000" },
        ],
        {
          className: "Manadiver",
          ca: "ON",
          mainhand: "Tiamat Edge Aura",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "Default general-purpose Full Auto preset. Replace Charlotta with Grand Kaguya only when the encounter needs more control and durability.",
        },
      ),
      team(
        "CA / V2 Full Auto",
        "CA / V2 FA · CA ON",
        "This is the current owned CA shell. Catura is the direct frontline upgrade over Grand Kaguya and turns it into the modern MC-acceleration, healing and omen-control team.",
        [
          { name: "Grand Kaguya", role: "Frontline · current sustain", id: "3040486000" },
          { name: "Grand Charlotta", role: "Frontline · CA / defense", id: "3040438000" },
          { name: "Cagliostro & Clarisse", role: "Frontline · sustain / mechanics", id: "3040593000" },
          { name: "Raphael", role: "Backline · Primarch", id: "3040568000" },
          { name: "Ewiyar", role: "Backline · dodge sustain", id: "3040378000" },
        ],
        {
          className: "Kengo",
          ca: "ON",
          mainhand: "Unsigned Kaneshige · Wind · Devilry",
          skills: [
            "One with the Blade",
            "No More Doubt",
            "Unfettered Mind",
            "Miserable Mist",
          ],
          note: "Use for CA loops and V2 omen coverage rather than short farming. Catura replaces Grand Kaguya after acquisition; Charlotta and Cagliostro & Clarisse remain the owned defensive core.",
        },
      ),
    ],
    grids: [
      {
        name: "Magna III farm",
        tag: "CURRENT",
        note: "Two Aura guns are the current general-use boost core. Aura Edge is a real Manadiver mainhand with Tempering and Garrison; two Croziers preserve critical rate and HP for unattended Full Auto.",
        weapons: [
          ["MH", "Tiamat Edge Aura", "Manadiver MH"],
          ["×2", "Tiamat Bolt Aura", "Boost + cap"],
          ["×2", "Coruscant Crozier", "HP + crit"],
          ["×1", "Ewiyar's Beak", "Skill supplemental"],
          ["×1", "Innocent Love", "EX + normal cap"],
          ["×1", "Spear of Renunciation", "Omega Opus"],
          ["×1", "Covenant-Ruin Fist", "Mahira + Raphael"],
          ["×1", "Ring of Wandergale", "23% seraphic"],
        ],
      },
    ],
    priorities: [
      "Farm 2 Aura guns + 1 Aura dagger",
      "Raise Tiamat toward 250",
      "Summer Galleon for the active fast-normal team",
      "Catura for the CA / V2 team",
      "Estarriola first",
    ],
    backline: [
      "Non-Grand Ewiyar",
      "Raphael when not frontline",
      "Estarriola later",
    ],
    opus: [
      {
        team: "TEAM A · PRIMARY FAST FA",
        cap: "Beta · Skill DMG Cap",
        pendulum: "Falsehood for burst · Strength for general FA",
        transcend: "Pendulum of Extremity",
        note: "Wind Narmaya normal-axis guides pair Falsehood and Skill Cap on Opus with Normal Cap on Ultima. Extremity matches Narmaya’s amplified guaranteed-TA turns; Strength is the safer choice when the fight outlasts the burst plan.",
      },
    ],
    mastery: [
      {
        name: "Summer Mahira",
        status: "DONE",
        priority:
          "Skill DMG Cap ★3 ×2 → Wind ATK ★3 → Healing ★3 → Earth DMG Cut ★3 → Defense ★1 + ATK ★1 ×2",
        note: "Exact 18-star JP-guide support setup. Her selected ally repeatedly triggers the four-hit skill, making both cap nodes central; healing and mitigation preserve that ally in longer Full Auto fights.",
      },
      {
        name: "Grand Narmaya",
        status: "DONE",
        priority: "Crit ★3 ×3 → Stamina ★3 → Enmity ★3 → CA DMG Cap ★3",
        note: "Full 18-star mixed-condition damage path. Her passive already guarantees TA, while her own guaranteed critical makes the critical-related kit reliable; stamina and enmity cover both healthy and damaged turns.",
      },
      {
        name: "Raphael",
        status: "DONE",
        priority: "Skill DMG Cap ★3 ×2 → Crit ★3 → Wind ATK ★3 → CA DMG Cap ★2",
        note: "The JP guide stops at this 14-star core. For a frontline general-FA build, finish CA cap to ★3 and add HP ★3 for the final four stars; the two skill-cap nodes amplify both his 16-hit and automatic 10-hit attacks.",
      },
    ],
    awakenings: [
      {
        name: "Summer Mahira",
        type: "Balance",
        note: "JP guidance says there is no compelling reason to spend a jewel: her support role benefits from the mixed Attack, HP, CA, and DATA package.",
      },
      {
        name: "Grand Narmaya",
        type: "Multiattack",
        note: "JP first choice because her guaranteed TA already reaches cap easily and Multiattack adds 5% normal-attack damage. Attack is only the weak-grid fallback.",
      },
      {
        name: "Raphael",
        type: "Attack",
        note: "Attack is recommended while his automatic skill hits are not capped in this Magna transition. Multiattack becomes better once the grid consistently reaches cap.",
      },
    ],
    overMastery: [
      {
        name: "Summer Mahira",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "Healing 15–30%",
        earring: "Supplemental DMG 5–12",
        note: "Skill cap and Supplemental improve the repeated four-hit follow-up. Healing is the support-focused fourth roll for longer Full Auto.",
      },
      {
        name: "Grand Narmaya",
        ring3: "Stamina 5–10",
        ring4: "DEF 10–20%",
        earring: "Stamina 5–12",
        note: "JP recommends Stamina on ring and earring. She already has guaranteed TA, so a strong DEF roll is the useful general-play fourth bonus.",
      },
      {
        name: "Raphael",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "TA 5–10%",
        earring: "Supplemental DMG 5–12",
        note: "Skill cap and Supplemental scale his 16-hit and automatic 10-hit skills. TA is the practical secondary target for frontline consistency.",
      },
    ],
  },
  {
    element: "Light",
    subtitle: "Magna",
    color: "#d2af42",
    current: "Magna III farm",
    teams: [
      team(
        "Payila / Vajra fast normal",
        "SHORT FA · CA OFF",
        "Halloween Vajra is the priority replacement for Basara. Her guaranteed TA, double strike, automatic dispel/debuff damage and extra-action payoff make this the stronger Payila normal shell; Grand Jeanne remains the owned burst support.",
        [
          { name: "Summer Payila", role: "Frontline · owned main DPS", id: "3040672000" },
          {
            name: "Halloween Vajra",
            role: "Frontline · priority seasonal target",
            id: "3040617000",
          },
          { name: "Grand Jeanne", role: "Frontline · owned burst support", id: "3040245000" },
          { name: "Summer Heles", role: "Backline · owned", id: "3040091000" },
          { name: "Grand Sandalphon", role: "Backline · Primarch target", id: "3040515000" },
        ],
        {
          className: "Manadiver",
          ca: "OFF",
          mainhand: "Exo Heliocentrum · Attack awakening",
          skills: ["Aether Siphon", "Secret Triad", "Wild Magica", "Miserable Mist"],
          note: "Use Basara in Vajra's slot until she is acquired. This is the short normal preset; do not reuse CA OFF automatically for the longer Full Auto team.",
        },
      ),
      team(
        "Payila / Vajra general Full Auto",
        "GENERAL FA · CA ON",
        "Yukata Narmaya provides the owned low-intervention support slot. Halloween Vajra improves both the current Payila team and a future Bhadra long-FA team, so she is no longer treated as a burst-only luxury.",
        [
          { name: "Summer Payila", role: "Frontline · owned main DPS", id: "3040672000" },
          { name: "Halloween Vajra", role: "Frontline · priority seasonal target", id: "3040617000" },
          { name: "Yukata Narmaya", role: "Frontline · owned FA support", id: "3040392000" },
          { name: "Summer Heles", role: "Backline · owned", id: "3040091000" },
          { name: "Grand Sandalphon", role: "Backline · Primarch target", id: "3040515000" },
        ],
        {
          className: "Manadiver",
          ca: "ON",
          mainhand: "Exo Heliocentrum · Attack awakening",
          skills: ["Aether Siphon", "Secret Triad", "Wild Magica", "Miserable Mist"],
          note: "Keep CA on for unattended general play. Basara remains the temporary Vajra substitute; Bhadra is a later specialization rather than a prerequisite for using Vajra here.",
        },
      ),
      team(
        "Cosmos CA / V2 Full Auto",
        "CA / V2 FA · CA ON",
        "Summer Horus is the specific missing engine for the owned Cosmos core. Grand Noa is the account-ready third frontline; this template stays separate from the Payila / Vajra normal teams.",
        [
          { name: "Grand Cosmos", role: "Frontline · owned CA / skill DPS", id: "3040467000" },
          { name: "Summer Horus", role: "Frontline · seasonal target", id: "3040518000" },
          { name: "Grand Noa", role: "Frontline · owned charge support", id: "3040255000" },
          { name: "Yukata Narmaya", role: "Backline · MC CA follow-up", id: "3040392000" },
          { name: "Grand Sandalphon", role: "Backline · Primarch target", id: "3040515000" },
        ],
        {
          className: "Kengo",
          ca: "ON",
          mainhand: "Unsigned Kaneshige · Light · Devilry",
          skills: ["One with the Blade", "No More Doubt", "Unfettered Mind", "Miserable Mist"],
          note: "Use this for CA loops and V2 mechanics, including the path toward Agastia. Summer Horus is what turns the owned Cosmos / Noa foundation into the intended premium shell.",
        },
      ),
    ],
    grids: [
      {
        name: "Magna III farm",
        tag: "CURRENT",
        note: "This is the durable two-Credo-gun transition, not the five-gun Sandalphon-only setup. Exo Heliocentrum is the actual Manadiver mainhand; one Credo saber adds useful TA without sacrificing the Lumi-sword HP core.",
        weapons: [
          ["MH", "Exo Heliocentrum", "Attack awakening"],
          ["×2", "Luminiera Bolt Credo", "Boost + cap"],
          ["×3", "Luminiera Sword Omega", "ATK + HP"],
          ["×1", "Luminiera Saber Credo", "ATK + TA"],
          ["×1", "Sword of Renunciation", "Omega Opus"],
          ["×1", "Altruism-Soul Staff", "Team specialty"],
          ["×1", "Harp of Everlore", "23% seraphic"],
        ],
      },
    ],
    priorities: [
      "Farm 2 Credo guns + 1 Credo saber",
      "Attack-awaken Exo Heliocentrum",
      "Raise Luminiera toward 250",
      "Halloween Vajra at the next suitable Halloween spark",
      "Summer Horus for Cosmos CA / V2",
      "Grand Sandalphon for the universal reserve slot",
      "Bhadra later for the Vajra long-FA ceiling",
    ],
    backline: ["Summer Heles", "Grand Sandalphon target", "Yukata Narmaya for Cosmos CA / V2"],
    opus: [
      {
        team: "TEAM A / B · PAYILA / VAJRA NORMAL",
        cap: "Beta · Skill DMG Cap",
        pendulum: "Pendulum of Strength · Temptation only for short fights",
        transcend: "Pendulum of Extremity (preliminary)",
        note: "Payila and Vajra keep Teams A and B normal-led, so Extremity remains the evidence-based direction and Beta leaves Normal Cap to Ultima. Team A runs CA off for speed; Team B keeps CA on for unattended general play.",
      },
    ],
    mastery: [
      {
        name: "Summer Payila",
        status: "DONE",
        priority: "Light ATK ★3 → Skill DMG Cap ★3 → TA ★3 → HP ★3 → ATK ★3 ×2",
        note: "Current post-release 18-star recommendation. Skill cap strengthens her one-use 10-hit debuff, TA helps the party reach the four-TA cadence that refreshes her team buff, and HP supports general Full Auto survival.",
      },
      {
        name: "Basara",
        status: "DONE",
        priority:
          "Light ATK ★3 ×2 → Stamina ★3 → Skill DMG Cap ★3 → CA DMG Cap ★3 → Debuff Success ★3",
        note: "Full 18-star general-FA path. His passive already guarantees TA, so the useful gains are elemental/stamina damage, caps for both damage modes, and reliable attack/defense/accuracy debuffs.",
      },
      {
        name: "Grand Cosmos",
        status: "DONE",
        priority:
          "Skill DMG Cap ★3 → CA DMG Cap ★3 → HP ★3 ×2 → Light ATK ★2 ×2 → Defense ★1 ×2",
        note: "Current JP defensive 18-star Full Auto path. Both cap nodes scale her repeated skill/CA cycle; two HP nodes and efficient first-star Defense nodes stabilize her near 50% HP, while Light ATK stops at ★2 because the third star is less efficient. The offensive respec is Light ATK ★3 ×2 plus CA DMG ★3 after the team proves durable.",
      },
      {
        name: "Summer Heles",
        status: "DONE",
        priority: "Light ATK ★3 ×2 → Crit ★3 → OD ATK ★3 → TA ★3 → ATK ★1 ×3",
        note: "Current post-rebalance JP 18-star path. Light ATK, critical and OD Attack amplify her self-created Overdrive/assassin window; the three efficient first-star Attack nodes complete the allocation. TA is the current guide's completion node, but it is the first node to trade for durability if she is used only inside her guaranteed-TA windows. Skip the low-rate counter support LB.",
      },
    ],
    awakenings: [
      {
        name: "Summer Payila",
        type: "Attack",
        note: "Current JP first choice because her reattack assassin has a high ceiling. Defense is the 250HELL-style swap only when she cannot survive unattended.",
      },
      {
        name: "Basara",
        type: "Balance",
        note: "Keep Balance for the mixed HP and CA package. JP lists Multiattack as the alternative, but his guaranteed TA wastes its DATA portion; use it only for the 5% normal-damage ceiling.",
      },
      {
        name: "Grand Cosmos",
        type: "Defense",
        note: "Current JP first choice for the long and high-difficulty content where Cosmos is normally used. Keep Balance only when the battle log shows she already survives reliably and the awakening jewel is better saved.",
      },
      {
        name: "Summer Heles",
        type: "Balance",
        note: "Current JP first choice. Her post-rebalance role mixes normal attacks, double charge attacks, party gauge support and repeated guaranteed-TA windows, so Balance's HP, CA damage and DATA all contribute. Multiattack is the optional short normal-axis specialization for its 5% normal-damage bonus.",
      },
    ],
    overMastery: [
      {
        name: "Summer Payila",
        ring3: "Stamina 5–10",
        ring4: "TA 5–10%",
        earring: "Supplemental DMG 5–12",
        note: "The current post-release JP targets are Stamina and Supplemental. TA helps the party reach the four-TA cadence that refreshes her team buff.",
      },
      {
        name: "Basara",
        ring3: "Stamina 5–10",
        ring4: "DEF 10–20%",
        earring: "Supplemental DMG 5–12",
        note: "JP prioritizes Stamina plus Supplemental. His passive already guarantees TA, making DEF the better fourth-slot Full Auto roll.",
      },
      {
        name: "Grand Cosmos",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "DEF 10–20%",
        earring: "Supplemental DMG 5–12",
        note: "Current JP guides explicitly converge on Skill DMG Cap and Supplemental Damage for her repeated multi-hit skills. DEF is the account-specific fourth-slot target because it helps her stay near the 50% HP balance point in unattended fights.",
      },
      {
        name: "Summer Heles",
        ring3: "Stamina 5–10",
        ring4: "TA 5–10%",
        earring: "Stamina 5–12",
        note: "Current JP priority is Stamina on both ring and earring. CA DMG Cap 10–15% is the ring alternative for CA-heavy use; Supplemental Damage is a lower-priority earring alternative. TA is the listed fourth roll but is low urgency because her third skill already grants three turns of guaranteed TA.",
      },
    ],
  },
  {
    element: "Dark",
    subtitle: "Magna",
    color: "#7456a3",
    current: "Skill/sustain FA + Kengo CA progression",
    teams: [
      team(
        "General skill / sustain Full Auto",
        "GENERAL FA · CA ON",
        "The strongest low-maintenance owned shell. Lich supplies recurring damage, debuffs and delays; Magisa drives the crest and dispel engine; Tsukuyomi converts it into healing, gauge and durability.",
        [
          {
            name: "Grand Lich",
            role: "Frontline · sustained skill core",
            id: "3040357000",
          },
          {
            name: "Summer Magisa",
            role: "Frontline · crest / skill damage",
            id: "3040412000",
          },
          { name: "Tsukuyomi", role: "Frontline · sustain", id: "3040581000" },
          { name: "Tyra", role: "Backline · offensive reinforcement", id: "3040503000" },
          { name: "Summer Azusa", role: "Backline · tank / damage reinforcement", id: "3040453000" },
        ],
        {
          className: "Manadiver",
          ca: "ON",
          mainhand: "Exo Hamartia · Attack awakening",
          skills: ["Aether Siphon", "Secret Triad", "Wild Magica", "Miserable Mist"],
          note: "Default unattended preset. Replace Tsukuyomi with Tyra only after the encounter proves safe; use Azusa when hostility tanking, hit count or CA-turn mitigation is more valuable than speed.",
        },
      ),
      team(
        "Long-fight CA Full Auto",
        "CA / LONG FA · CA ON",
        "Current Gamewith Magna 250HELL preparation uses this exact Tyra / Magisa / Tsukuyomi frontline. Azusa remains the defensive CA alternative rather than the universal lead.",
        [
          { name: "Tyra", role: "Frontline · damage / dispel", id: "3040503000" },
          { name: "Summer Magisa", role: "Frontline · crest / CA / dispel", id: "3040412000" },
          { name: "Tsukuyomi", role: "Frontline · sustain / gauge", id: "3040581000" },
          { name: "Grand Lich", role: "Backline · skill reinforcement", id: "3040357000" },
          { name: "Summer Vajra", role: "Backline · CA reinforcement", id: "3040407000" },
        ],
        {
          className: "Kengo",
          ca: "ON",
          mainhand: "Unsigned Kaneshige · Dark · Devilry",
          skills: ["One with the Blade", "No More Doubt", "Unfettered Mind", "Miserable Mist"],
          note: "Use Azusa over Tyra when CA-turn damage reduction, hostility tanking or ten-hit skill damage answers the encounter. Grand Shalem remains the boss-specific control flex for permanent debuffs and delays.",
        },
      ),
      team(
        "Future normal Full Auto",
        "TARGET FA · CA ON",
        "Do not imitate a modern normal team with incomplete pieces. Summer Catura, Grand Sariel and Grand Orologia are the target-complete low-intervention destination; Lich and Tsukuyomi remain the owned reinforcements.",
        [
          { name: "Summer Catura", role: "Frontline · seasonal target", id: "3040610000" },
          { name: "Grand Sariel", role: "Frontline · Primarch target", id: "3040611000" },
          { name: "Grand Orologia", role: "Frontline · general FA target", id: "3040536000" },
          { name: "Grand Lich", role: "Backline · owned reinforcement", id: "3040357000" },
          { name: "Tsukuyomi", role: "Backline · owned sustain", id: "3040581000" },
        ],
        {
          className: "Fighter Origin",
          ca: "ON · OFF only for a tested short route",
          mainhand: "Dark Opus or encounter-appropriate sabre / axe",
          skills: ["Unlimited Boost", "Ulfhedinn", "Beast Fang"],
          note: "This is a future destination, not a current saved party. Catura concentrates support on MC and herself, Sariel supplies the opening and universal weapon-skill passive, and Orologia adds amplification, automatic dispels and emergency recovery.",
        },
      ),
    ],
    grids: [
      {
        name: "Skill Magna III",
        tag: "CURRENT",
        note: "Shared Manadiver shell for sustained Lich/Magisa Full Auto and Azusa's offensive or one-turn skill burst. Three Ater fists are the general boost core and two Ater sabers support the team's frequent skill hits; Azusa replaces the sustain slot when damage is the objective.",
        weapons: [
          ["MH", "Exo Hamartia", "Attack awakening"],
          ["×3", "Celeste Grace Ater", "Boost + cap"],
          ["×2", "Celeste Saber Ater", "Skill supplemental"],
          ["×1", "Zechariah", "Stamina + HP"],
          ["×1", "Katana of Renunciation", "Omega Opus"],
          ["×1", "Altruism-Soul Staff", "Lich + Tsukuyomi"],
          ["×1", "Scythe of Darkherald", "23% seraphic"],
        ],
      },
      {
        name: "Kengo CA Magna III",
        tag: "TARGET",
        note: "Dedicated long-fight CA shell for Tyra, Summer Magisa and Tsukuyomi. The Revans extension replaces this provisional list with the maintained Kaneshige configuration.",
        weapons: [
          ["MH", "Unsigned Kaneshige", "Dark · Devilry"],
          ["×3", "Celeste Grace Ater", "Boost + cap"],
          ["×1", "Celeste Saber Ater", "Skill supplemental"],
          ["×2", "Abyss Spine", "CA + HP"],
          ["×1", "Katana of Renunciation", "CA cap + stamina"],
          ["×1", "Altruism-Soul Staff", "Team specialty"],
          ["×1", "Scythe of Darkherald", "23% seraphic"],
        ],
      },
    ],
    priorities: [
      "Farm 3 Ater fists + 2 Ater sabers",
      "Attack-awaken Exo Hamartia",
      "Raise Celeste toward 250",
      "Grand Sariel for universal account value",
      "Summer Catura when properly sparkable",
      "Grand Orologia for the future normal team",
    ],
    backline: [
      "Tyra / Summer Azusa for general FA",
      "Grand Lich / Summer Vajra for CA",
      "Grand Sariel when not frontline",
    ],
    opus: [
      {
        team: "TEAM A · GENERAL SKILL / SUSTAIN FA",
        cap: "Beta · Skill DMG Cap",
        pendulum: "Strength for sustained FA",
        transcend: "Sagacity when skill damage leads",
        note: "Lich and Magisa reward Skill Cap while Tsukuyomi stabilizes the loop. Keep Strength for unattended consistency; Sagacity is the natural transcendence direction when the battle log confirms skills are the leading damage source.",
      },
      {
        team: "TEAM B · KENGO CA / LONG FA",
        cap: "Gamma · CA DMG Cap",
        pendulum: "Pendulum of Strength",
        transcend: "Pendulum of Exaltation",
        note: "Tyra, Magisa and Tsukuyomi form the maintained long-fight CA team. Gamma and Exaltation belong to this dedicated preset; keep Beta and Sagacity on the separate general skill team.",
      },
    ],
    mastery: [
      {
        name: "Summer Azusa",
        status: "DONE",
        priority: "Crit ★3 ×3 → HP ★3 → Light DMG Cut ★3 ×2",
        note: "Full 18-star JP general/tank path. Three independent critical nodes exploit her huge personal attack and cap modifiers, while HP and two light-reduction nodes reinforce the five-turn hostility tank created by her third skill.",
      },
      {
        name: "Grand Lich",
        status: "DONE",
        priority: "Skill DMG Cap ★3 ×2 → Dark ATK ★3 → CA DMG ★3 → HP ★3 ×2",
        note: "The first 12 stars are the guide's damage core, centered on her automatic multi-hit skill. Two HP nodes are the recommended general-FA finish; Defense is a valid swap if percentage mitigation is more valuable in a specific raid.",
      },
      {
        name: "Tsukuyomi",
        status: "DONE",
        priority: "Healing ★3 ×3 → Dark ATK ★3 → CA DMG Cap ★3 → HP ★3",
        note: "Full 18-star sustain path. Triple healing nodes scale both her CA heal and crest-triggered recovery; CA cap matches her frequent charge attacks, while HP reinforces her long-fight support role.",
      },
    ],
    awakenings: [
      {
        name: "Summer Azusa",
        type: "Defense",
        note: "Account-specific Full Auto choice from JP usage guidance: her third skill makes her the hostility tank. Attack is reserved for short 1–2 skill burst where survival is irrelevant.",
      },
      {
        name: "Grand Lich",
        type: "Balance",
        note: "JP default; her self-buffs already cover damage and durability, so the mixed type costs no jewel. Defense is only needed if she actually falls in long Full Auto.",
      },
      {
        name: "Tsukuyomi",
        type: "Balance",
        note: "Keep the no-cost mixed type for CA cadence, HP, and support. Her current JP page does not identify a mandatory specialized type; Defense is the failure-state swap.",
      },
    ],
    overMastery: [
      {
        name: "Summer Azusa",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "DEF 10–20%",
        earring: "Supplemental DMG 5–12",
        note: "Skill cap and Supplemental improve her ten-hit skill and post-CA damage. DEF directly supports the hostility-tank job she performs in this Team A.",
      },
      {
        name: "Grand Lich",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "DEF 10–20%",
        earring: "Supplemental DMG 5–12",
        note: "The JP damage targets are skill cap and Supplemental for her automatic multi-hit skill. DEF is the low-risk general-FA fourth roll.",
      },
      {
        name: "Tsukuyomi",
        ring3: "Skill DMG Cap 10–15%",
        ring4: "Healing 15–30%",
        earring: "Supplemental DMG 5–12",
        note: "Skill cap and Supplemental improve her recurring damage; Healing is the important fourth roll because she is this team’s sustain slot.",
      },
    ],
  },
];
export const plans: Plan[] = basePlans.map(applyRevansRoadmapExtensions);
export const elementIds = [
  "fire",
  "water",
  "earth",
  "wind",
  "light",
  "dark",
] as const;
export type ElementId = (typeof elementIds)[number];

export function getRoadmap(element: string) {
  const plan = plans.find(
    (entry) => entry.element.toLowerCase() === element.toLowerCase(),
  );
  return plan;
}
