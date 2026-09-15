import type { StableElementId } from "./roadmap-identity";

export type AdviceSource = {
  label: string;
  url: string;
};

export type TargetChoice = {
  name: string;
  reason: string;
};

export type TargetUnit = {
  name: string;
  role: string;
  id: string;
};

export type OneTurnPlan = {
  current: string;
  target: string;
  ca: string;
  opener: string[];
  verdict: string;
  units: TargetUnit[];
};

export type GachaAdvice = {
  general: TargetChoice;
  oneTurn: TargetChoice;
  highLevel: {
    primary: string;
    secondary: string;
    intervention: string;
    team: string;
    reason: string;
    skip: string;
    units: TargetUnit[];
    sources: AdviceSource[];
  };
  later: TargetChoice[];
  plan: OneTurnPlan;
  sources: AdviceSource[];
};

export type SummonPreset = {
  name: string;
  main: string;
  support: string;
  quickSummon: string;
  subSummons: string[];
  subAuras: string[];
  flex: string;
  note: string;
};

export type SummonAdvice = {
  presets: SummonPreset[];
  notes: string[];
  sources: AdviceSource[];
};

export type RoadmapAdvice = {
  gacha: GachaAdvice;
  summons: SummonAdvice;
};

export const roadmapAdviceReviewedAt = "14 Sep 2026";

const magnaPreset = (
  main: string,
  primarch: string,
  arcarum: string,
  flex: string,
): SummonPreset => ({
  name: "Magna III · general Full Auto",
  main: `${main} 250`,
  support: `${main} 250`,
  quickSummon: "Lucifer 250",
  subSummons: [primarch, "Lucifer 250", "Triple Zero", "Flex"],
  subAuras: [arcarum, "Wedges of the Sky 4★"],
  flex,
  note: "Use the highest-level owned Omega summon while progressing and borrow level 250. Wedges of the Sky remains core in M3 because its 4★ sub-aura adds 30% to every Omega skill family.",
});

const commonMagnaSources: AdviceSource[] = [
  {
    label: "Wedges of the Sky · 4★ mechanics",
    url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/458492",
  },
  {
    label: "Summon and sub-aura slot rules",
    url: "https://gbf.wiki/Sub_Aura_Summon_Slots",
  },
  {
    label: "Arcarum summon mechanics",
    url: "https://gbf.wiki/Arcarum_Summons",
  },
];

export const roadmapAdvice: Record<StableElementId, RoadmapAdvice> = {
  fire: {
    gacha: {
      general: {
        name: "Grand Percival",
        reason:
          "He is the broadest missing upgrade for the owned Zeta normal team and also converts Fire from its slower CA fallback into a modern first-turn normal setup.",
      },
      oneTurn: {
        name: "Grand Percival",
        reason:
          "Current JP short-fight routing is built around The Sun, Secret Triad and Percival S3. Zeta S1 is the first optional extra button when the honors threshold is missed.",
      },
      highLevel: {
        primary: "Wamdus (Holiday)",
        secondary: "Grand Yuel",
        intervention: "Zero-touch",
        team: "Lancer Origin / Wamdus (Holiday) / Tien 150 / Grand Percival",
        reason:
          "A documented 2026 NM100/150 Full Auto used Holiday Wamdus with Tien 150 and Grand Percival, backed by Fraux and Michael. This is a later seasonal ceiling, while Grand Yuel remains the more general comfort alternative.",
        skip: "Skipping Sandira is coherent with the account plan: it removes the reason to chase Summer Atum as the next Fire specialist. Finish Tien 150 and prioritize Grand Percival; reassess the remaining Legfest releases before committing another spark.",
        units: [
          {
            name: "Wamdus (Holiday)",
            role: "Frontline · later seasonal",
            id: "3040562000",
          },
          {
            name: "Tien",
            role: "Frontline · transcendence 150",
            id: "3040039000",
          },
          {
            name: "Grand Percival",
            role: "Frontline · spark target",
            id: "3040425000",
          },
          { name: "Michael", role: "Backline · Primarch", id: "3040440000" },
          { name: "Fraux", role: "Backline · sustain", id: "3040161000" },
        ],
        sources: [
          {
            label: "2026 Fire NM100/150 Full Auto record",
            url: "https://note.com/kyoka_h/n/ne28ec9360f7c",
          },
          {
            label: "Kamigame Tien 150 evaluation and Full Auto example",
            url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/SSR%E9%99%90%E7%95%8C%E8%B6%85%E8%B6%8A%E3%82%A8%E3%83%83%E3%82%BB%E3%83%AB.html",
          },
        ],
      },
      later: [
        {
          name: "Grand Yuel",
          reason:
            "A later general-team refinement, not a prerequisite for the Percival shell.",
        },
      ],
      plan: {
        current:
          "Manadiver / Grand Zeta / Michael / Ragazzo · Alanaan or Fraux reserve",
        target:
          "Manadiver / Grand Zeta / Grand Percival / Ragazzo · Michael + Alanaan",
        ca: "Off",
        opener: [
          "The Sun summon",
          "Secret Triad",
          "Percival S3",
          "Optional Zeta S1",
          "Attack",
        ],
        verdict:
          "Ragazzo is the correct Wilnas replacement for this short normal job. Percival is still the missing piece that turns it into the current meta shell; Michael moves to reserve rather than competing for its third frontline slot.",
        units: [
          { name: "Grand Zeta", role: "Frontline · owned", id: "3040499000" },
          {
            name: "Grand Percival",
            role: "Frontline · spark target",
            id: "3040425000",
          },
          { name: "Ragazzo", role: "Frontline · owned", id: "3040481000" },
          {
            name: "Michael",
            role: "Reserve · owned Primarch",
            id: "3040440000",
          },
          { name: "Alanaan", role: "Reserve · burst option", id: "3040167000" },
        ],
      },
      sources: [
        {
          label: "Gamewith 2026 Fire 150HELL Zeta / Percival / Ragazzo route",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/504195",
        },
        {
          label: "Kamigame Tien 150 evaluation and team example",
          url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/SSR%E9%99%90%E7%95%8C%E8%B6%85%E8%B6%8A%E3%82%A8%E3%83%83%E3%82%BB%E3%83%AB.html",
        },
      ],
    },
    summons: {
      presets: [
        magnaPreset(
          "Colossus Omega",
          "Michael",
          "The Sun",
          "Beelzebub for damage and dispel; The Devil when difficult Full Auto needs HP.",
        ),
      ],
      notes: [
        "Keep The Sun callable only when the opening route actually uses its call; otherwise its low stats make the sub-aura-only row appropriate.",
      ],
      sources: commonMagnaSources,
    },
  },
  water: {
    gacha: {
      general: {
        name: "Grand Europa",
        reason:
          "The best missing Water Gala character for this account. Her 5★ kit adds strong damage, recurring healing and clear, Fire switch, dispel guard, and long-fight reattack support; Galilei's Insight is also one of the exact pieces in the planned Varuna transition.",
      },
      oneTurn: {
        name: "None",
        reason:
          "Payila, Gabriel and Octavia are already the intended modern normal shell. Re-test them after Leviathan M3, Opus and Haaselia rather than buying a redundant character.",
      },
      highLevel: {
        primary: "Yukata Aria",
        secondary: "Summer Tefnut",
        intervention: "Zero-touch · non-urgent",
        team: "Manadiver / Yukata Aria / Yatima or Payila / Gabriel",
        reason:
          "Aria adds near-every-turn dispel, Water healing, cover utility, and MC amplification. This is a comfort upgrade because the owned Yatima, Sylvia, Payila, Gabriel, Octavia, and Wamdus roster already covers high-level play unusually well.",
        skip: "Bride Ilsa belongs to specialized short-fight and Hraesvelgr routes. Do not spark her for this Full Auto objective.",
        units: [
          {
            name: "Yukata Alliah",
            role: "Frontline · comfort target",
            id: "3040648000",
          },
          {
            name: "Grand Yatima",
            role: "Frontline · owned flex",
            id: "3040566000",
          },
          { name: "Payila", role: "Frontline · owned flex", id: "3040502000" },
          {
            name: "Grand Gabriel",
            role: "Frontline / reserve · owned",
            id: "3040492000",
          },
        ],
        sources: [
          {
            label: "Current JP Yukata Aria Full Auto evaluation",
            url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/page/415884431597807974.html",
          },
        ],
      },
      later: [
        {
          name: "Grand Pholia · weapon-conditioned",
          reason:
            "Do not spark her as an equal alternative to Europa. Her character is now a niche single-target buffer whose personal barrier can fail in long Full Auto, but Taisai Spirit Bow remains useful when the exact future Varuna critical grid calls for it.",
        },
        {
          name: "Grand Lancelot",
          reason:
            "Only when deliberately committing to the separate skill-damage archetype.",
        },
        {
          name: "Vajra",
          reason:
            "A dedicated Kengo improvement, but not urgent with Sylvia, Yatima and Wamdus already owned.",
        },
      ],
      plan: {
        current: "Kengo CA fallback or the owned normal team after testing",
        target: "Manadiver / Payila / Grand Gabriel / Grand Octavia",
        ca: "Off for the one-turn test",
        opener: [
          "Enable Payila's normal support",
          "Add only the required MC buffs",
          "Attack",
          "Return to Kengo if the honors target is missed",
        ],
        verdict:
          "No Water character is required to begin testing this route. Water Zeta is the dedicated speed upgrade shown in current JP short-fight templates, but she is a normal-pool Suptix target rather than a reason to spend a Gala spark. Kengo remains the reliable weak-grid fallback.",
        units: [
          { name: "Payila", role: "Frontline · owned", id: "3040502000" },
          {
            name: "Grand Gabriel",
            role: "Frontline · owned",
            id: "3040492000",
          },
          {
            name: "Grand Octavia",
            role: "Frontline · owned",
            id: "3040644000",
          },
        ],
      },
      sources: [
        {
          label: "Kamigame Grand Europa 5★ evaluation and team examples",
          url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/SSR%E3%82%A8%E3%82%A6%E3%83%AD%E3%83%9A.html",
        },
        {
          label: "Kamigame Grand Pholia current evaluation",
          url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/SSR%E3%83%95%E3%82%A9%E3%83%AA%E3%82%A2.html",
        },
        {
          label: "Current Varuna grids and exact Taisai / Galilei usage",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/21615",
        },
        {
          label: "2026 Water GW Payila / Octavia / Gabriel report",
          url: "https://aytj9.hatenablog.com/entry/2026/04/11/003328",
        },
      ],
    },
    summons: {
      presets: [
        magnaPreset(
          "Leviathan Omega",
          "Gabriel",
          "The Moon",
          "Beelzebub for general damage and dispel; Justice for difficult Full Auto.",
        ),
        {
          name: "Single-sided Varuna · Primal entry",
          main: "Owned Yatima, Beelzebub, Orologia, Versusia or encounter utility",
          support: "Varuna 250",
          quickSummon: "Route-dependent",
          subSummons: [
            "Gabriel 4★",
            "Lucifer 250",
            "Triple Zero 4★",
            "Flex or personal Varuna 250 later",
          ],
          subAuras: ["The Moon 5★", "Wamdus 4★"],
          flex: "Choose the main summon for the route: Yatima for intentional call combinations and Haaselia entry, Beelzebub for immediate damage/debuffs, Orologia or Versusia for their specialized main effects. Do not assume these summons are interchangeable.",
          note: "This is the first Primal test. Borrowed Varuna 250 supplies the 170% aura; Rubea Stiria boost weapons, Gabriel's passive and exact crit pieces make one-sided play viable. Personal Varuna is not the gate.",
        },
        {
          name: "Double Varuna · later durability",
          main: "Varuna 250",
          support: "Varuna 250",
          quickSummon: "Lucifer 250",
          subSummons: ["Gabriel 4★", "Lucifer 250", "Triple Zero 4★", "Flex"],
          subAuras: ["The Moon 5★", "Wamdus 4★"],
          flex: "Use when boosted HP, Garrison, healing, TA or easier critical thresholds matter more than a Providence main aura/call.",
          note: "Personal Varuna 250 is a flexibility endpoint. When used as a sub summon instead, it gives 20% Water elemental ATK and HP; it does not add another Primal weapon-skill aura from the sub slot.",
        },
      ],
      notes: [
        "Maria Theresa's current Wonder replaces Justice's HP sub-aura, not The Moon. The Moon remains required until Haaselia's corresponding transcendence becomes available.",
        "During a genuinely mixed transition, Wedge can temporarily help multiple Omega weapons; it is not part of either completed Varuna destination.",
      ],
      sources: [
        ...commonMagnaSources,
        {
          label: "Current single-sided and double-sided Varuna grids",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/21615",
        },
        {
          label: "2026 double-Varuna Full Auto summon examples",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/483025",
        },
        {
          label: "Wamdus 4★ sub-aura mechanics",
          url: "https://gbf.wiki/Wamdus_%28Summon%29",
        },
        {
          label: "Current Evoker transcendence and Wonders",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/537602",
        },
      ],
    },
  },
  earth: {
    gacha: {
      general: {
        name: "Grand Uriel",
        reason:
          "He remains the broad first Earth target because his frontline utility and Primarch weapon-skill passive improve several teams, including from reserve.",
      },
      oneTurn: {
        name: "Valentine Makora",
        reason:
          "Unlike Uriel's usual reserve contribution, Makora directly increases the first turn through permanent double attacks, guaranteed DA and post-normal damage.",
      },
      highLevel: {
        primary: "Grand Bhaisa",
        secondary: "Summer Lu Woh",
        intervention: "Zero-touch",
        team: "Onmyoji, Kengo, or Rising Force / Grand Bhaisa / Summer Lu Woh / Christmas Shalem",
        reason:
          "Bhaisa is the missing bridge between the roadmap's CA team and modern difficult Full Auto: she opens with 40% bar plus one CA reactivation for every Earth ally, then supplies recurring gauge, healing, CA buffs, permanent debuffs, and automatic multi-hit damage. She also sharply shortens Diaspora's CA-activation phase. Summer Lu Woh is the next comfort upgrade; Christmas Shalem completes the premium dispel and omen-control shell.",
        skip: "Bhaisa is the CA and high-level target, not the upgrade for Sabrina's CA-off normal team. Grand Uriel remains the broadest account pull because his weapon-skill passive works from reserve; Valentine Makora remains the strict one-turn normal target.",
        units: [
          {
            name: "Grand Bhaisa",
            role: "Frontline · primary target",
            id: "3040630000",
          },
          {
            name: "Summer Lu Woh",
            role: "Frontline · comfort target",
            id: "3040583000",
          },
          {
            name: "Holiday Shalem",
            role: "Frontline · seasonal completion",
            id: "3040497000",
          },
        ],
        sources: [
          {
            label: "Kamigame · Bhaisa evaluation and Full Auto examples",
            url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/page/402447158495721208.html",
          },
          {
            label: "Gamewith · Bhaisa mechanics and current evaluation",
            url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/537569",
          },
          {
            label: "Gamewith · current Diaspora CA-activation teams",
            url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/322609",
          },
        ],
      },
      later: [
        {
          name: "Christmas Shalem",
          reason:
            "The seasonal third member for the premium CA/high-difficulty shell: repeated debuffs, dispels, and high-frequency charge attacks. Bhaisa is the foundational target first.",
        },
        {
          name: "Summer Raziel",
          reason:
            "Optimized normal burst after the account is developed; her cannon needs accumulated skill counts and does not replace Makora on the immediate first turn.",
        },
      ],
      plan: {
        current: "Manadiver / Sabrina / Cidala / Yukata Pholia",
        target:
          "Manadiver / Sabrina / Valentine Makora / Yukata Pholia · Grand Uriel reserve",
        ca: "Off",
        opener: [
          "Enable Yukata Pholia S1",
          "Enable only required MC buffs",
          "Keep CA off",
          "Start Full Auto",
        ],
        verdict:
          "The owned Sabrina/Pholia shell is already valid for low-intervention short Full Auto. Uriel remains the better general spark, but Makora—not Uriel or Summer Raziel—is the premium first-turn frontline upgrade.",
        units: [
          { name: "Sabrina", role: "Frontline · owned", id: "3040514000" },
          {
            name: "Valentine Makora",
            role: "Frontline · spark target",
            id: "3040579000",
          },
          {
            name: "Yukata Pholia",
            role: "Frontline · owned",
            id: "3040469000",
          },
          {
            name: "Grand Uriel",
            role: "Reserve · general target",
            id: "3040501000",
          },
        ],
      },
      sources: [
        {
          label: "2026 Earth Magna one-turn example",
          url: "https://t.co/rt4mQFFp4W",
        },
        {
          label: "Current Valentine Makora breakdown",
          url: "https://granbluefantasyblog.com/makura-valentine/",
        },
        {
          label: "Current JP Bhaisa evaluation",
          url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/page/402447158495721208.html",
        },
      ],
    },
    summons: {
      presets: [
        magnaPreset(
          "Yggdrasil Omega",
          "Uriel",
          "The Hanged Man",
          "Beelzebub for general damage; The Tower when difficult Full Auto needs HP.",
        ),
      ],
      notes: [
        "After transcending Caim and enabling his Wonder, remove The Hanged Man: the Wonder reproduces its damage sub-aura and frees the summon slot.",
      ],
      sources: [
        ...commonMagnaSources,
        {
          label: "Caim transcendence and Hanged Man Wonder",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/537602",
        },
      ],
    },
  },
  wind: {
    gacha: {
      general: {
        name: "Catura",
        reason:
          "She gives the largest broad improvement to the safe CA/long-FA team through healing, clear, omen support and flexible normal/CA value.",
      },
      oneTurn: {
        name: "Summer Galleon",
        reason:
          "JP short-fight teams continue to use Narmaya plus Summer Galleon as the immediate normal-burst foundation. Catura does not replace Galleon's first-turn role.",
      },
      highLevel: {
        primary: "Catura",
        secondary: "Bride Meg",
        intervention: "Usually zero-touch",
        team: "Kengo / Catura / Grand Charlotta / Cagliostro & Clarisse",
        reason:
          "Catura is the direct upgrade for the account's third template: she repeatedly accelerates MC and her own ougis while adding healing, clear and multi-hit omen coverage. Charlotta and Cagliostro & Clarisse are already owned, so this target completes a coherent CA/V2 shell rather than requiring a new seasonal core.",
        skip: "The highest solo examples can require a Catura skill-cooldown Artifact. Treat that as a ceiling condition, not a requirement for ordinary Full Auto.",
        units: [
          {
            name: "Catura",
            role: "Frontline · primary target",
            id: "3040313000",
          },
          {
            name: "Grand Charlotta",
            role: "Frontline · owned",
            id: "3040438000",
          },
          {
            name: "Cagliostro & Clarisse",
            role: "Frontline · owned sustain",
            id: "3040593000",
          },
          {
            name: "Raphael",
            role: "Backline · Primarch",
            id: "3040568000",
          },
          {
            name: "Ewiyar",
            role: "Backline · owned sustain",
            id: "3040378000",
          },
        ],
        sources: [
          {
            label: "Current JP Wind high-difficulty example",
            url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88/%E3%83%95%E3%83%AA%E3%83%BC%E3%82%A8%E3%82%B9%E3%83%88/%E3%83%95%E3%83%AA%E3%82%AF%E3%82%A8%E5%A4%A9%E5%85%83.html",
          },
        ],
      },
      later: [
        {
          name: "Grand Ewiyar",
          reason:
            "Strong broad support, but lower urgency because Raphael, Charlotta, Kaguya and Cagliostro & Clarisse are already owned.",
        },
      ],
      plan: {
        current: "Manadiver / Yukata Vampy / Grand Narmaya / Azusa · Raphael + Ewiyar",
        target: "Manadiver or Glory / Summer Galleon / Grand Narmaya / Yukata Vampy · Raphael + Ewiyar",
        ca: "On for Arbos · Off only after testing the short route",
        opener: [
          "Use the required quick summon or MC debuffs",
          "Summer Galleon S1 when acquired",
          "Narmaya S1 and S3; Vampy S2 and S1 as required",
          "Attack",
        ],
        verdict:
          "Summer Galleon is the first direct upgrade to the active Arbos/fast-normal team and completes the published Galleon / Narmaya / Vampy shell. Keep Azusa until the route reliably clears Arbos's debuff checks. Catura remains the broader second target because she completes the separate CA/V2 team.",
        units: [
          {
            name: "Summer Galleon",
            role: "Frontline · first spark target",
            id: "3040544000",
          },
          {
            name: "Grand Narmaya",
            role: "Frontline · owned",
            id: "3040335000",
          },
          {
            name: "Yukata Vampy",
            role: "Frontline · owned",
            id: "3040478000",
          },
          {
            name: "Raphael",
            role: "Backline · Primarch",
            id: "3040568000",
          },
          {
            name: "Ewiyar",
            role: "Backline · owned sustain",
            id: "3040378000",
          },
        ],
      },
      sources: [
        {
          label: "Gamewith Summer Galleon evaluation and teams",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/458527",
        },
        {
          label: "Kamigame Summer Galleon evaluation and teams",
          url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/SSR%E6%B0%B4%E7%9D%80%E3%82%AC%E3%83%AC%E3%83%B2%E3%83%B3.html",
        },
        {
          label: "Gamewith Yggdrasil Arbos guide",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/451305",
        },
        {
          label: "Gamewith Catura evaluation",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/246430",
        },
      ],
    },
    summons: {
      presets: [
        magnaPreset(
          "Tiamat Omega",
          "Raphael",
          "Judgement",
          "Beelzebub for damage and dispel; Temperance for difficult Full Auto.",
        ),
      ],
      notes: [
        "Summer Galleon changes the frontline but does not change the standard Magna III summon skeleton.",
      ],
      sources: commonMagnaSources,
    },
  },
  light: {
    gacha: {
      general: {
        name: "Grand Sandalphon",
        reason:
          "He is the broad account upgrade because his active utility and Primarch weapon-skill passive remain valuable even when another frontline is used.",
      },
      oneTurn: {
        name: "Halloween Vajra",
        reason:
          "After Bhadra's release, Vajra is no longer a narrow burst luxury. She immediately replaces Basara beside Summer Payila, while guaranteed TA, double strike, automatic damage and dispel also give her a future long-Full-Auto destination.",
      },
      highLevel: {
        primary: "Summer Horus",
        secondary: "Grand Sandalphon",
        intervention: "Zero-touch",
        team: "Kengo / Grand Cosmos / Summer Horus / Grand Noa · Yukata Narmaya + Grand Sandalphon",
        reason:
          "Horus is the cleanest account-specific target because Cosmos is already owned. Party charge, immediate FC, huge debuff counts, double ougis, healing, and gauge support directly answer V2 omens without a manual loop.",
        skip: "This is the Cosmos CA/V2 job, not the default normal team. Grand Yuni's important zero-turn choices require setup, so she remains outside the unattended priority.",
        units: [
          {
            name: "Grand Cosmos",
            role: "Frontline · owned core",
            id: "3040467000",
          },
          {
            name: "Summer Horus",
            role: "Frontline · primary target",
            id: "3040518000",
          },
          {
            name: "Grand Noa",
            role: "Frontline · owned flex",
            id: "3040255000",
          },
          {
            name: "Yukata Narmaya",
            role: "Backline · owned MC CA follow-up",
            id: "3040392000",
          },
          {
            name: "Grand Sandalphon",
            role: "Backline · Primarch target",
            id: "3040515000",
          },
        ],
        sources: [
          {
            label: "Current JP Summer Horus evaluation and Agastia Full Auto",
            url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/441131",
          },
        ],
      },
      later: [
        {
          name: "Bhadra long-FA specialization",
          reason:
            "Bhadra turns Halloween Vajra into part of a published CA-off long-Full-Auto shell through permanent post-normal skill damage, skill cap and amplification plus substantial defensive support. Pursue him after Vajra when specializing Light further.",
        },
        {
          name: "Nehan manual-speed specialization",
          reason:
            "Nehan remains excellent for compressed first-turn burst, but Halloween Vajra ranks above him for this account because she upgrades the Payila team and retains a low-intervention Bhadra destination.",
        },
      ],
      plan: {
        current: "Manadiver / Summer Payila / Basara / Grand Jeanne",
        target: "Manadiver / Summer Payila / Halloween Vajra / Grand Jeanne · Summer Heles + Grand Sandalphon",
        ca: "Off",
        opener: [
          "Summer Payila S1",
          "Halloween Vajra S2",
          "Grand Jeanne's required team buffs",
          "MC buff or summon only if required",
          "Attack",
        ],
        verdict:
          "Halloween Vajra is the first opportunity target: she directly replaces Basara now, pairs naturally with Summer Payila, and gains a second endgame role beside Bhadra. Summer Horus remains the next distinct unlock for Cosmos CA/V2; Grand Sandalphon is the broad reserve target.",
        units: [
          {
            name: "Summer Payila",
            role: "Frontline · owned",
            id: "3040672000",
          },
          {
            name: "Halloween Vajra",
            role: "Frontline · priority seasonal target",
            id: "3040617000",
          },
          {
            name: "Grand Jeanne",
            role: "Frontline · owned burst support",
            id: "3040245000",
          },
          { name: "Summer Heles", role: "Backline · owned", id: "3040091000" },
          { name: "Grand Sandalphon", role: "Backline · Primarch target", id: "3040515000" },
        ],
      },
      sources: [
        {
          label: "Summer Payila mechanics",
          url: "https://granbluefantasyblog.com/payila-summer/",
        },
        {
          label: "Current Gamewith Halloween Vajra evaluation",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/524435",
        },
        {
          label: "Current Kamigame Halloween Vajra evaluation",
          url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/SSR%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%B4%E3%82%A1%E3%82%B8%E3%83%A9.html",
        },
        {
          label: "Current Gamewith Bhadra evaluation and Full Auto setups",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/574426",
        },
        {
          label: "Current JP Summer Payila setup reports",
          url: "https://search.yahoo.co.jp/realtime/search?ei=UTF-8&ifr=tl_unit&p=%E6%B0%B4%E7%9D%80%E3%83%8F%E3%82%A4%E3%83%A9+ta&rkf=1",
        },
      ],
    },
    summons: {
      presets: [
        magnaPreset(
          "Luminiera Omega",
          "Metatron",
          "The Star",
          "Beelzebub for the general team; Bahamut 250 for the Cosmos CA preset.",
        ),
      ],
      notes: [
        "For the Nehan one-turn preset, replace the sustain flex with the minimum summon or passive needed to reach the honors target.",
      ],
      sources: commonMagnaSources,
    },
  },
  dark: {
    gacha: {
      general: {
        name: "Grand Sariel",
        reason:
          "He has the highest broad Dark account value because his Primarch passive improves every grid even from reserve while his frontline kit remains immediately relevant.",
      },
      oneTurn: {
        name: "Grand Sariel",
        reason:
          "He starts with guaranteed TA, takes three attack actions and adds post-normal skill damage, making him the direct first-turn acquisition without requiring Ereshkigal.",
      },
      highLevel: {
        primary: "Summer Catura",
        secondary:
          "Valentine Wamdus · Orologia if one opening setup is acceptable",
        intervention: "Catura/Wamdus zero-touch · Orologia semi-auto",
        team: "Fighter Origin / Summer Catura / Grand Lich / Tsukuyomi or Grand Sariel",
        reason:
          "Summer Catura continuously strengthens MC and herself, dispels automatically, and gives MC party-wide cover. Valentine Wamdus is the safer CA alternative; Orologia remains powerful when a one-time opening choice is acceptable.",
        skip: "Rei swaps, Ereshkigal racing, and manual omen scripts are deliberately excluded. Sariel remains the broad and one-turn target even though Catura is the stronger high-difficulty FA specialist.",
        units: [
          {
            name: "Summer Catura",
            role: "Frontline · primary target",
            id: "3040610000",
          },
          {
            name: "Grand Lich",
            role: "Frontline · owned core",
            id: "3040357000",
          },
          {
            name: "Tsukuyomi",
            role: "Frontline · owned sustain",
            id: "3040581000",
          },
          {
            name: "Grand Sariel",
            role: "Frontline / reserve · target",
            id: "3040611000",
          },
        ],
        sources: [
          {
            label: "Current JP Dark Full Auto and high-difficulty comparison",
            url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%83%A9%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0/%E6%9C%80%E5%BC%B7%E3%82%AD%E3%83%A3%E3%83%A9%E3%83%A9%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0.html",
          },
        ],
      },
      later: [
        {
          name: "Grand Orologia",
          reason:
            "The largest immediate upgrade to the owned Lich/Tyra general team, but not mandatory for the first turn.",
        },
      ],
      plan: {
        current: "Manadiver / Grand Lich / Summer Magisa / Tsukuyomi",
        target: "Manadiver / Seox / Grand Lich / Grand Sariel or Tsukuyomi",
        ca: "On for general FA · configure Azusa's 1/2 for one-turn skill burst",
        opener: [
          "Use the Lich/Magisa/Tsukuyomi frontline for sustained FA",
          "Replace Tsukuyomi with Summer Azusa when immediate skill damage matters",
          "Do not require Kaneshige for the general Magna III plan",
        ],
        verdict:
          "Maintain a shared Azusa/Lich skill shell and a balanced Seox general shell. Sariel remains the broad future target without requiring Ereshkigal or an unowned seasonal attacker.",
        units: [
          {
            name: "Seox",
            role: "Frontline · general attacker",
            id: "3040035000",
          },
          {
            name: "Grand Lich",
            role: "Frontline · owned core",
            id: "3040357000",
          },
          {
            name: "Grand Sariel",
            role: "Frontline / reserve · target",
            id: "3040611000",
          },
          {
            name: "Tsukuyomi",
            role: "Frontline · owned flex",
            id: "3040581000",
          },
        ],
      },
      sources: [
        {
          label: "Current Sariel opening-turn reference",
          url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/327535",
        },
      ],
    },
    summons: {
      presets: [
        magnaPreset(
          "Celeste Omega",
          "Sariel",
          "Death",
          "Bahamut 250 for the saved Azusa Kengo team; Beelzebub for Manadiver or general damage.",
        ),
      ],
      notes: [
        "Belial is a short-fight option only when its maximum-HP penalty does not threaten the unattended run.",
      ],
      sources: commonMagnaSources,
    },
  },
};
