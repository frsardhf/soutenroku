export type PrimalSource={label:string;publisher:string;url:string;scope:string};

export const PRIMALS_REVIEWED_ON="4 Sep 2026";

export const waterPrimalDecisions=[
  {question:"Can Primal be tested without owning Varuna?",answer:"Yes",detail:"Use an owned route-defining main summon and borrow a level-250 Varuna. Personal Varuna is no longer the entry gate."},
  {question:"What is the actual transition gate?",answer:"Weapons",detail:"Build the Rubea Stiria boost core and the required critical, supplemental and cap pieces before spending Damascus bars."},
  {question:"When does personal Varuna matter?",answer:"Later",detail:"It unlocks double-sided durability and flexibility, removes support dependence, and supplies a 20% Water elemental ATK and HP sub-aura at level 250."},
] as const;

export const waterMainSummons=[
  {name:"Yatima",use:"Intentional summon combinations, including Death routes that bring Haaselia forward.",warning:"Build the complete call pair first; it is not a passive drop-in replacement."},
  {name:"Beelzebub",use:"Immediate damage, buffs and debuffs for short or general routes.",warning:"Its value is concentrated in the opening and differs from defensive main summons."},
  {name:"Orologia",use:"Specialized opening and route manipulation where its main effect is explicitly required.",warning:"Use only when the encounter plan exploits it."},
  {name:"Versusia",use:"Powerful main-only effect for teams able to satisfy its activation pattern.",warning:"It does not raise HP like a second Varuna; check the team cadence and survival."},
] as const;

export const waterPrimalModes=[
  {mode:"Single-sided Varuna",main:"Owned Providence or utility summon",support:"Varuna 250",best:"First Primal transition, burst, route-specific calls and modern general setups.",cost:"Needs exact one-sided critical thresholds and usually two Rubea Stirias. A 150% support Varuna can invalidate a preset calculated for 170%."},
  {mode:"Double Varuna",main:"Personal Varuna 250",support:"Varuna 250",best:"High-difficulty, durable Full Auto and grids relying heavily on boosted HP, Garrison, healing, TA or easier critical thresholds.",cost:"Requires owning and transcending Varuna and gives up the Providence main aura/call."},
  {mode:"Remain Magna III",main:"Leviathan Omega",support:"Leviathan Omega or utility",best:"The correct default until the premium weapon package clearly outperforms the completed Magna grid.",cost:"Lower premium ceiling, but avoids premature bars and Optimus materials."},
] as const;

export const waterTransitionSteps=[
  "Finish the Water Magna III baseline and Haaselia/The Moon progression.",
  "Hold Damascus bars until the single-sided Primal weapon package is coherent: normally two Rubea Stirias plus the required critical, supplemental and cap weapons.",
  "Create a saved preset with the chosen owned main summon and support Varuna 250; calculate critical rate for that exact one-sided setup.",
  "Compare it against the completed Magna preset in the same encounter before declaring the transition complete.",
  "Acquire and transcend personal Varuna only when double-sided durability, support independence or the level-250 sub aura solves a repeated need.",
] as const;

export const primalSources:Record<string,PrimalSource>={
  grids:{label:"Current Varuna grid and critical tables",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/21615",scope:"Current Water boost-weapon grids, one-sided and double-sided critical combinations, and transition weapon requirements."},
  comparison:{label:"Varuna ideal grids and transition line",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E6%AD%A6%E5%99%A8%E7%B7%A8%E6%88%90/%E7%90%86%E6%83%B3%E7%B7%A8%E6%88%90_%E6%B0%B4%E7%A5%9E.html",scope:"Contemporary double-sided, Full Auto, farming and high-difficulty Varuna examples."},
  varuna:{label:"Varuna aura and transcendence effects",publisher:"GBF Wiki",url:"https://gbf.wiki/Varuna",scope:"Main aura progression and the level-210/250 Water elemental ATK and HP sub aura."},
  report:{label:"2026 Water Unite and Fight report",publisher:"Chicken@",url:"https://note.com/chicken5353/n/n6bb864cb9e4f",scope:"Observed main-Yatima, support-Varuna use for a Death and Versusia opening route."},
} as const;
