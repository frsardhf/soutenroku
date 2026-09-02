"use client";
/* eslint-disable @next/next/no-img-element */

import {useDeferredValue,useEffect,useMemo,useState} from "react";
import {Check,ChevronDown,ExternalLink,Filter,LoaderCircle,RotateCcw,Search} from "lucide-react";
import {useAccount} from "@/components/progress/account-provider";
import {Button} from "@/components/ui/button";
import {effectLabels,type CollectionCatalog,type CollectionCatalogItem,type Grade,type RatingSource} from "@/lib/collection/types";

type ViewMode="collection"|"ratings"|"grades";
type OwnedFilter="all"|"owned"|"missing";
type GradeField="grinding"|"fullAuto"|"highDifficulty";

const elements=["fire","water","earth","wind","light","dark","any"];
const gradeOrder:Record<string,number>={SS:6,S:5,A:4,B:3,C:2,D:1,"":0};
const elementNames:Record<string,string>={fire:"Fire",water:"Water",earth:"Earth",wind:"Wind",light:"Light",dark:"Dark",any:"Any"};

function imageUrl(item:CollectionCatalogItem){
  const file=item.kind==="character"?`Npc_m_${item.id}_01.jpg`:`Summon_m_${item.id}.jpg`;
  return `https://gbf.wiki/Special:Redirect/file/${file}`;
}

function pretty(value:string){return value.replaceAll("_"," ").replace(/\b\w/g,(letter)=>letter.toUpperCase())}

function RatingBadge({rating}:{rating?:number}){
  return <span className="collection-rating">{rating?.toFixed(rating%1===0?0:1)??"—"}</span>;
}

function GradeBadge({value,label}:{value?:Grade;label?:string}){
  return <span className={`collection-grade grade-${(value||"none").toLowerCase()}`}>{label&&<small>{label}</small>}{value||"—"}</span>;
}

function HoverSummary({item,source}:{item:CollectionCatalogItem;source:RatingSource}){
  const rating=item.ratings[source];
  if(item.kind!=="character")return <div className="collection-hover-summary"><strong>{item.name}</strong><span>{pretty(item.rarity)} summon · {elementNames[item.element]??pretty(item.element)}</span><p>Released {item.releaseDate||item.released||"unknown"}.</p></div>;
  return <div className="collection-hover-summary" role="tooltip">
    <header><div><strong>{item.name}</strong><span>{source==="gamewith"?"Gamewith":"Kamigame"} summary</span></div><RatingBadge rating={rating?.rating}/></header>
    <div className="hover-grade-row"><GradeBadge label="Grind" value={rating?.grinding}/><GradeBadge label="FA" value={rating?.fullAuto}/><GradeBadge label="HL" value={rating?.highDifficulty}/></div>
    {rating?.summary.length?<ul>{rating.summary.slice(0,4).map((line)=><li key={line}>{line}</li>)}</ul>:<p>No source summary is currently listed.</p>}
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
  const [obtain,setObtain]=useState("all");
  const [series,setSeries]=useState("all");
  const [effect,setEffect]=useState("all");
  const [minimumRating,setMinimumRating]=useState("all");
  const [gradeField,setGradeField]=useState<GradeField>("fullAuto");
  const [minimumGrade,setMinimumGrade]=useState("all");
  const [sort,setSort]=useState("default");
  const [limit,setLimit]=useState(120);

  useEffect(()=>{const controller=new AbortController();fetch("/data/gbf-collection.json",{signal:controller.signal}).then((response)=>{if(!response.ok)throw new Error("catalog");return response.json()}).then((value:CollectionCatalog)=>{if(value.schemaVersion!==1||!Array.isArray(value.items))throw new Error("catalog");setCatalog(value)}).catch((error)=>{if(error.name!=="AbortError")setLoadError(true)});return()=>controller.abort()},[]);
  const options=useMemo(()=>{
    const base=catalog?.items.filter((item)=>item.kind===kind)??[];
    return {obtains:[...new Set(base.flatMap((item)=>item.obtain))].sort(),series:[...new Set(base.flatMap((item)=>item.series))].sort()};
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
      if(obtain!=="all"&&!item.obtain.includes(obtain))return false;
      if(series!=="all"&&!item.series.includes(series))return false;
      if(effect!=="all"&&!item.effects.includes(effect))return false;
      const rating=item.ratings[source];
      if(view!=="collection"&&kind==="character"&&!rating?.rating)return false;
      if(minimumRating!=="all"&&(rating?.rating??0)<Number(minimumRating))return false;
      if(minimumGrade!=="all"&&gradeOrder[rating?.[gradeField]??""]<gradeOrder[minimumGrade])return false;
      return true;
    });
    return result.sort((a,b)=>{
      if(sort==="name")return a.name.localeCompare(b.name);
      if(sort==="newest")return b.releaseDate.localeCompare(a.releaseDate);
      if(sort==="rating")return (b.ratings[source]?.rating??0)-(a.ratings[source]?.rating??0)||a.name.localeCompare(b.name);
      return 0;
    });
  },[account.collection,catalog,deferredSearch,element,gradeField,kind,minimumGrade,minimumRating,obtain,owned,rarity,series,effect,sort,source,view]);

  const ownedCount=useMemo(()=>Object.values(kind==="character"?account.collection.characters:account.collection.summons).filter((entry)=>entry.owned).length,[account.collection,kind]);
  function resetFilters(){setSearch("");setElement("all");setRarity("all");setOwned("all");setObtain("all");setSeries("all");setEffect("all");setMinimumRating("all");setMinimumGrade("all");setSort("default")}
  function changeKind(next:"character"|"summon"){setKind(next);if(next==="summon"&&view!=="collection")setView("collection")}

  return <div className="page-stack collection-page">
    <header className="page-header"><div><p className="breadcrumb"><span>Collection</span></p><h1>Roster tracker</h1><p className="page-intro">Track ownership and uncaps, compare Gamewith and Kamigame ratings, and find characters by the utility described in their source summaries.</p></div><dl className="stage-summary"><dt>{kind==="character"?"Characters":"Summons"} owned</dt><dd>{hydrated?ownedCount:"—"}</dd></dl></header>

    <div className="collection-toolbar">
      <div className="collection-switch" role="group" aria-label="Collection type"><Button variant={kind==="character"?"default":"outline"} onClick={()=>changeKind("character")}>Characters</Button><Button variant={kind==="summon"?"default":"outline"} onClick={()=>changeKind("summon")}>Summons</Button></div>
      {kind==="character"&&<><div className="collection-switch" role="group" aria-label="Rating source"><Button variant={source==="gamewith"?"default":"outline"} onClick={()=>setSource("gamewith")}>Gamewith</Button><Button variant={source==="kamigame"?"default":"outline"} onClick={()=>setSource("kamigame")}>Kamigame</Button></div><div className="collection-switch" role="group" aria-label="Display mode"><Button variant={view==="collection"?"default":"outline"} onClick={()=>setView("collection")}>Collection</Button><Button variant={view==="ratings"?"default":"outline"} onClick={()=>setView("ratings")}>Ratings</Button><Button variant={view==="grades"?"default":"outline"} onClick={()=>setView("grades")}>Grades</Button></div></>}
    </div>

    <section id="filters" className="collection-filter-panel">
      <header><div><Filter aria-hidden="true"/><strong>Filters</strong><span>{filtered.length} results</span></div><Button variant="ghost" size="sm" onClick={resetFilters}><RotateCcw aria-hidden="true"/>Reset</Button></header>
      <div className="collection-filters">
        <label className="collection-search"><span>Search</span><div><Search aria-hidden="true"/><input value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Name, JP name, or ID"/></div></label>
        <label><span>Element</span><select value={element} onChange={(event)=>setElement(event.target.value)}><option value="all">All elements</option>{elements.map((entry)=><option key={entry} value={entry}>{elementNames[entry]}</option>)}</select></label>
        <label><span>Rarity</span><select value={rarity} onChange={(event)=>setRarity(event.target.value)}><option value="all">All rarities</option><option value="ssr">SSR</option><option value="sr">SR</option><option value="r">R</option></select></label>
        <label><span>Owned</span><select value={owned} onChange={(event)=>setOwned(event.target.value as OwnedFilter)}><option value="all">Owned + missing</option><option value="owned">Owned only</option><option value="missing">Missing only</option></select></label>
        <label><span>Obtain</span><select value={obtain} onChange={(event)=>setObtain(event.target.value)}><option value="all">All methods</option>{options.obtains.map((entry)=><option key={entry} value={entry}>{pretty(entry)}</option>)}</select></label>
        <label><span>Series</span><select value={series} onChange={(event)=>setSeries(event.target.value)}><option value="all">All series</option>{options.series.map((entry)=><option key={entry} value={entry}>{pretty(entry)}</option>)}</select></label>
        {kind==="character"&&<><label><span>Effect / use</span><select value={effect} onChange={(event)=>setEffect(event.target.value)}><option value="all">All summary tags</option>{Object.entries(effectLabels).map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label><label><span>Minimum rating</span><select value={minimumRating} onChange={(event)=>setMinimumRating(event.target.value)}><option value="all">Any rating</option>{[10,9.8,9.5,9,8.5].map((rating)=><option value={rating} key={rating}>{rating}+</option>)}</select></label><label><span>Grade category</span><select value={gradeField} onChange={(event)=>setGradeField(event.target.value as GradeField)}><option value="grinding">Grinding</option><option value="fullAuto">Full Auto</option><option value="highDifficulty">High difficulty</option></select></label><label><span>Minimum grade</span><select value={minimumGrade} onChange={(event)=>setMinimumGrade(event.target.value)}><option value="all">Any grade</option>{["SS","S","A","B"].map((grade)=><option value={grade} key={grade}>{grade}+</option>)}</select></label></>}
        <label><span>Sort</span><select value={sort} onChange={(event)=>setSort(event.target.value)}><option value="default">Wiki order</option><option value="name">Name A–Z</option><option value="newest">Newest first</option>{kind==="character"&&<option value="rating">Highest rating</option>}</select></label>
      </div>
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
