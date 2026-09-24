export type EternalPlan = { name:string; element:string; base:string; final:string; transcendence:string; accountPlan:string };
export type EternalSource = {label:string;publisher:string;url:string;scope:string};
export type EternalMaterial = {name:string;amount:string;icon?:string;note?:string};
export type EternalMaterialGroup = {title:string;detail:string;items:EternalMaterial[]};
export type EternalMaterialStage = {level:string;title:string;detail:string;items:EternalMaterial[];subnote?:string};

export const ETERNALS_VERSION="v1.2";
export const ETERNALS_REVIEWED_ON="24 Sep 2026";

const wikiImage=(path:string)=>`https://gbf.wiki/images/${path}`;

export const eternalRules=[
  {title:"Female-only transcendence",detail:"Only Tweyen, Threo, Fif, Niyon and Tien receive Transcendence investment. Male 5★ uncaps are permitted solely for Tien's Lv140 gate; their blue-paper progression remains excluded."},
  {title:"Male Eternals do not transcend",detail:"Keep Anre, Feower, Seox, Seofon and Eahta at base 4★ until Tien is ready to cross Lv130. Final-uncap all five only to satisfy her Lv140 all-ten gate; do not spend blue papers on them."},
  {title:"Seox is excluded from Dark teams",detail:"This is a personal roster decision, not a power claim. Dark progression uses The Death and Nier alongside Lich, Sariel, Orologia, Magisa, Tsukuyomi, Tyra and Azusa."},
] as const;

export const eternalPlans:EternalPlan[]=[
  {name:"Anre",element:"Water",base:"Recruit for collection",final:"Required only for Tien's Lv140 gate",transcendence:"Deferred under the male-Eternal rule",accountPlan:"Hold at 4★, then 5★ for Tien 140."},
  {name:"Tweyen",element:"Light",base:"Recruit before beginning her selected project",final:"Complete when ready to transcend",transcendence:"Lv110 economical FA breakpoint; 130–150 only for a named debuff, hit-count or skill role",accountPlan:"Female project #4: target Lv110."},
  {name:"Threo",element:"Earth",base:"Ground Zero utility",final:"Required for her selected transcendence",transcendence:"Lv130 offensive breakpoint; Lv150 only for sustained long-fight use",accountPlan:"Female project #2: target Lv130."},
  {name:"Feower",element:"Water",base:"Recruit for collection",final:"Required only for Tien's Lv140 gate",transcendence:"Deferred under the male-Eternal rule",accountPlan:"Hold at 4★, then 5★ for Tien 140."},
  {name:"Fif",element:"Light",base:"Healing and revival",final:"Complete before the first female transcendence",transcendence:"Lv130 for serious HL; Lv150 when Light solo/HL stability justifies it",accountPlan:"Female project #1: target Lv130, then 150 conditionally."},
  {name:"Seox",element:"Dark",base:"Recruit for collection only",final:"Required only for Tien's Lv140 gate",transcendence:"Excluded by preference",accountPlan:"5★ for the gate only; never build Dark teams around him."},
  {name:"Seofon",element:"Wind",base:"Recruit for collection",final:"Required only for Tien's Lv140 gate",transcendence:"Deferred even though Lv150 has valuable V2 utility",accountPlan:"Hold at 4★, then 5★ for Tien 140."},
  {name:"Eahta",element:"Earth",base:"Recruit for collection",final:"Required only for Tien's Lv140 gate",transcendence:"Deferred even though dedicated Earth CA teams value him",accountPlan:"Hold at 4★, then 5★ for Tien 140."},
  {name:"Niyon",element:"Wind",base:"Recruit and retain at base until selected",final:"Lv100 is the holding point",transcendence:"Commit directly toward Lv150 for cap support, normal amplification and dispel immunity",accountPlan:"Female project #5: stay Lv100 unless the full Lv150 role is needed."},
  {name:"Tien",element:"Fire",base:"Drop-rate passive works immediately",final:"Complete before her selected transcendence",transcendence:"Lv120 unlocks Treasure Hunt 10; Lv130 is the staging stop before the all-ten 5★ gate",accountPlan:"Female project #3: target Lv150."},
];

export const eternalOrder=[
  "Finish the active Haaselia/Evoker material project before opening a major Eternal sink.",
  "Fif to Lv130; continue to Lv150 only for repeated Light solo or high-difficulty use.",
  "Threo to Lv130; reserve Lv150 for sustained Earth use.",
  "Tien to Lv130 first; this is the last stop that does not require all ten Eternals at 5★.",
  "When ready for Tien Lv140, final-uncap Anre, Feower, Seox, Seofon and Eahta for the gate only.",
  "Finish Tien at Lv150 after the all-ten gate is clear.",
  "Tweyen to Lv110; continue only for a demonstrated Light mechanic.",
  "Keep Niyon at Lv100 unless committing directly toward her meaningful Lv150 package.",
] as const;

export const eternalMaterialAssumption="Totals start with all ten Eternals already recruited at 4★, retain each original fully awakened Revenant weapon for the first 50 fragments, and use ten element-changed weapons for the other 50 fragments. Tien Lv140 additionally forces all ten Eternals to 5★.";

export const eternalMaterialSummary=[
  {name:"Gold Brick",amount:"11",icon:wikiImage("7/7a/Item_evolution_s_20004.jpg")},
  {name:"Lapis Merit",amount:"2",icon:wikiImage("a/a0/Item_article_s_6511.jpg")},
  {name:"Rusted Weapon",amount:"760",icon:wikiImage("c/ce/Weapon_b_1030502500.png"),note:"640 across all ten 5★ projects, plus 120 Rusted Guns for Tien Lv110."},
  {name:"Flawed Prism",amount:"47,500",icon:wikiImage("1/1e/Flawed_Prism.jpg")},
  {name:"Low Orb",amount:"47,500",icon:wikiImage("8/8a/Fire_Orb.jpg"),note:"22,500 fixed by element and 25,000 determined by the element choices for Revenant weapons."},
  {name:"Whorl",amount:"52,500",icon:wikiImage("d/d2/Infernal_Whorl.jpg"),note:"Includes the separate Radiant Whorl awakening requirement."},
  {name:"Weapon Stone",amount:"5,000",icon:wikiImage("0/08/Pistol_Stone.jpg"),note:"3,000 across all weapon types, plus 2,000 Pistol Stones for Tien Lv140."},
  {name:"Quartz",amount:"20,000",icon:wikiImage("1/1d/Fire_Quartz.jpg"),note:"3,000 of every element, plus 2,000 Fire Quartz for Tien Lv140."},
] satisfies EternalMaterial[];

export const eternalFiveStarMaterialGroups:EternalMaterialGroup[]=[
  {
    title:"All-ten weapon route",
    detail:"The compact overlays use ×10 where the same amount applies to every Eternal or weapon type.",
    items:[
      {name:"Gold Brick",amount:"10",icon:wikiImage("7/7a/Item_evolution_s_20004.jpg")},
      {name:"Silver Relic copies",amount:"4×10",icon:wikiImage("d/de/Weapon_b_1040506500.png")},
      {name:"Silver Relic Shards",amount:"40×10",icon:wikiImage("9/97/Item_article_s_5501.jpg")},
      {name:"Revenant Weapon copies",amount:"40×10",icon:wikiImage("b/b9/Weapon_b_1040500800.png")},
      {name:"Rusted Weapons",amount:"64×10",icon:wikiImage("c/ce/Weapon_b_1030502500.png")},
      {name:"Revenant Weapon Fragments",amount:"100×10",icon:wikiImage("3/39/Item_article_s_5701.jpg")},
      {name:"Weapon Stones",amount:"300×10",icon:wikiImage("0/08/Pistol_Stone.jpg")},
      {name:"Class Distinctions",amount:"30×10",icon:wikiImage("f/f7/Bandit_Distinction.jpg")},
    ],
  },
  {
    title:"All-ten shared materials",
    detail:"Fixed totals for completing every 5★ Eternal with the economy weapon route.",
    items:[
      {name:"Silver Centrum",amount:"100",icon:wikiImage("b/b4/Silver_Centrum.jpg")},
      {name:"Damascus Crystal",amount:"100",icon:wikiImage("e/e5/Item_article_s_203.jpg")},
      {name:"Legendary Merit",amount:"50",icon:wikiImage("5/5a/Legendary_Merit.jpg")},
      {name:"Shining Orb",amount:"5,000",icon:wikiImage("3/33/Shining_Orb.jpg")},
      {name:"Skylight Scroll",amount:"5,000",icon:wikiImage("5/5b/Skylight_Scroll.jpg")},
      {name:"Radiant Whorl",amount:"5,000",icon:wikiImage("0/05/Radiant_Whorl.jpg")},
      {name:"White Dragon Scale",amount:"5,000",icon:wikiImage("b/b5/White_Dragon_Scale.jpg")},
      {name:"Champion Merit",amount:"5,000",icon:wikiImage("c/c0/Item_article_s_2001.jpg")},
      {name:"Crystal",amount:"10,000",icon:wikiImage("e/ed/Crystal.jpg")},
      {name:"Flawed Prism",amount:"40,000",icon:wikiImage("1/1e/Flawed_Prism.jpg")},
      {name:"Rainbow Prism",amount:"1,000",icon:wikiImage("9/91/Rainbow_Prism.jpg")},
    ],
  },
  {
    title:"Element-change pools",
    detail:"Each element needs the fixed amount shown; add the separate 25,000 flex pool according to the elements used for the 100 element-changed Revenant weapons.",
    items:[
      {name:"Fire Orb",amount:"2,500",icon:wikiImage("8/8a/Fire_Orb.jpg")},
      {name:"Water Orb",amount:"2,500",icon:wikiImage("1/14/Water_Orb.jpg")},
      {name:"Earth Orb",amount:"2,500",icon:wikiImage("2/2b/Earth_Orb.jpg")},
      {name:"Wind Orb",amount:"2,500",icon:wikiImage("a/a4/Wind_Orb.jpg")},
      {name:"Light Orb",amount:"2,500",icon:wikiImage("f/fe/Light_Orb.jpg")},
      {name:"Dark Orb",amount:"2,500",icon:wikiImage("9/92/Dark_Orb.jpg")},
      {name:"Low Orb flex pool",amount:"25,000",icon:wikiImage("8/8a/Fire_Orb.jpg")},
      {name:"Infernal Whorl",amount:"2,500",icon:wikiImage("d/d2/Infernal_Whorl.jpg")},
      {name:"Tidal Whorl",amount:"2,500",icon:wikiImage("7/7d/Tidal_Whorl.jpg")},
      {name:"Seismic Whorl",amount:"2,500",icon:wikiImage("1/19/Seismic_Whorl.jpg")},
      {name:"Tempest Whorl",amount:"2,500",icon:wikiImage("6/63/Tempest_Whorl.jpg")},
      {name:"Radiant Whorl",amount:"2,500",icon:wikiImage("0/05/Radiant_Whorl.jpg")},
      {name:"Umbral Whorl",amount:"2,500",icon:wikiImage("9/94/Umbral_Whorl.jpg")},
      {name:"Whorl flex pool",amount:"25,000",icon:wikiImage("d/d2/Infernal_Whorl.jpg")},
      {name:"True Anima flex pool",amount:"300",icon:wikiImage("4/46/True_Fire_Anima.jpg")},
    ],
  },
  {
    title:"Final-uncap element materials",
    detail:"Exact aggregate of the ten character uncaps after the weapon souls are ready.",
    items:[
      {name:"Fire Quartz",amount:"3,000",icon:wikiImage("1/1d/Fire_Quartz.jpg")},
      {name:"Water Quartz",amount:"3,000",icon:wikiImage("4/47/Water_Quartz.jpg")},
      {name:"Earth Quartz",amount:"3,000",icon:wikiImage("4/4a/Earth_Quartz.jpg")},
      {name:"Wind Quartz",amount:"3,000",icon:wikiImage("5/5d/Wind_Quartz.jpg")},
      {name:"Light Quartz",amount:"3,000",icon:wikiImage("1/16/Light_Quartz.jpg")},
      {name:"Dark Quartz",amount:"3,000",icon:wikiImage("e/ee/Dark_Quartz.jpg")},
      {name:"Rubeus Centrum",amount:"30",icon:wikiImage("4/48/Rubeus_Centrum.jpg")},
      {name:"Indicus Centrum",amount:"60",icon:wikiImage("7/74/Indicus_Centrum.jpg")},
      {name:"Luteus Centrum",amount:"60",icon:wikiImage("8/80/Luteus_Centrum.jpg")},
      {name:"Galbinus Centrum",amount:"60",icon:wikiImage("5/55/Galbinus_Centrum.jpg")},
      {name:"Niveus Centrum",amount:"60",icon:wikiImage("e/e3/Niveus_Centrum.jpg")},
      {name:"Ater Centrum",amount:"30",icon:wikiImage("a/af/Ater_Centrum.jpg")},
      {name:"Fire Urn",amount:"10",icon:wikiImage("9/98/Item_article_s_111.jpg")},
      {name:"Water Urn",amount:"20",icon:wikiImage("b/ba/Item_article_s_112.jpg")},
      {name:"Earth Urn",amount:"20",icon:wikiImage("9/95/Item_article_s_113.jpg")},
      {name:"Wind Urn",amount:"20",icon:wikiImage("0/08/Item_article_s_114.jpg")},
      {name:"Light Urn",amount:"20",icon:wikiImage("3/3b/Item_article_s_115.jpg")},
      {name:"Dark Urn",amount:"10",icon:wikiImage("5/5a/Dark_Urn_square.jpg")},
      {name:"Bright Spirits",amount:"10",icon:wikiImage("f/f3/Item_article_s_80.jpg")},
      {name:"Murky Spirits",amount:"10",icon:wikiImage("e/e1/Item_article_s_81.jpg")},
      {name:"Fire Grimoire",amount:"60",icon:wikiImage("7/70/Fire_Grimoire.jpg")},
      {name:"Water Grimoire",amount:"75",icon:wikiImage("6/6b/Water_Grimoire.jpg")},
      {name:"Earth Grimoire",amount:"75",icon:wikiImage("0/0d/Earth_Grimoire.jpg")},
      {name:"Wind Grimoire",amount:"90",icon:wikiImage("1/1d/Wind_Grimoire.jpg")},
    ],
  },
];

export const tienTranscendenceStages:EternalMaterialStage[]=[
  {
    level:"110",
    title:"Twinpain-Wolf Gun",
    detail:"These are additions after Tien is 5★. The Ruby Gun Relics expand into the raw gun materials noted below.",
    items:[
      {name:"Gold Brick",amount:"1",icon:wikiImage("7/7a/Item_evolution_s_20004.jpg")},
      {name:"Silver Gun Shard",amount:"200",icon:wikiImage("9/97/Item_article_s_5501.jpg")},
      {name:"Ruby Gun Relic",amount:"30",icon:wikiImage("9/94/Weapon_b_1030501900.png")},
      {name:"Smoldering Rubble",amount:"50",icon:wikiImage("6/6d/Item_article_s_549.jpg")},
      {name:"Fire Halo",amount:"80",icon:wikiImage("1/18/Item_article_s_5211.jpg")},
      {name:"Damascus Crystal",amount:"20",icon:wikiImage("e/e5/Item_article_s_203.jpg")},
    ],
    subnote:"Ruby relic raw cost: 120 Rusted Guns + 7,500 Fire Orbs + 7,500 Infernal Whorls + 7,500 Flawed Prisms.",
  },
  {
    level:"120",
    title:"Stage 2",
    detail:"Recruiting all ten is enough for this stage; their 5★ uncaps are not required yet.",
    items:[
      {name:"Shiva Omega Anima",amount:"50",icon:wikiImage("7/76/Item_article_s_511.jpg")},
      {name:"Fire Urn",amount:"300",icon:wikiImage("9/98/Item_article_s_111.jpg")},
      {name:"Ten-Star Fragment",amount:"50",icon:wikiImage("3/39/Item_article_s_5701.jpg")},
      {name:"Primeval Horn",amount:"100",icon:wikiImage("9/9a/Item_article_s_79.jpg")},
      {name:"Legendary Merit",amount:"100",icon:wikiImage("5/5a/Legendary_Merit.jpg")},
      {name:"Blue-Sky Spirit",amount:"1",icon:wikiImage("6/61/CP.jpg"),note:"The icon shows its 20,000 CP purchase cost."},
    ],
  },
  {level:"130",title:"Stage 3",detail:"The first blue-paper gate.",items:[{name:"Lapis Merit",amount:"1",icon:wikiImage("a/a0/Item_article_s_6511.jpg")}]},
  {
    level:"140",
    title:"Stage 4 — all ten must be 5★",
    detail:"This is the point that overrides the current male-Eternals-at-4★ policy if Tien 150 remains the goal.",
    items:[
      {name:"Huanglong Omega Anima",amount:"30",icon:wikiImage("7/7a/Item_article_s_529.jpg")},
      {name:"Ignis Luster",amount:"30",icon:wikiImage("1/10/Item_article_s_25070.jpg")},
      {name:"Pistol Stone",amount:"2,000",icon:wikiImage("0/08/Pistol_Stone.jpg")},
      {name:"Fire Quartz",amount:"2,000",icon:wikiImage("1/1d/Fire_Quartz.jpg")},
      {name:"Wilnas's Jewel",amount:"300",icon:wikiImage("0/03/Item_article_s_557.jpg")},
      {name:"True Dragon's Golden Scale",amount:"50",icon:wikiImage("1/1b/Item_article_s_547.jpg")},
    ],
  },
  {
    level:"150",
    title:"Glorious Eminence",
    detail:"The second blue paper is consumed with the three endgame-raid treasures.",
    items:[
      {name:"Tears of the Apocalypse",amount:"30",icon:wikiImage("5/5f/Item_article_s_538.jpg")},
      {name:"Abyssal Wing",amount:"30",icon:wikiImage("e/ef/Item_article_s_555.jpg")},
      {name:"Cunning Devil's Horn",amount:"30",icon:wikiImage("9/91/Item_article_s_570.jpg")},
      {name:"Lapis Merit",amount:"1",icon:wikiImage("a/a0/Item_article_s_6511.jpg")},
    ],
  },
];

export const eternalMaterialRupies={fiveStar:"1,000,000",tien:"10,100,000",total:"11,100,000"} as const;

export const eternalSources:Record<string,EternalSource>={
  comparison:{label:"Eternal transcendence priority and breakpoints",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%B2%E3%83%BC%E3%83%A0%E7%9F%A5%E8%AD%98/%E5%8D%81%E5%A4%A9%E8%A1%86%E3%81%AE%E9%99%90%E7%95%8C%E8%B6%85%E8%B6%8A.html",scope:"Current investment stars and useful level stops for all ten Eternals."},
  recruitment:{label:"Eternal recruitment, final and transcendence overview",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%B2%E3%83%BC%E3%83%A0%E7%9F%A5%E8%AD%98/%E5%8D%81%E5%A4%A9%E8%A1%86.html",scope:"Current recruitment and final-uncap context; account policy intentionally overrides aggregate male priorities."},
  gamewith:{label:"Eternal recruitment and transcendence priorities",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/22885",scope:"Secondary comparison for role and breakpoint context."},
  uncapMaterials:{label:"Uncapping Eternals",publisher:"Granblue Fantasy Wiki",url:"https://gbf.wiki/Uncapping_Eternals",scope:"Weapon-route, final-uncap and aggregate material requirements used by the inventory checklist."},
  transcendenceMaterials:{label:"Eternals Transcendence",publisher:"Granblue Fantasy Wiki",url:"https://gbf.wiki/Eternals_Transcendence",scope:"Tien stage conditions and Lv110–150 material requirements."},
};
