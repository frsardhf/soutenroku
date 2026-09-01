export type ArcarumSource = {label:string;publisher:string;url:string;scope:string};

export const ARCARUM_REVIEWED_ON="1 Sep 2026";

export const arcarumSummons=[
  {element:"Fire",summon:"The Sun",evoker:"Alanaan",state:"Build to 4★",note:"The summon is broadly valuable; the Evoker is a later manual/short-burst investment for this account."},
  {element:"Water",summon:"The Moon",evoker:"Haaselia",state:"Recruited",note:"Completed damage-summon route and the first Evoker selected for concentrated 5★ investment."},
  {element:"Earth",summon:"The Hanged Man",evoker:"Caim",state:"Recruited",note:"Completed route. Base Caim already supplies the high-value Highlander backline passive."},
  {element:"Wind",summon:"Judgement",evoker:"Katzelia",state:"Build to 4★",note:"Katzelia becomes an attractive recruit when Wind can reliably maintain an ally debuff."},
  {element:"Light",summon:"The Star",evoker:"Geisenborger",state:"Build to 4★",note:"The summon is the immediate damage objective. Base Geisenborger is defensive rather than an automatic damage upgrade."},
  {element:"Dark",summon:"Death",evoker:"Nier",state:"Build to 4★",note:"The summon is broadly useful; recruit Nier when Dark burst or her survival utility has a real preset."},
] as const;

export const arcarumDecisionGates=[
  {trigger:"Full Auto coverage is the priority",action:"Recruit Estarriola",reason:"His automatic kit and chain-burst backline buffs fit low-intervention play even though Temperance is not one of the six damage summons."},
  {trigger:"Light survival is blocking clears",action:"Recruit Geisenborger",reason:"At base he caps Dark damage received at 10,000 per hit. Treat his offensive cap stacking as a later level-95 upgrade."},
  {trigger:"Wind has a reliable self-debuff setup",action:"Recruit Katzelia",reason:"His base reverse-position passive supplies 30% perpetuity ATK while Wind allies are debuffed."},
  {trigger:"Dark burst becomes a saved, repeated farm",action:"Recruit Nier",reason:"Death and Nier become a deliberate burst/survival package instead of a checklist recruit."},
  {trigger:"Earth high difficulty or Solomnas is next",action:"Return to Caim 5★ / fourth skill",reason:"Base Caim already covers general backline value; spend the additional Evolite and sands when his frontline and transcendence route will be used."},
  {trigger:"Fire short manual burst becomes important",action:"Recruit and later uncap Alanaan",reason:"The Sun should be completed early, but Alanaan's premium value is less aligned with the current unattended preference."},
] as const;

export const baseBacklineSummary=[
  {name:"Caim",value:"20% perpetuity ATK, 50% DEF and 10% damage cap with ten different grid weapons.",rating:"Core now"},
  {name:"Haaselia",value:"Per-turn unique ATK and DEF, reaching 20% ATK and 40% DEF at turn 10.",rating:"Core now"},
  {name:"Katzelia",value:"30% perpetuity ATK while Wind allies are debuffed; healing while they are not.",rating:"Conditional offense"},
  {name:"Lobelia",value:"Earth allies stack skill-damage cap after casting skills, up to 30%.",rating:"Skill teams"},
  {name:"Estarriola",value:"A Wind chain burst grants one random offensive or defensive buff.",rating:"FA utility"},
  {name:"Geisenborger",value:"Caps Dark damage received by Light allies at 10,000 per hit.",rating:"Defense only at base"},
] as const;

export const arcarumSources:Record<string,ArcarumSource>={
  recruitment:{label:"Evoker recruitment priority",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/189651",scope:"Current pre-5★ acquisition roles and reverse-position value."},
  uncap:{label:"Evoker 5★ and fourth-skill priority",publisher:"Kamigame JP",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%A2%E3%83%BC%E3%82%AB%E3%83%AB%E3%83%A0%E3%81%AE%E8%BB%A2%E4%B8%96/%E5%8D%81%E8%B3%A2%E8%80%85%E3%81%AE%E6%9C%80%E7%B5%82%E4%B8%8A%E9%99%90%E8%A7%A3%E6%94%BE.html",scope:"Current Japanese comparison of 5★, fourth-skill, Full Auto, short-fight, and high-difficulty value."},
  mechanics:{label:"Arcarum summon progression",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/84200",scope:"Summon sub-aura progression and the six superior-element damage routes."},
  transcendence:{label:"Solomnas and Evoker transcendence",publisher:"GameWith JP",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/562526",scope:"2026 transcendence requirements and the long-term Wonder system."},
};
