export type EternalPlan = {
  name:string;
  element:string;
  base:string;
  final:string;
  transcendence:string;
  accountPlan:string;
};

export type EternalSource = {label:string;publisher:string;url:string;scope:string};

export const ETERNALS_VERSION="v1.0";
export const ETERNALS_REVIEWED_ON="4 Sep 2026";

export const eternalRules=[
  {title:"4★ is a valid endpoint",detail:"Keep an Eternal at recruitment when the account only needs their passive or farming utility. Esser's drop-rate passive, Siete's CA support and Threo's basic Ground Zero do not require transcendence."},
  {title:"5★ is the normal functional endpoint",detail:"Final uncap is for an Eternal that will actually enter a frontline. It is not necessary to final-uncap all ten until a deliberate Lv140–150 project requires that prerequisite."},
  {title:"Transcendence needs a named job",detail:"Do not spend a gold bar or blue paper for tier-list value alone. Identify the saved team and repeated content that uses the new breakpoint first."},
] as const;

export const eternalPlans:EternalPlan[]=[
  {name:"Uno",element:"Water",base:"Usually enough",final:"Only for a specific defensive strategy",transcendence:"Skip; Lv150 is specialized counter/burst value",accountPlan:"Leave at 4★. Payila, Gabriel, Octavia and Haaselia are ahead of him."},
  {name:"Tweyen",element:"Light",base:"Basic paralysis utility",final:"Useful debuff and CA upgrade if fielded",transcendence:"Optional Lv110; no default reason to go higher",accountPlan:"Keep at 4★ until a Light team specifically needs her."},
  {name:"Threo",element:"Earth",base:"Ground Zero farming utility",final:"Optional frontline improvement",transcendence:"Lv120–130 only for committed Sandbox or Earth burst",accountPlan:"Recruit-level utility is enough for now."},
  {name:"Feower",element:"Water",base:"Basic dispel and delay utility",final:"Only if actively fielded",transcendence:"Skip; optional Lv110 is not an account priority",accountPlan:"Leave at 4★. Do not divert Water resources from Haaselia."},
  {name:"Fif",element:"Light",base:"Basic healing and revival",final:"Worthwhile for serious manual or difficult fights",transcendence:"Lv150-or-stop specialist for modern Light healing/HL",accountPlan:"Future specialist only after the Light roster exposes a real survival gap."},
  {name:"Seox",element:"Dark",base:"Self-contained attacker",final:"Strong personal damage",transcendence:"Lv130 burst / Lv150 long-fight damage",accountPlan:"Excluded by preference. Recruit only for prerequisites; do not build teams around him."},
  {name:"Siete",element:"Wind",base:"Backline CA-damage support already works",final:"Useful only if fielded",transcendence:"Lv150 for unique Fated Chain omen cancellation",accountPlan:"Best eventual max target, but only when a V2 raid creates the need."},
  {name:"Eahta",element:"Earth",base:"Not the intended endpoint",final:"Functional Earth CA engine",transcendence:"Lv110 efficient; Lv150 for dedicated Earth CA/HL",accountPlan:"First sensible combat transcendence once an Earth CA preset exists."},
  {name:"Niyon",element:"Wind",base:"Basic buffs and debuffs",final:"Minimum sensible frontline version",transcendence:"Lv130 normal-axis breakpoint; Lv150 only for committed Wind",accountPlan:"Conditional project, not an automatic Lv150 target."},
  {name:"Esser",element:"Fire",base:"Drop-rate passive already works",final:"Only for frontline burst and stronger active utility",transcendence:"Lv110 optional; Lv150 for committed Fire/TH frontline use",accountPlan:"Recruit early and keep at 4★ unless she gains a saved frontline."},
];

export const eternalOrder=[
  "Complete Haaselia's selected 5★ and fourth-skill route before any Water Eternal transcendence.",
  "Recruit Esser for passive farming value; keep Uno and Feower at 4★.",
  "Save blue papers. Consider Eahta 110 only after creating an Earth CA preset.",
  "Build Siete directly toward 150 only when FC omen cancellation is needed for repeated V2 content.",
  "Revisit Fif 150, Niyon 130–150 or Esser 150 only when their element becomes an active project.",
] as const;

export const eternalSources:Record<string,EternalSource>={
  priority:{label:"Eternal recruitment, final and transcendence priorities",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/22885",scope:"Current 2026 comparison and practical level breakpoints for all ten Eternals."},
  comparison:{label:"Eternal transcendence comparison",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%B2%E3%83%BC%E3%83%A0%E7%9F%A5%E8%AD%98/%E5%8D%81%E5%A4%A9%E8%A1%86.html",scope:"Current 120, 140 and 150 evaluations, including specialist endgame roles."},
  community:{label:"All-Eternals transcendence assessment",publisher:"No-nashi / note",url:"https://note.com/ineptus/n/n4268e3317991",scope:"2026 Rank 400 player experience covering practical use frequency and Siete's unique FC role."},
};
