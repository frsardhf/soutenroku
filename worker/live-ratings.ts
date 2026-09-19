import type {Grade,RatingSource} from "../lib/collection/types";
import type {LiveRating,LiveRatingSource,LiveRatingsResponse} from "../lib/collection/live-ratings";

const GAMEWITH_URL="https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/20722";
const KAMIGAME_URL="https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC/index.html";
const VALID_GRADES=new Set<Grade>(["SS","S","A","B","C","D",""]);
const ELEMENTS:Record<string,string>={火:"fire",水:"water",土:"earth",風:"wind",光:"light",闇:"dark"};

interface SourceRow extends LiveRating {name:string;element?:string;tag?:string}
interface MatchItem {id:string;kind:"character";jpName:string;element:string;rarity:string;series:string[]}

const aliases:Record<string,string>={
  "カヲル&Mark.6":"3040625000","カリオストロ&クラリス":"3040593000",エヴァンジェリン:"3040575000",ネギ:"3040574000",ヴェルドラ:"3040559000",リムル:"3040558000",
  "オリヴィエ(ハガレン)":"3040657000",光ジーク:"3040485000","ユエル&ソシエ":"3040430000","アグロヴァル&トー":"3040426000","スカル&バルルガン":"3040396000",
  "銀時&新八&神楽":"3040363000","土方&沖田":"3040362000",水着シャレム:"3040351000",水着ジーク:"3040344000","ファラ&ユーリ":"3040325000",
  "炭治郎&禰豆子&善逸&伊之助":"3040308000","ミラオル&ザーリリャオー":"3040272000","水ヴァンピィ&ベス":"3040264000","シャレム(リミテッド)":"3040251000",
  火ジーク:"3040237000",カレン:"3040221000",スザク:"3040220000",ルルーシュ:"3040219000",レヴィオン姉妹:"3040193000","ランスロット&ヴェイン":"3040191000",
  プリキュア:"3040188000","ドロシー&クラウディア":"3040134000",ニーナ:"3040133000",
};

function decode(value:string){
  return value.replace(/<[^>]*>/g,"").replace(/&(?:amp|#38);/g,"&").replace(/&quot;|&#34;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(_,code)=>String.fromCodePoint(Number(code))).trim();
}

function normalize(value:string){return decode(value).normalize("NFKC").toLocaleLowerCase().replace(/[\s・･()（）[\]【】]/g,"")}

function grade(value:string):Grade {
  const normalized=decode(value).toUpperCase() as Grade;
  return VALID_GRADES.has(normalized)?normalized:"";
}

function rating(value:string){const parsed=Number.parseFloat(value);return Number.isFinite(parsed)?parsed:NaN}

export function parseGamewith(html:string):SourceRow[]{
  const start=html.indexOf('<ol id="GBFCharactorList">');
  const end=start>=0?html.indexOf("</ol>",start):-1;
  if(start<0||end<0)throw new Error("Gamewith character list was not found");
  const rows:SourceRow[]=[];
  const block=html.slice(start,end);
  for(const match of block.matchAll(/<li\b[\s\S]*?<\/li>/g)){
    const row=match[0];
    const element=row.match(/data-attr=['"]([^'"]+)['"]/)?.[1]??"";
    const nameBlock=row.match(/<div class=['"][^'"]*_n[^'"]*['"]([^>]*)>([\s\S]*?)<\/div>/);
    const detail=row.match(/<div class=['"]_d['"]\s+data-s1=['"]([^'"]*)['"]\s+data-s2=['"]([^'"]*)['"]\s+data-s3=['"]([^'"]*)['"]/);
    const scoreBlock=row.match(/<div class=['"]_p['"]>([^<]+)<\/div>/);
    if(!nameBlock||!detail||!scoreBlock)continue;
    const score=rating(scoreBlock[1]);
    if(!Number.isFinite(score))continue;
    const tag=nameBlock[1].match(/\brel=['"]([^'"]*)['"]/)?.[1]??"";
    rows.push({name:decode(nameBlock[2]),tag:decode(tag),element:ELEMENTS[decode(element)],rating:score,grinding:grade(detail[1]),fullAuto:grade(detail[2]),highDifficulty:grade(detail[3])});
  }
  if(rows.length<600)throw new Error(`Gamewith parser returned only ${rows.length} rows`);
  return rows;
}

export function parseKamigame(html:string):SourceRow[]{
  const filter=html.indexOf('class="filter-table-filter"');
  const filterEnd=filter>=0?html.indexOf(">",filter):-1;
  const start=filter>=0?html.indexOf('<table class="filter-table',filter):-1;
  const end=start>=0?html.indexOf("</table>",start):-1;
  if(start<0||end<0)throw new Error("Kamigame ratings table was not found");
  const encodedRows=filterEnd>=0?html.slice(filter,filterEnd+1).match(/data-rows="([\s\S]*?)"/)?.[1]:undefined;
  let metadata:unknown[][]=[];
  if(encodedRows){
    try{metadata=JSON.parse(decode(encodedRows)) as unknown[][]}catch{metadata=[]}
  }
  const rows:SourceRow[]=[];
  const block=html.slice(start,end);
  const rowPattern=/<tr>[\s\S]*?<td>[\s\S]*?<a\s+href="[^"]+">([^<]+)<\/a>[\s\S]*?<span class="score">([^<]+)<\/span>\/10[\s\S]*?<span class="(?:SS|S|A|B|C|D)">([^<]+)<\/span>\s*\/\s*<span class="(?:SS|S|A|B|C|D)">([^<]+)<\/span>\s*\/\s*<span class="(?:SS|S|A|B|C|D)">([^<]+)<\/span>[\s\S]*?<\/tr>/g;
  let index=0;
  for(const match of block.matchAll(rowPattern)){
    const score=rating(match[2]);
    if(!Number.isFinite(score))continue;
    const meta=metadata[index++];
    const element=Array.isArray(meta?.[1])?ELEMENTS[String(meta[1][0])]:undefined;
    const tag=Array.isArray(meta?.[3])?meta[3].map(String).join(" "):"";
    rows.push({name:decode(match[1]),element,tag,rating:score,grinding:grade(match[3]),highDifficulty:grade(match[4]),fullAuto:grade(match[5])});
  }
  if(rows.length<600)throw new Error(`Kamigame parser returned only ${rows.length} rows`);
  return rows;
}

function expectedSeries(name:string,tag=""){
  const source=`${name} ${tag}`;
  if(/水着/.test(source))return "summer";
  if(/浴衣/.test(source))return "yukata";
  if(/ハロウィン/.test(source))return "halloween";
  if(/クリスマス/.test(source))return "holiday";
  if(/バレンタイン/.test(source))return "valentine";
  if(/ドレス/.test(source))return "formal";
  if(/リミテッド|グランデ|レジェ/.test(source))return "grand";
  if(/十二神将/.test(source))return "12generals";
  if(/十天衆/.test(source))return "eternals";
  if(/十賢者/.test(source))return "evokers";
  if(/四聖/.test(source))return "4saints";
  if(/コラボ/.test(source))return "collab";
  return "";
}

function matchRow(row:SourceRow,items:MatchItem[]){
  const direct=aliases[row.name];
  if(direct&&items.some((item)=>item.id===direct))return direct;
  const name=normalize(row.name);
  let candidates=items.filter((item)=>item.kind==="character"&&item.rarity==="ssr"&&(!row.element||item.element===row.element)&&name.includes(normalize(item.jpName)));
  if(!candidates.length)return null;
  const longest=Math.max(...candidates.map((item)=>normalize(item.jpName).length));
  candidates=candidates.filter((item)=>normalize(item.jpName).length===longest);
  const series=expectedSeries(row.name,row.tag);
  if(series)candidates=candidates.filter((item)=>item.series.includes(series));
  else {
    const limited=new Set(["summer","yukata","halloween","holiday","valentine","formal","grand"]);
    const ordinary=candidates.filter((item)=>!item.series.some((entry)=>limited.has(entry)));
    if(ordinary.length)candidates=ordinary;
  }
  return candidates.length===1?candidates[0].id:null;
}

function mapRows(source:RatingSource,url:string,rows:SourceRow[],items:MatchItem[]):LiveRatingSource {
  const ratings:Record<string,LiveRating>={};
  const unmatched:string[]=[];
  for(const row of rows){
    const id=matchRow(row,items);
    if(!id||ratings[id]){unmatched.push(row.name);continue}
    ratings[id]={rating:row.rating,grinding:row.grinding,fullAuto:row.fullAuto,highDifficulty:row.highDifficulty};
  }
  const matched=Object.keys(ratings).length;
  if(matched<550)throw new Error(`${source} matched only ${matched} catalog entries`);
  return {url,total:rows.length,matched,unmatched:unmatched.slice(0,100),ratings};
}

async function fetchSource(url:string){
  const response=await fetch(url,{headers:{"User-Agent":"Soutenroku ratings updater (+https://soutenroku.pages.dev)",Accept:"text/html,application/xhtml+xml"}});
  if(!response.ok)throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

export async function fetchLiveRatings(items:MatchItem[]):Promise<LiveRatingsResponse>{
  const settled=await Promise.allSettled([fetchSource(GAMEWITH_URL).then(parseGamewith),fetchSource(KAMIGAME_URL).then(parseKamigame)]);
  const sources:LiveRatingsResponse["sources"]={};
  if(settled[0].status==="fulfilled")sources.gamewith=mapRows("gamewith",GAMEWITH_URL,settled[0].value,items);
  if(settled[1].status==="fulfilled")sources.kamigame=mapRows("kamigame",KAMIGAME_URL,settled[1].value,items);
  if(!sources.gamewith&&!sources.kamigame)throw new Error("Both rating sources failed");
  return {schemaVersion:1,fetchedAt:new Date().toISOString(),cacheTtlSeconds:86400,sources};
}
