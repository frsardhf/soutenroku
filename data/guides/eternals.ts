export type EternalPlan = { name:string; element:string; base:string; final:string; transcendence:string; accountPlan:string };
export type EternalSource = {label:string;publisher:string;url:string;scope:string};

export const ETERNALS_VERSION="v1.1";
export const ETERNALS_REVIEWED_ON="8 Sep 2026";

export const eternalRules=[
  {title:"Female-only transcendence",detail:"Only Tweyen, Threo, Fif, Niyon and Tien receive 5★ and Transcendence investment during this plan. Their useful stopping points matter more than completing level 150 automatically."},
  {title:"Male Eternals stop at base 4★",detail:"Recruit Anre, Feower, Seox, Seofon and Eahta for collection only. Do not allocate their 5★ Gold Brick, Revenant fragments or blue papers until this policy is revisited."},
  {title:"Seox is excluded from Dark teams",detail:"This is a personal roster decision, not a power claim. Dark progression uses The Death and Nier alongside Lich, Sariel, Orologia, Magisa, Tsukuyomi, Tyra and Azusa."},
] as const;

export const eternalPlans:EternalPlan[]=[
  {name:"Anre",element:"Water",base:"Recruit for collection",final:"Deferred",transcendence:"Deferred under the male-Eternal rule",accountPlan:"Stop at base 4★."},
  {name:"Tweyen",element:"Light",base:"Recruit before beginning her selected project",final:"Complete when ready to transcend",transcendence:"Lv110 economical FA breakpoint; 130–150 only for a named debuff, hit-count or skill role",accountPlan:"Female project #4: target Lv110."},
  {name:"Threo",element:"Earth",base:"Ground Zero utility",final:"Required for her selected transcendence",transcendence:"Lv130 offensive breakpoint; Lv150 only for sustained long-fight use",accountPlan:"Female project #2: target Lv130."},
  {name:"Feower",element:"Water",base:"Recruit for collection",final:"Deferred",transcendence:"Deferred under the male-Eternal rule",accountPlan:"Stop at base 4★."},
  {name:"Fif",element:"Light",base:"Healing and revival",final:"Complete before the first female transcendence",transcendence:"Lv130 for serious HL; Lv150 when Light solo/HL stability justifies it",accountPlan:"Female project #1: target Lv130, then 150 conditionally."},
  {name:"Seox",element:"Dark",base:"Recruit for collection only",final:"Deferred",transcendence:"Excluded by preference",accountPlan:"Stop at base 4★ and do not build Dark teams around him."},
  {name:"Seofon",element:"Wind",base:"Recruit for collection",final:"Deferred",transcendence:"Deferred even though Lv150 has valuable V2 utility",accountPlan:"Stop at base 4★."},
  {name:"Eahta",element:"Earth",base:"Recruit for collection",final:"Deferred",transcendence:"Deferred even though dedicated Earth CA teams value him",accountPlan:"Stop at base 4★."},
  {name:"Niyon",element:"Wind",base:"Recruit and retain at base until selected",final:"Lv100 is the holding point",transcendence:"Commit directly toward Lv150 for cap support, normal amplification and dispel immunity",accountPlan:"Female project #5: stay Lv100 unless the full Lv150 role is needed."},
  {name:"Tien",element:"Fire",base:"Drop-rate passive works immediately",final:"Complete before her selected transcendence",transcendence:"Lv120 unlocks Treasure Hunt 10; 130–150 only as an active Fire frontline",accountPlan:"Female project #3: target Lv120."},
];

export const eternalOrder=[
  "Finish the active Haaselia/Evoker material project before opening a major Eternal sink.",
  "Fif to Lv130; continue to Lv150 only for repeated Light solo or high-difficulty use.",
  "Threo to Lv130; reserve Lv150 for sustained Earth use.",
  "Tien to Lv120 for Treasure Hunt 10; stop while modern Fire attackers cover combat.",
  "Tweyen to Lv110; continue only for a demonstrated Light mechanic.",
  "Keep Niyon at Lv100 unless committing directly toward her meaningful Lv150 package.",
  "Keep Anre, Feower, Seox, Seofon and Eahta at base 4★.",
] as const;

export const eternalSources:Record<string,EternalSource>={
  comparison:{label:"Eternal transcendence priority and breakpoints",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%B2%E3%83%BC%E3%83%A0%E7%9F%A5%E8%AD%98/%E5%8D%81%E5%A4%A9%E8%A1%86%E3%81%AE%E9%99%90%E7%95%8C%E8%B6%85%E8%B6%8A.html",scope:"Current investment stars and useful level stops for all ten Eternals."},
  recruitment:{label:"Eternal recruitment, final and transcendence overview",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%B2%E3%83%BC%E3%83%A0%E7%9F%A5%E8%AD%98/%E5%8D%81%E5%A4%A9%E8%A1%86.html",scope:"Current recruitment and final-uncap context; account policy intentionally overrides aggregate male priorities."},
  gamewith:{label:"Eternal recruitment and transcendence priorities",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/22885",scope:"Secondary comparison for role and breakpoint context."},
};
