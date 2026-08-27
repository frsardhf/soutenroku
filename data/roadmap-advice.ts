import type { StableElementId } from "./roadmap-identity";

export type AdviceSource = {
  label: string;
  url: string;
};

export type TargetChoice = {
  name: string;
  reason: string;
};

export type OneTurnPlan = {
  current: string;
  target: string;
  ca: string;
  opener: string[];
  verdict: string;
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

export const roadmapAdviceReviewedAt = "24 Aug 2026";

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
        reason: "He is the broadest missing upgrade for the owned Zeta normal team and also converts Fire from its slower CA fallback into a modern first-turn normal setup.",
      },
      oneTurn: {
        name: "Grand Percival",
        reason: "Current JP short-fight routing is built around The Sun, Secret Triad and Percival S3. Zeta S1 is the first optional extra button when the honors threshold is missed.",
      },
      highLevel: {
        primary: "Summer Atum",
        secondary: "Grand Yuel",
        intervention: "Zero-touch",
        team: "Onmyoji or Kengo / Sandira / Summer Atum / Sato or Fire Sevilbarra",
        reason: "Atum completes the owned Sandira CA shell with automatic gauge, post-ougi damage, hit-count coverage, healing, and durability. Grand Yuel is the later comfort pick for automatic healing, debuff shortening, and dispel.",
        skip: "Do not mistake Christmas Wamdus or Alanaan swap ceilings for requirements. Grand Percival remains the general and one-turn target, not the first specialist for difficult unattended fights.",
        sources: [
          { label: "Current JP Fire character and high-difficulty templates", url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%83%A9%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0/%E6%9C%80%E5%BC%B7%E3%82%AD%E3%83%A3%E3%83%A9%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0.html" },
        ],
      },
      later: [
        { name: "Grand Yuel", reason: "A later general-team refinement, not a prerequisite for the Percival shell." },
      ],
      plan: {
        current: "Existing Sandira Kengo preset",
        target: "Manadiver / Grand Zeta / Grand Percival / Grand Wilnas · Michael reserve",
        ca: "Off",
        opener: ["The Sun summon", "Secret Triad", "Percival S3", "Optional Zeta S1", "Attack"],
        verdict: "Percival genuinely changes the account's Fire one-turn route. Christmas Wamdus and Alanaan-swap versions are ceiling variants, while owned Wilnas is the reasonable M3 substitute.",
      },
      sources: [
        { label: "Current JP Fire short-fight templates", url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3%E7%B7%A8%E6%88%90/%E7%81%AB%E5%B1%9E%E6%80%A7PT.html" },
      ],
    },
    summons: {
      presets: [magnaPreset("Colossus Omega", "Michael", "The Sun", "Beelzebub for damage and dispel; The Devil when difficult Full Auto needs HP.")],
      notes: ["Keep The Sun callable only when the opening route actually uses its call; otherwise its low stats make the sub-aura-only row appropriate."],
      sources: commonMagnaSources,
    },
  },
  water: {
    gacha: {
      general: {
        name: "Save",
        reason: "The owned Payila, Gabriel, Octavia, Yatima and Sylvia core is already unusually complete. Haaselia and the Varuna summon/weapon package improve the account more than another generic frontline pull.",
      },
      oneTurn: {
        name: "None",
        reason: "Payila, Gabriel and Octavia are already the intended modern normal shell. Re-test them after Leviathan M3, Opus and Haaselia rather than buying a redundant character.",
      },
      highLevel: {
        primary: "Yukata Aria",
        secondary: "Summer Tefnut",
        intervention: "Zero-touch · non-urgent",
        team: "Manadiver / Yukata Aria / Yatima or Payila / Gabriel",
        reason: "Aria adds near-every-turn dispel, Water healing, cover utility, and MC amplification. This is a comfort upgrade because the owned Yatima, Sylvia, Payila, Gabriel, Octavia, and Wamdus roster already covers high-level play unusually well.",
        skip: "Bride Ilsa belongs to specialized short-fight and Hraesvelgr routes. Do not spark her for this Full Auto objective.",
        sources: [
          { label: "Current JP Yukata Aria Full Auto evaluation", url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/page/415884431597807974.html" },
        ],
      },
      later: [
        { name: "Grand Lancelot", reason: "Only when deliberately committing to the separate skill-damage archetype." },
        { name: "Vajra", reason: "A dedicated Kengo improvement, but not urgent with Sylvia, Yatima and Wamdus already owned." },
      ],
      plan: {
        current: "Kengo CA fallback or the owned normal team after testing",
        target: "Manadiver / Payila / Grand Gabriel / Grand Octavia",
        ca: "Off for the one-turn test",
        opener: ["Enable Payila's normal support", "Add only the required MC buffs", "Attack", "Return to Kengo if the honors target is missed"],
        verdict: "No Water gacha character is required. Normal attack becomes preferable when it reaches the honors target with fewer animations; Kengo remains the reliable weak-grid fallback.",
      },
      sources: [
        { label: "2026 Water GW Payila / Octavia / Gabriel report", url: "https://aytj9.hatenablog.com/entry/2026/04/11/003328" },
      ],
    },
    summons: {
      presets: [
        magnaPreset("Leviathan Omega", "Gabriel", "The Moon", "Beelzebub for general damage and dispel; Justice for difficult Full Auto."),
        {
          name: "Double Varuna · general Full Auto",
          main: "Varuna 250",
          support: "Varuna 250",
          quickSummon: "Lucifer 250",
          subSummons: ["Gabriel 4★", "Lucifer 250", "Triple Zero 4★", "Flex"],
          subAuras: ["The Moon 5★", "Wamdus 4★"],
          flex: "Beelzebub for the account default; Justice for survival; Belial only when the HP loss is safe; Yatima only with an intentional call configuration.",
          note: "Wamdus 4★ is the Varuna counterpart to Wedge: it adds 40% to Water, Tsunami and Hoarfrost skills. A completed Varuna grid should remove Wedge because Wedge only amplifies Omega skills.",
        },
      ],
      notes: [
        "Maria Theresa's current Wonder replaces Justice's HP sub-aura, not The Moon. The Moon remains required until Haaselia's corresponding transcendence becomes available.",
        "During a genuinely mixed transition, Wedge can temporarily help multiple Omega weapons; it is not part of the saved double-Varuna destination.",
      ],
      sources: [
        ...commonMagnaSources,
        { label: "2026 double-Varuna Full Auto summon examples", url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/483025" },
        { label: "Wamdus 4★ sub-aura mechanics", url: "https://gbf.wiki/Wamdus_%28Summon%29" },
        { label: "Current Evoker transcendence and Wonders", url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/537602" },
      ],
    },
  },
  earth: {
    gacha: {
      general: {
        name: "Grand Uriel",
        reason: "He remains the broad first Earth target because his frontline utility and Primarch weapon-skill passive improve several teams, including from reserve.",
      },
      oneTurn: {
        name: "Valentine Makora",
        reason: "Unlike Uriel's usual reserve contribution, Makora directly increases the first turn through permanent double attacks, guaranteed DA and post-normal damage.",
      },
      highLevel: {
        primary: "Summer Lu Woh",
        secondary: "Christmas Shalem",
        intervention: "Zero-touch",
        team: "Rising Force, Kengo, or Onmyoji / Summer Lu Woh / Christmas Shalem / flexible third",
        reason: "Lu Woh is first for unattended stability through gauge, mitigation, healing, and full HP/debuff recovery. Shalem follows for repeated debuffs, dispels, and high-frequency ougis; together they form the premium Earth CA and omen-control package.",
        skip: "Valentine Makora remains the normal-attack and one-turn acquisition. Grand Uriel remains the broad account target; neither replaces this specialist survival pair.",
        sources: [
          { label: "Current JP Summer Lu Woh evaluation and endgame example", url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/SSR%E6%B0%B4%E7%9D%80%E3%83%AB%E3%82%AA%E3%83%BC.html" },
        ],
      },
      later: [
        { name: "Summer Raziel", reason: "Optimized normal burst after the account is developed; her cannon needs accumulated skill counts and does not replace Makora on the immediate first turn." },
      ],
      plan: {
        current: "Wrestler / Sabrina / Cidala / Yukata Pholia",
        target: "Wrestler / Sabrina / Valentine Makora / Yukata Pholia · Grand Uriel reserve",
        ca: "Off",
        opener: ["Yukata Pholia S1", "Optional debuff or MC buff", "Tag Team", "Attack"],
        verdict: "The owned Sabrina/Pholia shell is already valid. Uriel remains the better general spark, but Makora—not Uriel or Summer Raziel—is the premium one-turn frontline upgrade.",
      },
      sources: [
        { label: "2026 Earth Magna one-turn example", url: "https://t.co/rt4mQFFp4W" },
        { label: "Current Valentine Makora breakdown", url: "https://granbluefantasyblog.com/makura-valentine/" },
      ],
    },
    summons: {
      presets: [magnaPreset("Yggdrasil Omega", "Uriel", "The Hanged Man", "Beelzebub for general damage; The Tower when difficult Full Auto needs HP.")],
      notes: ["After transcending Caim and enabling his Wonder, remove The Hanged Man: the Wonder reproduces its damage sub-aura and frees the summon slot."],
      sources: [
        ...commonMagnaSources,
        { label: "Caim transcendence and Hanged Man Wonder", url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/537602" },
      ],
    },
  },
  wind: {
    gacha: {
      general: {
        name: "Catura",
        reason: "She gives the largest broad improvement to the safe CA/long-FA team through healing, clear, omen support and flexible normal/CA value.",
      },
      oneTurn: {
        name: "Summer Galleon",
        reason: "JP short-fight teams continue to use Narmaya plus Summer Galleon as the immediate normal-burst foundation. Catura does not replace Galleon's first-turn role.",
      },
      highLevel: {
        primary: "Catura",
        secondary: "Bride Meg",
        intervention: "Usually zero-touch",
        team: "Kengo or Mariachi / Catura / Grand Charlotta / flexible sustain or omen slot",
        reason: "Catura is the rare overlap between broad account value and high-level FA: she repeatedly accelerates MC and her own ougis while supporting the CA loop. Bride Meg is the later specialist for repeated ougis, hit counts, debuffs, and dispels.",
        skip: "The highest solo examples can require a Catura skill-cooldown Artifact. Treat that as a ceiling condition, not a requirement for ordinary Full Auto.",
        sources: [
          { label: "Current JP Wind high-difficulty example", url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88/%E3%83%95%E3%83%AA%E3%83%BC%E3%82%A8%E3%82%B9%E3%83%88/%E3%83%95%E3%83%AA%E3%82%AF%E3%82%A8%E5%A4%A9%E5%85%83.html" },
        ],
      },
      later: [
        { name: "Grand Ewiyar", reason: "Strong broad support, but lower urgency because Raphael, Charlotta, Kaguya and Cagliostro & Clarisse are already owned." },
      ],
      plan: {
        current: "Manadiver or Glory / Summer Mahira / Grand Narmaya / Raphael",
        target: "Manadiver or Glory / Grand Narmaya / Summer Galleon / Raphael",
        ca: "Off",
        opener: ["Current team: Mahira targets Narmaya", "Narmaya S1 and S3", "Required MC damage or echo buff", "Attack"],
        verdict: "Keep Catura first for general account value, but move Summer Galleon ahead whenever judging one-turn performance or a proper seasonal spark opportunity.",
      },
      sources: [
        { label: "2026 JP Wind short-team discussion", url: "https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13323977208" },
        { label: "Japanese Wind one-turn example", url: "https://artsgraffiti.jimdofree.com/gb-2024-wind-preparation/" },
      ],
    },
    summons: {
      presets: [magnaPreset("Tiamat Omega", "Raphael", "Judgement", "Beelzebub for damage and dispel; Temperance for difficult Full Auto.")],
      notes: ["Summer Galleon changes the frontline but does not change the standard Magna III summon skeleton."],
      sources: commonMagnaSources,
    },
  },
  light: {
    gacha: {
      general: {
        name: "Grand Sandalphon",
        reason: "He is the broad account upgrade because his active utility and Primarch weapon-skill passive remain valuable even when another frontline is used.",
      },
      oneTurn: {
        name: "Nehan",
        reason: "Nehan compresses the first turn with guaranteed TA, echo and double strike for the other three members. That is materially different from Sandalphon's usual reserve contribution.",
      },
      highLevel: {
        primary: "Summer Horus",
        secondary: "Save after Horus",
        intervention: "Zero-touch",
        team: "Kengo / Grand Cosmos / Summer Horus / Grand Noa or Grand Lu Woh",
        reason: "Horus is the cleanest account-specific target because Cosmos is already owned. Party charge, immediate FC, huge debuff counts, double ougis, healing, and gauge support directly answer V2 omens without a manual loop.",
        skip: "Grand Yuni's important zero-turn choices require setup, so she is excluded from the unattended priority. Nehan stays on the separate one-turn list.",
        sources: [
          { label: "Current JP Summer Horus evaluation and Agastia Full Auto", url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/441131" },
        ],
      },
      later: [
        { name: "Grand Sandalphon reserve", reason: "Once acquired, keep his Primarch passive active from reserve when the Nehan short team occupies the frontline." },
      ],
      plan: {
        current: "Manadiver / Summer Payila / Basara / Grand Jeanne",
        target: "Manadiver / Summer Payila / Nehan / Basara or Grand Jeanne",
        ca: "Off",
        opener: ["Summer Payila S1", "Nehan S1 and S2", "Nehan S3 only if required", "MC buff or summon only if required", "Attack"],
        verdict: "Grand Sandalphon remains the first broad spark, but Nehan is unquestionably the account's first Light acquisition when the objective is one-turn honors farming.",
      },
      sources: [
        { label: "Summer Payila mechanics", url: "https://granbluefantasyblog.com/payila-summer/" },
        { label: "Nehan mechanics", url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/284496" },
        { label: "Current JP Summer Payila setup reports", url: "https://search.yahoo.co.jp/realtime/search?ei=UTF-8&ifr=tl_unit&p=%E6%B0%B4%E7%9D%80%E3%83%8F%E3%82%A4%E3%83%A9+ta&rkf=1" },
      ],
    },
    summons: {
      presets: [magnaPreset("Luminiera Omega", "Metatron", "The Star", "Beelzebub for the general team; Bahamut 250 for the Cosmos CA preset.")],
      notes: ["For the Nehan one-turn preset, replace the sustain flex with the minimum summon or passive needed to reach the honors target."],
      sources: commonMagnaSources,
    },
  },
  dark: {
    gacha: {
      general: {
        name: "Grand Sariel",
        reason: "He has the highest broad Dark account value because his Primarch passive improves every grid even from reserve while his frontline kit remains immediately relevant.",
      },
      oneTurn: {
        name: "Grand Sariel",
        reason: "He starts with guaranteed TA, takes three attack actions and adds post-normal skill damage, making him the direct first-turn acquisition without requiring Ereshkigal.",
      },
      highLevel: {
        primary: "Summer Catura",
        secondary: "Valentine Wamdus · Orologia if one opening setup is acceptable",
        intervention: "Catura/Wamdus zero-touch · Orologia semi-auto",
        team: "Fighter Origin / Summer Catura / Grand Lich / Tsukuyomi or Grand Sariel",
        reason: "Summer Catura continuously strengthens MC and herself, dispels automatically, and gives MC party-wide cover. Valentine Wamdus is the safer CA alternative; Orologia remains powerful when a one-time opening choice is acceptable.",
        skip: "Rei swaps, Ereshkigal racing, and manual omen scripts are deliberately excluded. Sariel remains the broad and one-turn target even though Catura is the stronger high-difficulty FA specialist.",
        sources: [
          { label: "Current JP Dark Full Auto and high-difficulty comparison", url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%83%A9%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0/%E6%9C%80%E5%BC%B7%E3%82%AD%E3%83%A3%E3%83%A9%E3%83%A9%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0.html" },
        ],
      },
      later: [
        { name: "Grand Orologia", reason: "The largest immediate upgrade to the owned Lich/Tyra general team, but not mandatory for the first turn." },
      ],
      plan: {
        current: "Manadiver / Grand Lich / Summer Magisa / Tsukuyomi",
        target: "Manadiver / Seox / Grand Lich / Grand Sariel or Tsukuyomi",
        ca: "On for general FA · configure Azusa's 1/2 for one-turn skill burst",
        opener: ["Use the Lich/Magisa/Tsukuyomi frontline for sustained FA", "Replace Tsukuyomi with Summer Azusa when immediate skill damage matters", "Do not require Kaneshige for the general Magna III plan"],
        verdict: "Maintain a shared Azusa/Lich skill shell and a balanced Seox general shell. Sariel remains the broad future target without requiring Ereshkigal or an unowned seasonal attacker.",
      },
      sources: [
        { label: "Current Sariel opening-turn reference", url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/327535" },
      ],
    },
    summons: {
      presets: [magnaPreset("Celeste Omega", "Sariel", "Death", "Bahamut 250 for the saved Azusa Kengo team; Beelzebub for Manadiver or general damage.")],
      notes: ["Belial is a short-fight option only when its maximum-HP penalty does not threaten the unattended run."],
      sources: commonMagnaSources,
    },
  },
};
