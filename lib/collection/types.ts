export type CollectionKind="character"|"summon";
export type RatingSource="gamewith"|"kamigame";
export type Grade="SS"|"S"|"A"|"B"|"C"|"D"|"";

export interface RatingSummaryToken {
  kind:"text"|"term";
  text:string;
  icon?:string;
  href?:string;
}

export interface RatingSummaryItem {
  tokens:RatingSummaryToken[];
  children?:RatingSummaryItem[];
}

export interface TierRating {
  rating?:number;
  grinding?:Grade;
  fullAuto?:Grade;
  highDifficulty?:Grade;
  summary:string[];
  summaryRich?:RatingSummaryItem[];
}

export interface CollectionCatalogItem {
  id:string;
  kind:CollectionKind;
  name:string;
  jpName:string;
  element:string;
  rarity:string;
  obtain:string[];
  series:string[];
  bonus:string[];
  race:string[];
  specialty:string[];
  gender:string;
  style:string;
  baseUncap:number;
  maxUncap:number;
  released:string;
  releaseDate:string;
  wikiPath:string;
  effects:string[];
  ratings:Partial<Record<RatingSource,TierRating>>;
}

export interface CollectionCatalog {
  schemaVersion:1;
  snapshotAt:string;
  sources:Record<string,string>;
  items:CollectionCatalogItem[];
}

export const effectLabels:Record<string,string>={
  dispel:"Dispel",delay:"Delay",clear:"Clear",veil:"Veil","dispel-cancel":"Dispel Cancel",healing:"Healing","charge-support":"Charge bar","ca-support":"CA support",echo:"Echo / Bonus DMG",supplemental:"Supplemental DMG","cap-up":"Cap / Amplification",multiattack:"Multiattack",substitute:"Substitute",mitigation:"Mitigation / Shield",dodge:"Dodge","auto-activation":"Auto activation",backline:"Backline passive",debuffs:"Debuffs",burst:"Burst / OTK","full-auto":"Full Auto","high-difficulty":"High difficulty",
};
