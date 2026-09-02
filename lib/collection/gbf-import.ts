import type {CollectionCatalog,CollectionKind} from "./types";
import type {CollectionEntry} from "@/lib/progress";

type ImportedCollection=Record<"characters"|"summons",Record<string,CollectionEntry>>;

export interface GbfCollectionImport {
  collection:ImportedCollection;
  matched:number;
  received:number;
  unknownIds:string[];
  page:{current:number;last:number;count:number}|null;
}

export type GbfCollectionParseResult=
  |{ok:true;value:GbfCollectionImport}
  |{ok:false;error:string};

function isRecord(value:unknown):value is Record<string,unknown>{
  return typeof value==="object"&&value!==null&&!Array.isArray(value);
}

function finiteInteger(value:unknown){
  const number=typeof value==="number"?value:typeof value==="string"&&value.trim()?Number(value):Number.NaN;
  return Number.isInteger(number)&&number>=0?number:null;
}

function inventoryId(entry:Record<string,unknown>){
  const master=isRecord(entry.master)?entry.master:{};
  const param=isRecord(entry.param)?entry.param:{};
  if(typeof master.id==="string"&&master.id)return master.id;
  if(typeof master.id==="number"&&Number.isInteger(master.id))return String(master.id);
  for(const candidate of [param.image_id,param.image_id_2]){
    if(typeof candidate!=="string")continue;
    const match=candidate.match(/^(\d{10})/);
    if(match)return match[1];
  }
  return null;
}

function collectionKey(kind:CollectionKind){return kind==="character"?"characters" as const:"summons" as const}

export function parseGbfCollectionResponse(raw:string,catalog:CollectionCatalog):GbfCollectionParseResult{
  if(raw.length>5_000_000)return {ok:false,error:"The pasted response is larger than 5 MB."};
  let decoded:unknown;
  try{decoded=JSON.parse(raw)}catch{return {ok:false,error:"Paste the request's Copy response value. It must be valid JSON."}}
  if(!isRecord(decoded))return {ok:false,error:"This JSON is not a GBF inventory response."};
  const payload=isRecord(decoded.result)?decoded.result:decoded;
  if(!Array.isArray(payload.list))return {ok:false,error:"No inventory list was found. Copy the response from a character or summon list request."};

  const byId=new Map(catalog.items.map((item)=>[item.id,item]));
  const collection:ImportedCollection={characters:{},summons:{}};
  const unknownIds:string[]=[];
  let received=0;
  for(const rawEntry of payload.list){
    if(!isRecord(rawEntry))continue;
    received+=1;
    const id=inventoryId(rawEntry);
    if(!id){unknownIds.push("Unknown entry");continue}
    const item=byId.get(id);
    if(!item){unknownIds.push(id);continue}
    const param=isRecord(rawEntry.param)?rawEntry.param:{};
    const evolution=finiteInteger(param.evolution)??0;
    const key=collectionKey(item.kind);
    const prior=collection[key][id];
    collection[key][id]={owned:true,uncap:Math.max(prior?.uncap??0,Math.min(evolution,item.maxUncap))};
  }

  const current=finiteInteger(payload.current);
  const last=finiteInteger(payload.last);
  const count=finiteInteger(payload.count);
  const page=current!==null&&last!==null&&count!==null?{current,last,count}:null;
  const matched=Object.keys(collection.characters).length+Object.keys(collection.summons).length;
  return {ok:true,value:{collection,matched,received,unknownIds:[...new Set(unknownIds)],page}};
}
