import {readFile,writeFile,mkdir} from "node:fs/promises";
import path from "node:path";

const [trackerPath,gamewithPath,kamigamePath,outputPath="public/data/gbf-collection.json"] = process.argv.slice(2);
if(!trackerPath||!gamewithPath||!kamigamePath){
  throw new Error("Usage: node scripts/build-collection-catalog.mjs TRACKER_JSON GAMEWITH_JSON KAMIGAME_JSON [OUTPUT_JSON]");
}

const [tracker,gamewith,kamigame]=await Promise.all([
  readFile(trackerPath,"utf8").then(JSON.parse),
  readFile(gamewithPath,"utf8").then(JSON.parse),
  readFile(kamigamePath,"utf8").then(JSON.parse),
]);

const trackerIds=new Set(tracker.map((item)=>item.id));
if(trackerIds.size!==tracker.length)throw new Error("Collection source contains duplicate IDs");
for(const [label,ratings] of [["Gamewith",gamewith],["Kamigame",kamigame]]){
  const missing=Object.keys(ratings).filter((id)=>!trackerIds.has(id));
  if(missing.length)console.warn(`${label}: ${missing.length} rating rows do not match the collection snapshot`);
}

const EFFECT_RULES={
  dispel:/\bdispel\b|remov(?:e|es|ing) (?:\d+ )?buff/i,
  delay:/\bdelay\b|charge diamond/i,
  clear:/\bclear\b|remov(?:e|es|ing) (?:\d+ )?debuff/i,
  veil:/\bveil\b|debuff immunity|debuffs? (?:will be )?nullified/i,
  "dispel-cancel":/dispel cancel|buffs? can(?:not|'t) be removed/i,
  healing:/\bheal(?:s|ing|er)?\b|restore(?:s|d)? (?:allies' )?hp|drain|revitalize/i,
  "charge-support":/charge bar|uplifted/i,
  "ca-support":/charge attack|\bc\.a\./i,
  echo:/bonus (?:\w+ )?dmg|bonus damage|echo/i,
  supplemental:/supplement(?:al|ed) (?:dmg|damage)/i,
  "cap-up":/(?:dmg|damage) cap|damage amplified|dmg amplified/i,
  multiattack:/multiattack|triple attack|double attack|guaranteed (?:da|ta)/i,
  substitute:/\bsubstitute\b|receives? .* attacks? in place of/i,
  mitigation:/mitigation|damage cut|dmg cut|armored|shield|caps? .* damage taken|\bdef up\b/i,
  dodge:/\bdodg(?:e|es|ing)\b/i,
  "auto-activation":/end of turn|upon normal attack|when (?:a )?foe uses a special attack|activates automatically/i,
  backline:/backline|back row|sub-ally/i,
  debuffs:/def down|atk down|debuff|singed|thunderstruck|glaciate|toxicosis/i,
  burst:/one-turn|one turn|short-term|racing|burst|instantly perform/i,
  "full-auto":/full auto/i,
  "high-difficulty":/high difficulty|high-level/i,
};

function tier(raw){
  if(!raw)return undefined;
  const rating=Number.parseFloat(raw.rating);
  const sanitizeToken=(token)=>{
    if(!token||!['text','term'].includes(token.kind)||typeof token.text!=="string"||!token.text.trim())return null;
    const icon=typeof token.icon==="string"&&token.icon.startsWith("https://gbf.wiki/images/")?token.icon:undefined;
    const href=typeof token.href==="string"&&token.href.startsWith("https://gbf.wiki/")?token.href:undefined;
    return {kind:token.kind,text:token.text,...(icon?{icon}:{}),...(href?{href}:{})};
  };
  const sanitizeReason=(reason)=>{
    if(!reason||!Array.isArray(reason.tokens))return null;
    const tokens=reason.tokens.map(sanitizeToken).filter(Boolean);
    if(!tokens.length)return null;
    const children=Array.isArray(reason.children)?reason.children.map(sanitizeReason).filter(Boolean):[];
    return {tokens,...(children.length?{children}:{})};
  };
  const summaryRich=Array.isArray(raw.summaryRich)?raw.summaryRich.map(sanitizeReason).filter(Boolean).slice(0,8):[];
  return {
    ...(Number.isFinite(rating)?{rating}:{}),
    ...(raw.grinding?{grinding:raw.grinding}:{}),
    ...(raw.fullAuto?{fullAuto:raw.fullAuto}:{}),
    ...(raw.highDifficulty?{highDifficulty:raw.highDifficulty}:{}),
    summary:Array.isArray(raw.summary)?raw.summary.filter((item)=>typeof item==="string"&&item.trim()).slice(0,8):[],
    ...(summaryRich.length?{summaryRich}:{}),
  };
}

const items=tracker.map((item)=>{
  const gw=tier(gamewith[item.id]);
  const kg=tier(kamigame[item.id]);
  const searchable=[...(gw?.summary??[]),...(kg?.summary??[])].join(" ");
  const effects=Object.entries(EFFECT_RULES).filter(([,pattern])=>pattern.test(searchable)).map(([key])=>key);
  if(gw?.fullAuto==="SS"||kg?.fullAuto==="SS")effects.push("full-auto");
  if(gw?.highDifficulty==="SS"||kg?.highDifficulty==="SS")effects.push("high-difficulty");
  return {...item,effects:[...new Set(effects)],ratings:{...(gw?{gamewith:gw}:{}),...(kg?{kamigame:kg}:{})}};
});

const output={
  schemaVersion:1,
  snapshotAt:new Date().toISOString(),
  sources:{
    collection:"https://gbf.wiki/Collection_Tracker",
    gamewithRatings:"https://gbf.wiki/Character_Tier_List/Gamewith/Ratings",
    gamewithGrades:"https://gbf.wiki/Character_Tier_List/Gamewith/Grades",
    kamigameRatings:"https://gbf.wiki/Character_Tier_List/Kamigame/Ratings",
    kamigameGrades:"https://gbf.wiki/Character_Tier_List/Kamigame/Grades",
  },
  items,
};

await mkdir(path.dirname(outputPath),{recursive:true});
await writeFile(outputPath,`${JSON.stringify(output)}\n`);
console.log(`Wrote ${items.length} collection entries to ${outputPath}`);
