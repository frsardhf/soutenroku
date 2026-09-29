export type PrimalSource={label:string;publisher:string;url:string;scope:string};

export const PRIMALS_REVIEWED_ON="29 Sep 2026";

export const providenceStoneOrder=[
  {rank:"01",name:"Beelzebub",verdict:"Stone first",use:"The universal first completion: strong main aura, farming call, dispels, debuffs and plain damage across every element.",gate:"Finish 3★ in one action, then farm the 4★ materials."},
  {rank:"02",name:"Triple Zero",verdict:"Full Auto / V2 priority",use:"Best match for low-input play: wing buildup, party damage dealt and an omen-cancel or full-dispel call for mechanic-heavy fights.",gate:"Move below Yatima only when deliberately optimizing short manual summon routes."},
  {rank:"03",name:"Belial",verdict:"Broad passive value",use:"Unconditional all-element supplemental damage remains useful in normal and multi-hit teams after Robur arrives.",gate:"Robur replaces it only while the matching element stays above 80% HP; their sub auras do not stack."},
  {rank:"04",name:"Lucifer",verdict:"Long Full Auto project",use:"Exceptional healing, debuff recovery and defensive utility for long Full Auto and solo content.",gate:"Raise this earlier only when 15 Eternity Sands are reserved for the meaningful transcendence breakpoints."},
  {rank:"05",name:"Orologia",verdict:"Concrete MC route only",use:"A major upgrade for MC-centered short and Revans setups whose plan explicitly exploits the altered first skill.",gate:"Do not stone from rating alone; identify the class and encounter first."},
  {rank:"06",name:"Yatima",verdict:"Summon-package project",use:"Excellent for planned call pairs, two summons per turn and optimized short routes.",gate:"Requires the rest of the summon deck; lower return for unattended Full Auto."},
  {rank:"07",name:"Versusia",verdict:"Specialized burst project",use:"High ceiling with Yatima, repeated triple attacks, double CAs and Fighter Origin or Falsehood routes.",gate:"Stone only when the exact activation sequence already exists."},
  {rank:"08",name:"Bahamut",verdict:"Defer",use:"Useful CA and summon support, but current general return is below Lucifer and the newer Providence options.",gate:"Its transcendence also competes for 15 Eternity Sands."},
] as const;

export const elementalStoneOrder=[
  {rank:"01",target:"Target Optimus",value:"Activates the completed primal weapon package and later enables double-sided durability.",rule:"Only when the weapons are ready; do not build the summon first."},
  {rank:"02",target:"Matching Primarch",value:"A stable 15% damage-cap sub aura at 4★ that works in both Magna and primal.",rule:"Usually the safest element-specific stone target after the actual Optimus transition."},
  {rank:"03",target:"Matching Six Dragon",value:"At 4★, adds 40% to that element's normal weapon skills and becomes a near-permanent primal slot.",rule:"Permanent and ticketable; use stones only when the primal grid needs it now."},
  {rank:"04",target:"Unticketable seasonal / unique",value:"Can define a specific burst or Full Auto route when its sub aura or call has no substitute.",rule:"Require an actual preset and encounter, not theoretical future value."},
  {rank:"05",target:"Acies or Robur",value:"Modern, powerful elemental damage slots that can outperform older premium summons in their intended team.",rule:"Regular ticket targets. Prefer Surprise Tickets and duplicates over Sunlight Stones."},
  {rank:"06",target:"Crest and older utility",value:"Conditional elemental attack or niche calls after the core summon slots are complete.",rule:"Natural copies only in normal circumstances."},
] as const;

export const premiumSummonSeries=[
  {series:"Acies",state:"2 of 6 released",maximum:"3★",effect:"Unconditional, damage-type-specific cap and supplemental damage. Lodern supports Fire skill damage; Bastet supports Light normal attacks.",best:"The matching team wants that exact damage type in short and long content.",acquire:"Use at 0★ immediately; finish through Surprise Tickets or duplicates. Do not assume the four unreleased effects."},
  {series:"Robur",state:"Complete",maximum:"3★",effect:"25,000 supplemental damage at 0★ or 50,000 at 3★ while the ally remains at or above 80% HP.",best:"Short burst, farming and high-HP multi-hit teams. It outperforms Belial while active.",acquire:"Ticket or duplicate project. It cannot stack with Belial and is less reliable in long Full Auto."},
  {series:"Crest",state:"Complete",maximum:"4★",effect:"Elemental ATK based on each ally's crests, reaching 35% at five crests after 4★.",best:"Medium or long fights with reliable teamwide crest generation.",acquire:"Lowest priority. Use natural copies; do not spend stones for an unsupported crest team."},
] as const;

export const waterStoneQueue=[
  {stage:"Current Magna III",order:"The Moon → universal Providence",note:"Do not stone Wamdus or Varuna simply because they are future pieces."},
  {stage:"Single-sided Varuna ready",order:"Weapon package → borrow Varuna 250",note:"Test the completed grid before consuming Varuna uncaps or primal transcendence resources."},
  {stage:"Personal / double Varuna",order:"Varuna → Gabriel → Wamdus",note:"Gabriel is the stable cap slot; Wamdus becomes valuable when normal weapon skills actually form the grid."},
  {stage:"Specialized Water slots",order:"Future Water Acies → Tetragod → Princess Long Ji",note:"Exact Acies effect is unknown. Build Tetragod through tickets for short high-HP routes; Crest is not part of the current Water templates."},
] as const;

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
  sunlight:{label:"Sunlight Stone priority",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E9%87%91%E5%89%9B%E6%99%B6.html",scope:"Current general ordering, same-tier ordering and the recommendation to wait until a summon can be completed in one action."},
  sunlightGamewith:{label:"Sunlight Stone candidates",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/161179",scope:"Providence, Optimus, Primarch, Six Dragon and specialized sub-aura candidates."},
  suptix:{label:"Permanent summon Surprise Ticket targets",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/22354",scope:"Lodern and the Robur series as ticketable elemental upgrades rather than default Sunlight Stone targets."},
  lodern:{label:"Lodern mechanics",publisher:"GBF Wiki",url:"https://gbf.wiki/Lodern",scope:"Acies Fire skill-damage, skill-cap and supplemental-damage breakpoints at 0★ and 3★."},
  bastet:{label:"Bastet evaluation",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/574438",scope:"Acies Light normal-attack cap and supplemental damage, including its short-to-Full-Auto use."},
  robur:{label:"Robur series mechanics",publisher:"GBF Wiki",url:"https://gbf.wiki/Category%3ARobur_Series_Summons",scope:"All six elemental variants, the 80% HP condition and 0★/3★ supplemental-damage values."},
  crest:{label:"Crest series mechanics",publisher:"GBF Wiki",url:"https://gbf.wiki/Category%3ACrest_Series_Summons",scope:"All six variants, crest scaling and the 35% elemental-attack maximum at 4★."},
  subAura:{label:"Current sub-aura guidance",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E5%8F%AC%E5%96%9A%E7%9F%B3/index-%E3%82%B5%E3%83%96%E5%8A%A0%E8%AD%B7.html",scope:"Slot competition and the limited role of Crest summons in teams that can accumulate crests."},
  grids:{label:"Current Varuna grid and critical tables",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/21615",scope:"Current Water boost-weapon grids, one-sided and double-sided critical combinations, and transition weapon requirements."},
  comparison:{label:"Varuna ideal grids and transition line",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E6%AD%A6%E5%99%A8%E7%B7%A8%E6%88%90/%E7%90%86%E6%83%B3%E7%B7%A8%E6%88%90_%E6%B0%B4%E7%A5%9E.html",scope:"Contemporary double-sided, Full Auto, farming and high-difficulty Varuna examples."},
  varuna:{label:"Varuna aura and transcendence effects",publisher:"GBF Wiki",url:"https://gbf.wiki/Varuna",scope:"Main aura progression and the level-210/250 Water elemental ATK and HP sub aura."},
  report:{label:"2026 Water Unite and Fight report",publisher:"Chicken@",url:"https://note.com/chicken5353/n/n6bb864cb9e4f",scope:"Observed main-Yatima, support-Varuna use for a Death and Versusia opening route."},
} as const;
