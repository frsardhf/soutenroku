"use client";
/* eslint-disable @next/next/no-img-element */

import {useDeferredValue,useEffect,useMemo,useState} from "react";
import {Check,ChevronDown,ChevronUp,ExternalLink,Filter,LoaderCircle,RotateCcw,Search,X} from "lucide-react";
import {useAccount} from "@/components/progress/account-provider";
import {Button} from "@/components/ui/button";
import {effectLabels,type CollectionCatalog,type CollectionCatalogItem,type Grade,type RatingSource} from "@/lib/collection/types";

type ViewMode="collection"|"ratings"|"grades";
type OwnedFilter="all"|"owned"|"missing";
type GradeField="grinding"|"fullAuto"|"highDifficulty";

const elements=["fire","water","earth","wind","light","dark","any"];
const gradeOrder:Record<string,number>={SS:6,S:5,A:4,B:3,C:2,D:1,"":0};
const elementNames:Record<string,string>={fire:"Fire",water:"Water",earth:"Earth",wind:"Wind",light:"Light",dark:"Dark",any:"Any"};
const seriesPriority=["summer","yukata","valentine","halloween","holiday","grand","12generals","eternals","evokers","formal","fantasy","4saints","13buddhas","providence","genesis","archangel","six dragons","optimus","omega","arcarum","acies","bellum","robur","dynamis","crest","odious","epic","carbuncle","upgrader","cryptid","collab"];
const obtainPriority=["swimsuit","valentine","halloween","holiday","formal","grand","flash","gala","zodiac","premium","classic","classic2","classic3","event","side_story","arcarum","rotb","unf","academy","main_quest","collab","promotion","fate","casino","christmas","normal"];
const effectPriority=["full-auto","auto-activation","dispel","delay","clear","veil","healing","mitigation","debuffs","cap-up","supplemental","echo","multiattack","charge-support","ca-support","high-difficulty","dodge","substitute","backline","burst"];
const racePriority=["human","primal","erune","draph","harvin","other","levleath","wolvir","geonoid","grokkle"];
const specialtyPriority=["staff","sabre","katana","melee","spear","axe","dagger","gun","harp","bow"];
const stylePriority=["attack","special","balanced","heal","defense"];
const releasedPriority=Array.from({length:13},(_,index)=>String(2026-index));
const summonSeriesIcons=new Set(["acies","arcarum","archangel","bellum","carbuncle","crest","cryptid","demi optimus","dynamis","epic","genesis","odious","omega","optimus","providence","robur","six dragons","upgrader"]);

function orderOptions(options:string[],priority:string[]){return [...new Set([...priority.filter((entry)=>options.includes(entry)),...options])]}

function PillGroup({label,value,options,onChange,className=""}:{label:string;value:string;options:{value:string;label:string;icon?:string}[];onChange:(value:string)=>void;className?:string}){
  return <div className={`quick-filter-group ${className}`}><span>{label}</span><div role="group" aria-label={label}>{options.map((option)=><button type="button" className={`filter-pill ${value===option.value?"is-active":""}`} aria-pressed={value===option.value} onClick={()=>onChange(option.value)} key={option.value}>{option.icon&&<img className="filter-pill-icon" src={option.icon} alt=""/>}{option.label}</button>)}</div></div>;
}

function ExpandablePills({label,values,options,priority,expanded,onExpanded,onToggle,iconFor}:{label:string;values:string[];options:string[];priority:string[];expanded:boolean;onExpanded:()=>void;onToggle:(value:string)=>void;iconFor?:(value:string)=>string}){
  const ordered=[...new Set([...values,...priority.filter((entry)=>options.includes(entry)),...options])];
  const visible=expanded?ordered:ordered.slice(0,6);
  const remaining=Math.max(0,ordered.length-visible.length);
  return <div className={`quick-filter-group is-expandable ${expanded?"is-expanded":""}`}><span>{label}</span><div role="group" aria-label={label}>{visible.map((option)=><button type="button" className={`filter-pill ${values.includes(option)?"is-active":""}`} aria-pressed={values.includes(option)} onClick={()=>onToggle(option)} key={option}>{iconFor&&<img className="filter-pill-icon" src={iconFor(option)} alt=""/>}{label==="Effects"?(effectLabels[option]??pretty(option)):pretty(option)}</button>)}{(remaining>0||expanded)&&<button type="button" className="filter-pill is-more" aria-expanded={expanded} onClick={onExpanded}>{expanded?<><ChevronUp aria-hidden="true"/>Less</>:<>+{remaining} more<ChevronDown aria-hidden="true"/></>}</button>}</div></div>;
}

function MultiPills({label,values,options,priority,onToggle,iconFor}:{label:string;values:string[];options:string[];priority:string[];onToggle:(value:string)=>void;iconFor?:(value:string)=>string}){
  return <div className="quick-filter-group is-expanded"><span>{label}</span><div role="group" aria-label={label}>{orderOptions(options,priority).map((option)=><button type="button" className={`filter-pill ${values.includes(option)?"is-active":""}`} aria-pressed={values.includes(option)} onClick={()=>onToggle(option)} key={option}>{iconFor&&<img className="filter-pill-icon" src={iconFor(option)} alt=""/>}{label==="Effects"?(effectLabels[option]??pretty(option)):pretty(option)}</button>)}</div></div>;
}

function imageUrl(item:CollectionCatalogItem){
  const file=item.kind==="character"?`Npc_m_${item.id}_01.jpg`:`Summon_m_${item.id}.jpg`;
  return `https://gbf.wiki/Special:Redirect/file/${file}`;
}

const friendlyLabels:Record<string,string>={"12generals":"12 Generals","13buddhas":"13 Buddhas","4saints":"4 Saints",classic2:"Classic II",classic3:"Classic III",rotb:"Rise of the Beasts",unf:"Unite and Fight",swimsuit:"Summer / Swimsuit",zodiac:"Zodiac"};
function pretty(value:string){return friendlyLabels[value]??value.replaceAll("_"," ").replace(/\b\w/g,(letter)=>letter.toUpperCase())}

function RatingBadge({rating}:{rating?:number}){
  return <span className="collection-rating">{rating?.toFixed(rating%1===0?0:1)??"—"}</span>;
}

function GradeBadge({value,label}:{value?:Grade;label?:string}){
  return <span className={`collection-grade grade-${(value||"none").toLowerCase()}`}>{label&&<small>{label}</small>}{value||"—"}</span>;
}

function HoverSummary({item,source}:{item:CollectionCatalogItem;source:RatingSource}){
  const rating=item.ratings[source];
  if(item.kind!=="character")return <div className={`collection-hover-summary element-${item.element}`}><header><div><strong>{item.name}</strong><span>{pretty(item.rarity)} summon · {elementNames[item.element]??pretty(item.element)}</span></div></header><section className="hover-summary-section"><span>Released</span><p>{item.releaseDate||item.released||"Unknown"}</p></section></div>;
  const role=rating?.summary.find((line)=>line.toLocaleLowerCase().startsWith("role:"));
  const points=rating?.summary.filter((line)=>line!==role).slice(0,4)??[];
  return <div className={`collection-hover-summary element-${item.element}`} role="tooltip">
    <header><div><strong>{item.name}</strong><span>{source==="gamewith"?"Gamewith":"Kamigame"} summary</span></div><RatingBadge rating={rating?.rating}/></header>
    <div className="hover-grade-row"><GradeBadge label="Grinding" value={rating?.grinding}/><GradeBadge label="Full Auto" value={rating?.fullAuto}/><GradeBadge label="High difficulty" value={rating?.highDifficulty}/></div>
    {role&&<section className="hover-summary-section"><span>Role</span><p>{role.replace(/^role:\s*/i,"")}</p></section>}
    {points.length?<section className="hover-summary-points"><span>Key points</span><ul>{points.map((line)=><li key={line}>{line}</li>)}</ul></section>:<p className="hover-summary-empty">No source summary is currently listed.</p>}
  </div>;
}

function Portrait({item,source,compact=false}:{item:CollectionCatalogItem;source:RatingSource;compact?:boolean}){
  const {account,setCollectionEntry}=useAccount();
  const key=item.kind==="character"?"characters":"summons";
  const stored=account.collection[key][item.id];
  const owned=stored?.owned===true;
  const uncap=stored?.uncap??0;
  function toggle(){setCollectionEntry(key,item.id,{...stored,owned:!owned,uncap})}
  function cycleUncap(event:React.MouseEvent){event.stopPropagation();const next=uncap>=item.maxUncap?0:uncap+1;setCollectionEntry(key,item.id,{...stored,owned:next>0||owned,uncap:next})}
  return <article className={`collection-portrait ${compact?"is-compact":""} ${owned?"is-owned":""}`}>
    <button className="collection-image-button" type="button" aria-pressed={owned} aria-label={`${owned?"Remove":"Add"} ${item.name} ${owned?"from":"to"} collection`} onClick={toggle}>
      <img src={imageUrl(item)} alt="" loading="lazy"/><span className="owned-mark"><Check aria-hidden="true"/></span>
      {item.kind==="character"&&<RatingBadge rating={item.ratings[source]?.rating}/>} 
    </button>
    {!compact&&<div className="collection-card-meta"><strong title={item.name}>{item.name}</strong><span>{elementNames[item.element]??pretty(item.element)} · {item.rarity.toUpperCase()}</span><button type="button" onClick={cycleUncap} aria-label={`Set ${item.name} uncap; currently ${uncap} stars`}>{uncap}★<ChevronDown aria-hidden="true"/></button></div>}
    <HoverSummary item={item} source={source}/>
  </article>;
}

function CollectionGrid({items,source,limit,onMore}:{items:CollectionCatalogItem[];source:RatingSource;limit:number;onMore:()=>void}){
  const shown=items.slice(0,limit);
  return <><div className="collection-card-grid">{shown.map((item)=><Portrait key={item.id} item={item} source={source}/>)}</div>{shown.length<items.length&&<div className="collection-load-more"><Button variant="outline" onClick={onMore}>Show 120 more</Button><span>{shown.length} of {items.length}</span></div>}</>;
}

function ratingBand(item:CollectionCatalogItem,source:RatingSource){
  const rating=item.ratings[source]?.rating;
  if(rating===10)return "10";if(rating!==undefined&&rating>=9.5)return "9.9–9.5";if(rating!==undefined&&rating>=9)return "9.4–9.0";if(rating!==undefined&&rating>=8.5)return "8.9–8.5";if(rating!==undefined&&rating>=8)return "8.4–8.0";return "Below 8 / unrated";
}

function RatingsGrid({items,source,element}:{items:CollectionCatalogItem[];source:RatingSource;element:string}){
  const bands=["10","9.9–9.5","9.4–9.0","8.9–8.5","8.4–8.0","Below 8 / unrated"];
  const columns=element==="all"?elements:elements.filter((entry)=>entry===element);
  const gridStyle={gridTemplateColumns:`84px repeat(${columns.length}, minmax(108px, 1fr))`};
  return <div className="ratings-mirror"><div className="ratings-mirror-head" style={gridStyle}><span>Rating</span>{columns.map((entry)=><strong key={entry}>{elementNames[entry]}</strong>)}</div>{bands.map((band)=><div className="ratings-mirror-row" style={gridStyle} key={band}><strong>{band}</strong>{columns.map((column)=><div className="ratings-element-cell" key={column}>{items.filter((item)=>item.element===column&&ratingBand(item,source)===band).map((item)=><Portrait compact key={item.id} item={item} source={source}/>)}</div>)}</div>)}</div>;
}

function GradesList({items,source,limit,onMore}:{items:CollectionCatalogItem[];source:RatingSource;limit:number;onMore:()=>void}){
  const shown=items.slice(0,limit);
  return <><div className="grades-list"><div className="grades-list-head"><span>Character</span><span>Rating</span><span>Grinding</span><span>Full Auto</span><span>High difficulty</span></div>{shown.map((item)=><article key={item.id}><div className="grade-character"><Portrait compact item={item} source={source}/><strong>{item.name}</strong></div><RatingBadge rating={item.ratings[source]?.rating}/><GradeBadge value={item.ratings[source]?.grinding}/><GradeBadge value={item.ratings[source]?.fullAuto}/><GradeBadge value={item.ratings[source]?.highDifficulty}/></article>)}</div>{shown.length<items.length&&<div className="collection-load-more"><Button variant="outline" onClick={onMore}>Show 120 more</Button><span>{shown.length} of {items.length}</span></div>}</>;
}

export function CollectionPage(){
  const {account,hydrated}=useAccount();
  const [catalog,setCatalog]=useState<CollectionCatalog|null>(null);
  const [loadError,setLoadError]=useState(false);
  const [kind,setKind]=useState<"character"|"summon">("character");
  const [view,setView]=useState<ViewMode>("collection");
  const [source,setSource]=useState<RatingSource>("gamewith");
  const [search,setSearch]=useState("");
  const deferredSearch=useDeferredValue(search.trim().toLocaleLowerCase());
  const [element,setElement]=useState("all");
  const [rarity,setRarity]=useState("all");
  const [owned,setOwned]=useState<OwnedFilter>("all");
  const [obtain,setObtain]=useState<string[]>([]);
  const [series,setSeries]=useState<string[]>([]);
  const [effect,setEffect]=useState<string[]>([]);
  const [race,setRace]=useState<string[]>([]);
  const [specialty,setSpecialty]=useState<string[]>([]);
  const [style,setStyle]=useState<string[]>([]);
  const [released,setReleased]=useState<string[]>([]);
  const [effectMatch,setEffectMatch]=useState<"any"|"all">("any");
  const [obtainExpanded,setObtainExpanded]=useState(false);
  const [minimumRating,setMinimumRating]=useState("all");
  const [gradeField,setGradeField]=useState<GradeField>("fullAuto");
  const [minimumGrade,setMinimumGrade]=useState("all");
  const [sort,setSort]=useState("default");
  const [limit,setLimit]=useState(120);

  useEffect(()=>{const controller=new AbortController();fetch("/data/gbf-collection.json",{signal:controller.signal}).then((response)=>{if(!response.ok)throw new Error("catalog");return response.json()}).then((value:CollectionCatalog)=>{if(value.schemaVersion!==1||!Array.isArray(value.items))throw new Error("catalog");setCatalog(value)}).catch((error)=>{if(error.name!=="AbortError")setLoadError(true)});return()=>controller.abort()},[]);
  const options=useMemo(()=>{
    const base=catalog?.items.filter((item)=>item.kind===kind)??[];
    return {obtains:[...new Set(base.flatMap((item)=>item.obtain))].sort(),series:[...new Set(base.flatMap((item)=>item.series))].sort(),races:[...new Set(base.flatMap((item)=>item.race))].sort(),specialties:[...new Set(base.flatMap((item)=>item.specialty))].sort(),styles:[...new Set(base.map((item)=>item.style).filter(Boolean))].sort(),released:[...new Set(base.map((item)=>item.releaseDate.slice(0,4)).filter(Boolean))].sort()};
  },[catalog,kind]);

  const filtered=useMemo(()=>{
    if(!catalog)return [];
    const ownedMap=kind==="character"?account.collection.characters:account.collection.summons;
    const result=catalog.items.filter((item)=>{
      if(item.kind!==kind)return false;
      if(deferredSearch&&!`${item.name} ${item.jpName} ${item.id}`.toLocaleLowerCase().includes(deferredSearch))return false;
      if(element!=="all"&&item.element!==element)return false;
      if(rarity!=="all"&&item.rarity!==rarity)return false;
      if(owned==="owned"&&!ownedMap[item.id]?.owned)return false;
      if(owned==="missing"&&ownedMap[item.id]?.owned)return false;
      if(obtain.length&&!obtain.some((entry)=>item.obtain.includes(entry)))return false;
      if(series.length&&!series.some((entry)=>item.series.includes(entry)))return false;
      if(kind==="character"&&effect.length&&!(effectMatch==="all"?effect.every((entry)=>item.effects.includes(entry)):effect.some((entry)=>item.effects.includes(entry))))return false;
      if(kind==="character"&&race.length&&!race.some((entry)=>item.race.includes(entry)))return false;
      if(kind==="character"&&specialty.length&&!specialty.some((entry)=>item.specialty.includes(entry)))return false;
      if(kind==="character"&&style.length&&!style.includes(item.style))return false;
      if(released.length&&!released.includes(item.releaseDate.slice(0,4)))return false;
      const rating=item.ratings[source];
      if(view!=="collection"&&kind==="character"&&!rating?.rating)return false;
      if(kind==="character"&&minimumRating!=="all"&&(rating?.rating??0)<Number(minimumRating))return false;
      if(kind==="character"&&minimumGrade!=="all"&&gradeOrder[rating?.[gradeField]??""]<gradeOrder[minimumGrade])return false;
      return true;
    });
    return result.sort((a,b)=>{
      if(sort==="name")return a.name.localeCompare(b.name);
      if(sort==="newest")return b.releaseDate.localeCompare(a.releaseDate);
      if(sort==="rating")return (b.ratings[source]?.rating??0)-(a.ratings[source]?.rating??0)||a.name.localeCompare(b.name);
      return 0;
    });
  },[account.collection,catalog,deferredSearch,element,gradeField,kind,minimumGrade,minimumRating,obtain,owned,rarity,series,effect,effectMatch,race,specialty,style,released,sort,source,view]);

  const ownedCount=useMemo(()=>Object.values(kind==="character"?account.collection.characters:account.collection.summons).filter((entry)=>entry.owned).length,[account.collection,kind]);
  function resetFilters(){setSearch("");setElement("all");setRarity("all");setOwned("all");setObtain([]);setSeries([]);setEffect([]);setRace([]);setSpecialty([]);setStyle([]);setReleased([]);setEffectMatch("any");setMinimumRating("all");setMinimumGrade("all");setSort("default")}
  function changeKind(next:"character"|"summon"){setKind(next);if(next==="summon"&&view!=="collection")setView("collection")}
  function toggleList(setter:React.Dispatch<React.SetStateAction<string[]>>,value:string){setter((current)=>current.includes(value)?current.filter((entry)=>entry!==value):[...current,value])}
  const activeFilters=[
    ...(element!=="all"?[{key:"element",label:elementNames[element],clear:()=>setElement("all")}]:[]),
    ...(owned!=="all"?[{key:"owned",label:owned==="owned"?"Owned":"Missing",clear:()=>setOwned("all")}]:[]),
    ...(rarity!=="all"?[{key:"rarity",label:rarity.toUpperCase(),clear:()=>setRarity("all")}]:[]),
    ...obtain.map((value)=>({key:`obtain-${value}`,label:pretty(value),clear:()=>toggleList(setObtain,value)})),
    ...series.map((value)=>({key:`series-${value}`,label:pretty(value),clear:()=>toggleList(setSeries,value)})),
    ...(kind==="character"?effect.map((value)=>({key:`effect-${value}`,label:effectLabels[value]??pretty(value),clear:()=>toggleList(setEffect,value)})):[]),
    ...(kind==="character"?race.map((value)=>({key:`race-${value}`,label:pretty(value),clear:()=>toggleList(setRace,value)})):[]),
    ...(kind==="character"?specialty.map((value)=>({key:`specialty-${value}`,label:pretty(value),clear:()=>toggleList(setSpecialty,value)})):[]),
    ...(kind==="character"?style.map((value)=>({key:`style-${value}`,label:pretty(value),clear:()=>toggleList(setStyle,value)})):[]),
    ...released.map((value)=>({key:`released-${value}`,label:value,clear:()=>toggleList(setReleased,value)})),
    ...(kind==="character"&&minimumRating!=="all"?[{key:"rating",label:`Rating ${minimumRating}+`,clear:()=>setMinimumRating("all")}]:[]),
    ...(kind==="character"&&minimumGrade!=="all"?[{key:"grade",label:`${gradeField==="fullAuto"?"Full Auto":gradeField==="highDifficulty"?"High difficulty":"Grinding"} ${minimumGrade}+`,clear:()=>setMinimumGrade("all")}]:[]),
  ];

  return <div className="page-stack collection-page">
    <header className="page-header"><div><p className="breadcrumb"><span>Collection</span></p><h1>Roster tracker</h1><p className="page-intro">Track ownership and uncaps, compare Gamewith and Kamigame ratings, and find characters by the utility described in their source summaries.</p></div><dl className="stage-summary"><dt>{kind==="character"?"Characters":"Summons"} owned</dt><dd>{hydrated?ownedCount:"—"}</dd></dl></header>

    <div className="collection-toolbar">
      <div className="collection-switch" role="group" aria-label="Collection type"><Button variant={kind==="character"?"default":"outline"} onClick={()=>changeKind("character")}>Characters</Button><Button variant={kind==="summon"?"default":"outline"} onClick={()=>changeKind("summon")}>Summons</Button></div>
      {kind==="character"&&<><div className="collection-switch" role="group" aria-label="Rating source"><Button variant={source==="gamewith"?"default":"outline"} onClick={()=>setSource("gamewith")}>Gamewith</Button><Button variant={source==="kamigame"?"default":"outline"} onClick={()=>setSource("kamigame")}>Kamigame</Button></div><div className="collection-switch" role="group" aria-label="Display mode"><Button variant={view==="collection"?"default":"outline"} onClick={()=>setView("collection")}>Collection</Button><Button variant={view==="ratings"?"default":"outline"} onClick={()=>setView("ratings")}>Ratings</Button><Button variant={view==="grades"?"default":"outline"} onClick={()=>setView("grades")}>Grades</Button></div></>}
    </div>

    <section id="filters" className="collection-filter-panel">
      <header><div><Filter aria-hidden="true"/><strong>Filters</strong><span>{filtered.length} results</span></div><Button variant="ghost" size="sm" onClick={resetFilters}><RotateCcw aria-hidden="true"/>Reset</Button></header>
      <div className="collection-filter-tools">
        <label className="collection-search"><span>Search</span><div><Search aria-hidden="true"/><input value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Name, JP name, or ID"/></div></label>
        <label className="collection-sort"><span>Sort</span><select value={sort} onChange={(event)=>setSort(event.target.value)}><option value="default">Wiki order</option><option value="name">Name A–Z</option><option value="newest">Newest first</option>{kind==="character"&&<option value="rating">Highest rating</option>}</select></label>
      </div>
      <div className="collection-quick-filters">
        <PillGroup label="Element" value={element} onChange={setElement} options={[{value:"all",label:"All"},...elements.map((entry)=>({value:entry,label:elementNames[entry],icon:`/collection-icons/element-${entry}.png`}))]}/>
        <div className="quick-filter-pair"><PillGroup label="Owned" value={owned} onChange={(value)=>setOwned(value as OwnedFilter)} options={[{value:"all",label:"All"},{value:"owned",label:"Owned"},{value:"missing",label:"Missing"}]}/><PillGroup label="Rarity" value={rarity} onChange={setRarity} options={[{value:"all",label:"All"},{value:"ssr",label:"SSR"},{value:"sr",label:"SR"},{value:"r",label:"R"}]}/></div>
        {kind==="character"&&view==="grades"&&<><PillGroup label="Purpose" value={gradeField} onChange={(value)=>setGradeField(value as GradeField)} options={[{value:"grinding",label:"Grinding"},{value:"fullAuto",label:"Full Auto"},{value:"highDifficulty",label:"High difficulty"}]}/><PillGroup label="Minimum grade" value={minimumGrade} onChange={setMinimumGrade} options={[{value:"all",label:"Any"},...(["B","A","S","SS"] as const).map((value)=>({value,label:`${value}+`}))]}/></>}
        {kind==="character"&&view!=="grades"&&<PillGroup label="Rating" value={minimumRating} onChange={setMinimumRating} options={[{value:"all",label:"Any"},...[9,9.5,9.8,10].map((value)=>({value:String(value),label:`${value}+`}))]}/>}
        <MultiPills label="Series" values={series} options={options.series} priority={seriesPriority} onToggle={(value)=>toggleList(setSeries,value)} iconFor={(value)=>summonSeriesIcons.has(value)?`/collection-icons/series-summon-${value.replaceAll(" ","-")}.png`:`/collection-icons/series-${value}.png`}/>
        <ExpandablePills label="Obtain" values={obtain} options={options.obtains} priority={obtainPriority} expanded={obtainExpanded} onExpanded={()=>setObtainExpanded((value)=>!value)} onToggle={(value)=>toggleList(setObtain,value)}/>
        {kind==="character"&&<><div className="effect-filter-wrap"><MultiPills label="Effects" values={effect} options={Object.keys(effectLabels)} priority={effectPriority} onToggle={(value)=>toggleList(setEffect,value)}/>{effect.length>1&&<div className="effect-match"><span>Match</span><button type="button" aria-pressed={effectMatch==="any"} className={effectMatch==="any"?"is-active":""} onClick={()=>setEffectMatch("any")}>Any</button><button type="button" aria-pressed={effectMatch==="all"} className={effectMatch==="all"?"is-active":""} onClick={()=>setEffectMatch("all")}>All</button></div>}</div><MultiPills label="Race" values={race} options={options.races} priority={racePriority} onToggle={(value)=>toggleList(setRace,value)} iconFor={(value)=>`/collection-icons/race-${value}.png`}/><MultiPills label="Specialty" values={specialty} options={options.specialties} priority={specialtyPriority} onToggle={(value)=>toggleList(setSpecialty,value)}/><MultiPills label="Style" values={style} options={options.styles} priority={stylePriority} onToggle={(value)=>toggleList(setStyle,value)}/></>}
        <MultiPills label="Released" values={released} options={options.released} priority={releasedPriority} onToggle={(value)=>toggleList(setReleased,value)}/>
      </div>
      {activeFilters.length>0&&<div className="active-filter-strip"><span>Active</span><div>{activeFilters.map((filter)=><button type="button" onClick={filter.clear} key={filter.key}>{filter.label}<X aria-hidden="true"/></button>)}</div><button type="button" className="clear-filter-link" onClick={resetFilters}>Clear all</button></div>}
      {kind==="character"&&<p className="effect-filter-note">Effect tags are searchable hints derived from the mirrored rating summaries. They are useful for discovery, but they are not yet a complete skill-by-skill kit index.</p>}
    </section>

    <section className="collection-results" aria-live="polite">
      {!catalog&&!loadError&&<div className="collection-state"><LoaderCircle aria-hidden="true"/><strong>Loading collection catalog…</strong></div>}
      {loadError&&<div className="collection-state is-error"><strong>Collection data could not be loaded.</strong><span>Reload the page to try again.</span></div>}
      {catalog&&filtered.length===0&&<div className="collection-state"><strong>No matches</strong><span>Reset a filter or try a broader search.</span></div>}
      {catalog&&filtered.length>0&&view==="collection"&&<CollectionGrid items={filtered} source={source} limit={limit} onMore={()=>setLimit((value)=>value+120)}/>} 
      {catalog&&filtered.length>0&&view==="ratings"&&kind==="character"&&<RatingsGrid items={filtered} source={source} element={element}/>} 
      {catalog&&filtered.length>0&&view==="grades"&&kind==="character"&&<GradesList items={filtered} source={source} limit={limit} onMore={()=>setLimit((value)=>value+120)}/>} 
    </section>

    {catalog&&<footer className="collection-source-note"><span>Snapshot {new Date(catalog.snapshotAt).toLocaleDateString()}</span><p>Collection metadata and summaries are mirrored from <a href={catalog.sources.collection} target="_blank" rel="noreferrer">GBF Wiki Collection Tracker <ExternalLink aria-hidden="true"/></a>, with ratings and grades attributed to <a href={catalog.sources.gamewithGrades} target="_blank" rel="noreferrer">Gamewith <ExternalLink aria-hidden="true"/></a> and <a href={catalog.sources.kamigameGrades} target="_blank" rel="noreferrer">Kamigame <ExternalLink aria-hidden="true"/></a>. GBF Wiki content is available under CC BY-NC-SA.</p></footer>}
  </div>;
}
