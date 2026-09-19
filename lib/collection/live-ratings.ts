import type {CollectionCatalog,Grade,RatingSource} from "@/lib/collection/types";

export const LIVE_RATINGS_BROWSER_CACHE="soutenroku-reference-v1";
export const LIVE_RATINGS_BROWSER_MAX_AGE_MS=7*24*60*60*1000;

export interface LiveRating {
  rating:number;
  grinding:Grade;
  fullAuto:Grade;
  highDifficulty:Grade;
}

export interface LiveRatingSource {
  url:string;
  total:number;
  matched:number;
  unmatched:string[];
  ratings:Record<string,LiveRating>;
}

export interface LiveRatingsResponse {
  schemaVersion:1;
  fetchedAt:string;
  cacheTtlSeconds:number;
  sources:Partial<Record<RatingSource,LiveRatingSource>>;
}

const grades=new Set<Grade>(["SS","S","A","B","C","D",""]);

function isLiveRating(value:unknown):value is LiveRating {
  if(!value||typeof value!=="object")return false;
  const item=value as Partial<LiveRating>;
  return typeof item.rating==="number"&&Number.isFinite(item.rating)&&item.rating>=0&&item.rating<=10&&grades.has(item.grinding??"")&&grades.has(item.fullAuto??"")&&grades.has(item.highDifficulty??"");
}

export function isLiveRatingsResponse(value:unknown):value is LiveRatingsResponse {
  if(!value||typeof value!=="object")return false;
  const response=value as Partial<LiveRatingsResponse>;
  if(response.schemaVersion!==1||typeof response.fetchedAt!=="string"||!Number.isFinite(Date.parse(response.fetchedAt))||typeof response.cacheTtlSeconds!=="number"||!response.sources||typeof response.sources!=="object")return false;
  return (["gamewith","kamigame"] as RatingSource[]).every((source)=>{
    const entry=response.sources?.[source];
    if(!entry)return true;
    return typeof entry.url==="string"&&typeof entry.total==="number"&&typeof entry.matched==="number"&&Array.isArray(entry.unmatched)&&entry.unmatched.every((name)=>typeof name==="string")&&entry.ratings!==null&&typeof entry.ratings==="object"&&Object.values(entry.ratings).every(isLiveRating);
  });
}

export function mergeLiveRatings(base:CollectionCatalog,live:LiveRatingsResponse){
  let changed=0;
  const items=base.items.map((item)=>{
    if(item.kind!=="character")return item;
    let ratings=item.ratings;
    for(const source of ["gamewith","kamigame"] as RatingSource[]){
      const next=live.sources[source]?.ratings[item.id];
      if(!next)continue;
      const previous=ratings[source];
      if(previous?.rating!==next.rating||previous?.grinding!==next.grinding||previous?.fullAuto!==next.fullAuto||previous?.highDifficulty!==next.highDifficulty)changed+=1;
      ratings={...ratings,[source]:{...previous,...next,summary:previous?.summary??[]}};
    }
    return ratings===item.ratings?item:{...item,ratings};
  });
  return {catalog:{...base,items},changed};
}
