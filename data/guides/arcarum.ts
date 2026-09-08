export type ArcarumSource = {label:string;publisher:string;url:string;scope:string};

export const ARCARUM_VERSION="v1.1";
export const ARCARUM_REVIEWED_ON="8 Sep 2026";

export const femaleEvokerOrder=[
  {name:"Haaselia",summon:"The Moon",element:"Water",target:"First 5★ project",reason:"Default Water backline and a premier frontline engine after correct-position entry."},
  {name:"Fraux",summon:"The Devil",element:"Fire",target:"Second 5★ project",reason:"Full Auto healing, debuff extension, dispel and long-fight stability."},
  {name:"Nier",summon:"Death",element:"Dark",target:"Third 5★ project",reason:"Controlled Death entry, burst, Full Auto and the account's non-Seox Dark direction."},
  {name:"Maria Theresa",summon:"Justice",element:"Water",target:"Fourth 5★ project",reason:"Specialized dispel-heavy Water backline and high-difficulty option; consider Transcendence after 5★."},
] as const;

export const arcarumSummons=[
  {element:"Fire",summon:"The Sun",evoker:"Alanaan",state:"Build to 4★",note:"Complete the damage sub-aura; Alanaan is not part of the active female recruitment queue."},
  {element:"Water",summon:"The Moon",evoker:"Haaselia",state:"Recruited",note:"First concentrated 5★ Evoker project and a permanent Water damage summon."},
  {element:"Earth",summon:"The Hanged Man",evoker:"Caim",state:"Recruited",note:"Completed route. Existing recruitment does not change the active female-only sequence."},
  {element:"Wind",summon:"Judgement",evoker:"Katzelia",state:"Build to 4★",note:"Complete the damage sub-aura; defer male Evoker investment while the female queue is active."},
  {element:"Light",summon:"The Star",evoker:"Geisenborger",state:"Build to 4★",note:"The summon is the damage objective; its associated male Evoker is not an active recruitment target."},
  {element:"Dark",summon:"Death",evoker:"Nier",state:"Build to 4★",note:"Complete the summon and use it with Nier as the third female 5★ project."},
] as const;

export const arcarumDecisionGates=[
  {trigger:"Haaselia materials are still active",action:"Do not split the 5★ grind",reason:"Recruit another woman only when Evolite and recruitment materials are genuinely spare; do not delay Haaselia's active 5★ route."},
  {trigger:"Haaselia 5★ is secured",action:"Move major materials to Fraux",reason:"Fraux is the second female project for Fire Full Auto, healing, dispels and debuff extension."},
  {trigger:"Fraux 5★ is secured",action:"Move major materials to Nier",reason:"Nier and Death support Dark burst, Full Auto and the account's anti-Seox direction."},
  {trigger:"Nier 5★ is secured",action:"Move major materials to Maria Theresa",reason:"Maria is a specialized Water dispel/high-difficulty backliner rather than the default partner beside Haaselia."},
] as const;

export const evokerMaterialTotals=[
  {material:"Corresponding Veritas",amount:"~720",note:"Usually the first visible gate."},
  {material:"Corresponding Astra",amount:"~550",note:"Farm alongside Ideas and boxes; do not shortcut with New World Quartz."},
  {material:"Corresponding Ideas",amount:"~440",note:"Often becomes the longer Sandbox grind after Veritas."},
  {material:"Corresponding Brights",amount:"~250",note:"Route-specific Sandbox material."},
  {material:"Vellum Documents",amount:"~1,060",note:"Accumulates across the wider route."},
  {material:"New World Quartz",amount:"~90",note:"Protect this stock from inefficient Astra shortcuts."},
  {material:"Time Sands",amount:"3",note:"Needed for the Foundation weapon 5★ route."},
] as const;

export const arcarumTranscendenceNotes=[
  "Maria Theresa received the first Evoker Transcendence release on 21 July 2026, initially to Lv110.",
  "The announced October 2026 batch is Nier, Estarriola and Fraux.",
  "Maria's older low 5★ priority does not describe her newer dispel-focused Transcendence value.",
  "Do not assume dates for the remaining Evokers until Cygames announces them.",
] as const;

export const baseBacklineSummary=[
  {name:"Haaselia",value:"Per-turn unique ATK and DEF, reaching 20% ATK and 40% DEF at turn 10.",rating:"Water default"},
  {name:"Maria Theresa",value:"Specialized Water support triggered by party dispels; strongest in dispel-heavy teams.",rating:"Water specialist"},
  {name:"Caim",value:"20% perpetuity ATK, 50% DEF and 10% damage cap with ten different grid weapons.",rating:"Already recruited"},
  {name:"Fraux",value:"Her major account value is the developed frontline package rather than a universal base backline slot.",rating:"Fire project"},
  {name:"Nier",value:"Death/correct-position entry enables her intended Dark burst, survival and Full Auto roles.",rating:"Dark project"},
] as const;

export const arcarumSources:Record<string,ArcarumSource>={
  recruitment:{label:"Evoker recruitment priority",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/189651",scope:"Current acquisition roles and reverse-position value."},
  uncap:{label:"Evoker 5★ and fourth-skill priority",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%A2%E3%83%BC%E3%82%AB%E3%83%AB%E3%83%A0%E3%81%AE%E8%BB%A2%E4%B8%96/%E5%8D%81%E8%B3%A2%E8%80%85%E3%81%AE%E6%9C%80%E7%B5%82%E4%B8%8A%E9%99%90%E8%A7%A3%E6%94%BE.html",scope:"Current 5★, fourth-skill, Full Auto, short-fight and high-difficulty comparison."},
  mechanics:{label:"Arcarum summon progression",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/84200",scope:"Summon sub-aura progression and the six superior-element damage routes."},
  transcendence:{label:"Solomnas and Evoker transcendence",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/562526",scope:"2026 Transcendence requirements and long-term progression."},
  announcement:{label:"2026 Summer Stream announcements",publisher:"Famitsu",url:"https://www.famitsu.com/article/202608/84013?page=1",scope:"October 2026 Evoker Transcendence batch announcement."},
};
