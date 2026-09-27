import {readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const trackerPath=path.join(root,"data","collection-sources","tracker.json");
const snapshotPath=path.join(root,"data","collection-sources","snapshot.json");
const CHARACTER_URL="https://raw.githubusercontent.com/cajunwildcat/The-GrandCypher/main/characters.json";
const SUMMON_URL="https://raw.githubusercontent.com/cajunwildcat/The-GrandCypher/main/summons.json";

function list(value){
  const values=Array.isArray(value)?value:value?[value]:[];
  return [...new Set(values.flatMap((entry)=>String(entry).split(",")).map((entry)=>entry.trim().toLowerCase()).filter(Boolean))];
}
function text(value){return typeof value==="string"?value.trim():""}
function integer(value,fallback){const parsed=Number.parseInt(String(value),10);return Number.isInteger(parsed)?parsed:fallback}
function wikiPath(name){return `/${name.trim().replaceAll(" ","_").replaceAll("&","%26")}`}
function baseUncap(rarity,maxUncap){return rarity==="ssr"&&maxUncap>=4?4:Math.min(3,maxUncap)}

function character(id,raw){
  const rarity=text(raw.rarity).toLowerCase();
  const maxUncap=integer(raw.maxUncap,rarity==="ssr"?4:3);
  const releaseDate=text(raw.releaseDate);
  const name=text(raw.pageName)||text(raw.name)||id;
  return {baseUncap:baseUncap(rarity,maxUncap),bonus:[],element:text(raw.element).toLowerCase()||"any",gender:text(raw.gender).toLowerCase(),id,jpName:text(raw.jpname),kind:"character",maxUncap,name,obtain:list(raw.obtain),race:list(raw.race),rarity,releaseDate,released:releaseDate.slice(0,4),series:list(raw.series),specialty:list(raw.weapon),style:text(raw.type).toLowerCase(),wikiPath:wikiPath(name)};
}

function summon(id,raw){
  const rarity=text(raw.rarity).toLowerCase();
  const maxUncap=integer(raw.maxUncap,3);
  const name=text(raw.pageName)||text(raw.name)||id;
  return {baseUncap:baseUncap(rarity,maxUncap),bonus:[],element:text(raw.element).toLowerCase()||"any",gender:"",id,jpName:text(raw.jpname),kind:"summon",maxUncap,name,obtain:[],race:[],rarity,releaseDate:"",released:"",series:list(raw.series),specialty:[],style:"",wikiPath:wikiPath(name)};
}

async function fetchJson(url){
  const response=await fetch(url,{headers:{"User-Agent":"Soutenroku collection updater (+https://soutenroku.pages.dev)",Accept:"application/json"}});
  if(!response.ok)throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

const [current,characters,summons]=await Promise.all([
  readFile(trackerPath,"utf8").then(JSON.parse),
  fetchJson(CHARACTER_URL),
  fetchJson(SUMMON_URL),
]);
const validRarities=new Set(["r","sr","ssr"]);
const characterEntries=Object.entries(characters);
const summonEntries=Object.entries(summons);
if(characterEntries.length<900||summonEntries.length<350)throw new Error(`Discovery mirror coverage is unexpectedly low (${characterEntries.length} characters, ${summonEntries.length} summons)`);
const knownUpstreamIds=new Set([...characterEntries,...summonEntries].map(([id])=>id));
const upstream=[
  ...characterEntries.filter(([,raw])=>integer(raw.styleId,1)===1&&validRarities.has(text(raw.rarity).toLowerCase())).map(([id,raw])=>character(id,raw)),
  ...summonEntries.filter(([,raw])=>validRarities.has(text(raw.rarity).toLowerCase())).map(([id,raw])=>summon(id,raw)),
];
const eligibleIds=new Set(upstream.map((item)=>item.id));
const removed=current.filter((item)=>knownUpstreamIds.has(item.id)&&!eligibleIds.has(item.id)).map((item)=>`${item.kind}:${item.id}:${item.name}`);
const byId=new Map(current.filter((item)=>!knownUpstreamIds.has(item.id)||eligibleIds.has(item.id)).map((item)=>[item.id,item]));
const added=[];
const updated=[];

for(const candidate of upstream){
  const existing=byId.get(candidate.id);
  if(!existing){byId.set(candidate.id,candidate);added.push(`${candidate.kind}:${candidate.id}:${candidate.name}`);continue}
  const next={...existing,maxUncap:candidate.maxUncap};
  if(!existing.releaseDate&&candidate.releaseDate)Object.assign(next,{releaseDate:candidate.releaseDate,released:candidate.released});
  if(JSON.stringify(next)!==JSON.stringify(existing)){byId.set(candidate.id,next);updated.push(`${candidate.kind}:${candidate.id}:${candidate.name}`)}
}

if(!added.length&&!updated.length&&!removed.length){console.log(`Collection roster unchanged (${current.length} entries).`);process.exit(0)}

const items=[...byId.values()];
await Promise.all([
  writeFile(trackerPath,`${JSON.stringify(items)}\n`),
  writeFile(snapshotPath,`${JSON.stringify({capturedAt:new Date().toISOString(),discoverySource:"The-GrandCypher"})}\n`),
]);
console.log(`Collection roster updated: ${added.length} added, ${updated.length} metadata changes, ${removed.length} unsupported removed, ${items.length} total.`);
for(const entry of added)console.log(`+ ${entry}`);
for(const entry of updated)console.log(`~ ${entry}`);
for(const entry of removed)console.log(`- ${entry}`);
