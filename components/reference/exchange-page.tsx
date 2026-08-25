"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import {useCallback,useEffect,useMemo,useState} from "react";
import {Check,ExternalLink} from "lucide-react";
import {useProgress} from "@/components/progress/use-progress";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {exchangeProgressId} from "@/data/progress-map";
import {exchangeTabs} from "@/data/reference/exchanges";
import {getMonthlyExchangeScope} from "@/lib/progress";

const sections=exchangeTabs.filter((section)=>section.name!=="Skill Levels");

function selectedFromUrl(){
  if(typeof window==="undefined")return 0;
  const value=new URLSearchParams(window.location.search).get("section");
  const found=sections.findIndex((section)=>section.id===value);
  return found<0?0:found;
}

export function ExchangePage(){
  const [sectionIndex,setSectionIndex]=useState(0);
  const {values,setComplete}=useProgress();
  const readUrl=useCallback(()=>setSectionIndex(selectedFromUrl()),[]);
  useEffect(()=>{readUrl();window.addEventListener("popstate",readUrl);return()=>window.removeEventListener("popstate",readUrl)},[readUrl]);
  const current=sections[sectionIndex]??sections[0];
  const month=useMemo(()=>getMonthlyExchangeScope(),[]);

  function select(index:number){
    setSectionIndex(index);
    const url=new URL(window.location.href);url.searchParams.set("section",sections[index].id);window.history.pushState({},"",url);
  }

  return <div className="page-stack reference-page">
    <header className="page-header"><div><p className="breadcrumb"><span>Reference</span></p><h1>Exchange priorities</h1><p className="page-intro">Protect scarce currency first, then use shops to remove a specific account bottleneck.</p></div><dl className="stage-summary"><dt>Account stage</dt><dd>Magna II → Magna III</dd></dl></header>

    <section className="exchange-summary"><div><span className="section-kicker">Monthly baseline</span><h2>Buy scarcity, not convenience.</h2><p>Clear the three Renown Moons, then spend Prestige on three Enigmatic Armillas before farmable weapons or materials. Daily Points are a targeted shortcut—not a shop to empty.</p></div><dl><div><dt>Daily balance</dt><dd>6,510</dd></div><div><dt>Daily income</dt><dd>20 / day</dd></div><div><dt>Full target set</dt><dd>5,400 max</dd></div><div><dt>Reserve after</dt><dd>1,110 min</dd></div></dl></section>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Purchase queue</span><h2>{current.name}</h2></div><p>{current.name==="Monthly"?`Checklist scope: ${month}. A new month starts clean without deleting the prior record.`:"Check a target only after buying its intended stock or finishing the stated account goal."}</p></div>
      <div className="selection-tabs reference-tabs" role="group" aria-label="Exchange section">{sections.map((section,index)=><Button key={section.name} variant={sectionIndex===index?"default":"outline"} aria-pressed={sectionIndex===index} onClick={()=>select(index)}><span>{section.name}</span><small>{section.subtitle}</small></Button>)}</div>
      <div className="exchange-list">{current.items.map((item)=>{const progressId=exchangeProgressId(current,item);const complete=!!values[progressId];return <article className={`exchange-row ${complete?"is-complete":""}`} key={item.id}><Checkbox checked={complete} onCheckedChange={(checked)=>setComplete(progressId,checked===true)} aria-label={`Mark ${item.name} complete`}/><div><div className="exchange-row-title"><h3>{item.name}</h3><Badge className={`status-${item.tag.toLowerCase().replace(" ","-")}`}>{item.tag==="IF BLOCKED"?"Conditional":item.tag[0]+item.tag.slice(1).toLowerCase()}</Badge></div><strong>{item.cost}</strong><p>{item.note}</p></div>{complete&&<Check className="row-check" aria-label="Complete"/>}</article>})}</div>
    </section>

    <section className="reference-notes"><article><span className="section-kicker">Daily point rule</span><h2>Buy copies. Farm materials.</h2><p>Four 300-point copies cost 1,200. Buying 50 Six-Dragon Jewels and 10 unique treasures for a 4★ uncap would add another 4,500 points. Only exchange materials for a tiny, immediate shortage.</p></article><article><span className="section-kicker">Evidence</span><h2>2026 cross-check</h2><p><a href="https://gbf.wiki/Pendants" target="_blank" rel="noreferrer">GBF Wiki pendant inventory <ExternalLink aria-hidden="true"/></a><a href="https://gbf.wiki/Daily_Point_Shop" target="_blank" rel="noreferrer">Daily Point inventory <ExternalLink aria-hidden="true"/></a><a href="https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%B2%E3%83%BC%E3%83%A0%E7%9F%A5%E8%AD%98/%E6%A0%84%E8%AA%89%E3%81%AE%E8%BC%9D%E3%81%8D.html" target="_blank" rel="noreferrer">Kamigame priorities <ExternalLink aria-hidden="true"/></a></p></article></section>
  </div>;
}
