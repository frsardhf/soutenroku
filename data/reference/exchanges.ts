export type ExchangeTag = "MONTHLY"|"TARGET"|"IF BLOCKED"|"SKIP";
export type ExchangeItem = {id:string;name:string;cost:string;tag:ExchangeTag;note:string};
export type ExchangeTab = {id:string;name:string;subtitle:string;items:ExchangeItem[]};

export const exchangeTabs:ExchangeTab[]=[
{id:"monthly",name:"Monthly",subtitle:"Reset checklist",items:[
{id:"moons",name:"Gold, Silver & Bronze Moons",cost:"1,120 Renown / month",tag:"MONTHLY",note:"Buy all three. These are the only universal Renown purchases and the Gold Moon remains especially scarce."},
{id:"enigmatic-armilla",name:"Enigmatic Armilla ×3",cost:"3,000 Prestige / month",tag:"MONTHLY",note:"The 2026 first priority. Artifact reroll supply is limited, so take all three before rings, weapons, or farmable materials."},
{id:"sublimity-ring",name:"Sublimity Ring ×1",cost:"1,500 Prestige / month",tag:"MONTHLY",note:"Buy after the Armillas when the monthly Prestige budget allows it."},
{id:"daily-points-guidance",name:"Daily Points",cost:"No automatic purchase",tag:"TARGET",note:"Spend only on missing copies in the account queue. There is no generic monthly item that must be cleared."}
]},
{id:"pendants",name:"Pendants",subtitle:"Renown + Prestige",items:[
{id:"eternity-sand",name:"Eternity Sand",cost:"20,000 Renown · lifetime 1",tag:"IF BLOCKED",note:"Take it when a concrete summon, Opus, or transcendence step needs it; do not displace the monthly Moons."},
{id:"class-distinctions",name:"Class Distinctions",cost:"80 Renown or 20 Prestige",tag:"IF BLOCKED",note:"Buy only the exact Chaos Ruler, Warlock, or Manadiver deficit. Prefer Renown or Daily Points so Prestige remains available for Armillas."},
{id:"astaroth-anima",name:"Otherworldly Darkblade / Astaroth Anima",cost:"300 Prestige each",tag:"IF BLOCKED",note:"A valid time saver for the current CCW path, but only purchase the precise amount needed for the next upgrade."},
{id:"farmable-weapons",name:"Tyros / Ancestral / Malice / Menace weapons",cost:"4,000–5,000 Prestige",tag:"SKIP",note:"Use Daily Points instead: the same copies cost only 150 or 300 there, while Prestige has exclusive Armillas."},
{id:"orbs-earrings",name:"Awakening Orbs & Earrings",cost:"500–1,500 Prestige",tag:"IF BLOCKED",note:"After Armillas and the Sublimity Ring, buy only for a named character or weapon project."}
]},
{id:"daily-points",name:"Daily Points",subtitle:"6,510 points",items:[
{id:"galleon-jaw",name:"Galleon's Jaw",cost:"300 each · 1,200 from zero",tag:"TARGET",note:"Complete one 4★ copy for the Earth Kengo / charge-attack alternative. Stop at one unless a tested second grid slot appears."},
{id:"fediel-spine",name:"Fediel's Spine",cost:"300 each · 1,200 from zero",tag:"TARGET",note:"Complete one 4★ copy for Dark Kengo and charge-attack setups. It is a specialist option, not a universal Dark M3 slot."},
{id:"tyros-zither",name:"Tyros Zither",cost:"150 each · 600 from zero",tag:"TARGET",note:"Complete one 4★ transitional copy for Water Kengo. Buy it here, never for 4,000 Prestige Pendants."},
{id:"ewiyar-beak",name:"Ewiyar's Beak",cost:"300 each · 1,200 from zero",tag:"TARGET",note:"Complete one 4★ copy for the saved Wind M3 grid. Keep the best raid-dropped AX copy as the base."},
{id:"agonize",name:"Agonize",cost:"300 each · 1,200 from zero",tag:"IF BLOCKED",note:"Complete one 4★ for Lich's skill team while M3 is incomplete. Do not automatically build two because Celeste Saber Ater competes for the slot."},
{id:"uncap-materials",name:"Anima, Jewels & Six-Dragon treasures",cost:"70–200 each",tag:"SKIP",note:"Never buy in bulk. Copies are efficient; uncap materials are not. One Ancestral 4★ would consume 4,500 points in Jewel and unique-treasure costs alone."}
]},
{id:"events",name:"Events",subtitle:"Badges + drawboxes",items:[
{id:"sunlight-stone",name:"Sunlight Stone pack",cost:"275 Valor Badges",tag:"TARGET",note:"Default Valor purchase because Sunlight Stones remain broadly scarce and useful for Arcarum and premium summons."},
{id:"evolite",name:"Evolite",cost:"500 Valor Badges",tag:"IF BLOCKED",note:"Buy when it directly unlocks Caim, Estarriola, Nier, or another selected Evoker—not simply to hold an extra copy."},
{id:"revenant-weapons",name:"Revenant Weapons",cost:"Victory / Bravery Certificates",tag:"TARGET",note:"Use certificates for required relics and Five-Star Fragments. The chosen element matters only when completing the element-change step."},
{id:"drawboxes-1-60",name:"U&F drawboxes 1–60",cost:"New World Quartz",tag:"TARGET",note:"Default to Quartz. Take Crystallized Cores only until the first useful 4★ Altruism-Soul Staff is complete; skip Revenant Weapons and Damascus Pinches."},
{id:"drawboxes-61-plus",name:"U&F drawboxes 61+",cost:"Forced Revenant Weapon",tag:"TARGET",note:"Accept the forced weapon and use those copies for any later fragment requirement."}
]},
{id:"skill-levels",name:"Skill Levels",subtitle:"SL1 → SL25",items:[]}
];
export function exchangeItemId(sectionId:string,itemId:string){
  return `exchange:${sectionId}:${itemId}`;
}
