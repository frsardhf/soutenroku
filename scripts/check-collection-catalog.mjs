import {readFile} from "node:fs/promises";

const catalog=JSON.parse(await readFile("public/data/gbf-collection.json","utf8"));
const fail=(message)=>{throw new Error(`Collection catalog: ${message}`)};
if(catalog.schemaVersion!==1||!Array.isArray(catalog.items))fail("unsupported schema");
if(!catalog.snapshotAt||Number.isNaN(Date.parse(catalog.snapshotAt)))fail("invalid snapshot date");
const ids=new Set();
let characters=0,summons=0,gamewith=0,kamigame=0;
for(const item of catalog.items){
  if(!/^\d{10}$/.test(item.id)||ids.has(item.id))fail(`invalid or duplicate ID ${item.id}`);
  ids.add(item.id);
  if(!item.name||!item.element||!item.rarity)fail(`missing required metadata for ${item.id}`);
  if(item.kind==="character")characters++;else if(item.kind==="summon")summons++;else fail(`invalid type for ${item.id}`);
  if(item.ratings?.gamewith?.rating)gamewith++;
  if(item.ratings?.kamigame?.rating)kamigame++;
}
if(characters<900||summons<350)fail(`unexpected coverage (${characters} characters, ${summons} summons)`);
if(gamewith<600||kamigame<600)fail(`unexpected rating coverage (${gamewith} Gamewith, ${kamigame} Kamigame)`);
console.log(`Collection catalog OK: ${characters} characters, ${summons} summons, ${gamewith} Gamewith ratings, ${kamigame} Kamigame ratings`);
