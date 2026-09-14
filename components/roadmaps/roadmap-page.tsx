"use client";
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-html-link-for-pages */

import {useEffect,useRef,useState} from "react";
import {ChevronRight,ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useAccount} from "@/components/progress/account-provider";
import type {RoadmapAdvice,TargetUnit} from "@/data/roadmap-advice";
import {teamId,type StableElementId} from "@/data/roadmap-identity";
import type {Plan} from "@/data/roadmaps";

export type RoadmapViewPlan=Pick<Plan,"element"|"subtitle"|"current"|"color"|"teams">;

function characterImage(id:string){return `https://gbf.wiki/Special:Redirect/file/Npc_m_${id}_01.jpg`}

function TargetLineup({units,color,owned}:{units:TargetUnit[];color:string;owned:Record<string,{owned:boolean}|undefined>}){
  return <div className="target-lineup">{units.map((unit)=><article className={`target-lineup-unit ${owned[unit.id]?.owned?"is-owned":""}`} key={unit.id}>
    <div className="portrait" style={{backgroundImage:`url(${characterImage(unit.id)})`,backgroundColor:color}}/>
    <strong>{unit.name}</strong><small>{unit.role}</small>
  </article>)}</div>;
}

function legacyTeamFromUrl(plan:RoadmapViewPlan){
  if(typeof window==="undefined")return null;
  const query=new URLSearchParams(window.location.search);
  if(!query.has("team")&&!query.has("grid"))return null;
  const index=Math.max(0,plan.teams.findIndex((_,teamIndex)=>teamId(plan,teamIndex)===query.get("team")));
  const url=new URL(window.location.href);url.searchParams.delete("team");url.searchParams.delete("grid");
  window.history.replaceState({},"",`${url.pathname}${url.search}${url.hash}`);
  return index;
}

export function RoadmapPage({plan,advice,reviewedAt}:{plan:RoadmapViewPlan;advice:RoadmapAdvice;reviewedAt:string}){
  const [teamIndex,setTeamIndex]=useState(0);
  const {account,hydrated,setRoadmapSelection}=useAccount();
  const legacyHandled=useRef(false);
  const elementId=plan.element.toLowerCase() as StableElementId;
  const team=plan.teams[teamIndex]??plan.teams[0];

  useEffect(()=>{
    if(!hydrated)return;
    if(!legacyHandled.current){
      legacyHandled.current=true;
      const legacyTeam=legacyTeamFromUrl(plan);
      if(legacyTeam!==null){setTeamIndex(legacyTeam);setRoadmapSelection(elementId,{teamId:teamId(plan,legacyTeam)});return}
    }
    const stored=account.roadmapSelections[elementId];
    if(!stored?.teamId)return;
    const storedTeam=plan.teams.findIndex((_,index)=>teamId(plan,index)===stored.teamId);
    setTeamIndex(storedTeam>=0?storedTeam:0);
  },[account.roadmapSelections,elementId,hydrated,plan,setRoadmapSelection]);

  function select(nextTeam:number){setTeamIndex(nextTeam);setRoadmapSelection(elementId,{teamId:teamId(plan,nextTeam)})}

  return <div className="page-stack roadmap-page roadmap-page-focused" style={{"--element-color":plan.color} as React.CSSProperties}>
    <header className="page-header">
      <div><p className="breadcrumb"><a href="/roadmaps/water">Roadmaps</a><ChevronRight aria-hidden="true"/><span>{plan.element}</span></p><h1>{plan.element} teams</h1><p className="page-intro">Account-specific Full Auto templates, compact Revans entries, and researched spark targets with their intended replacements.</p></div>
      <dl className="stage-summary"><dt>Current stage</dt><dd>{plan.current}</dd></dl>
    </header>

    <nav className="anchor-nav" aria-label={`${plan.element} team sections`}><a href="#team">Templates</a><a href="#targets">Spark targets</a><a href="https://gbf.wiki/Advanced_Grids" target="_blank" rel="noreferrer">Advanced Grids <ExternalLink aria-hidden="true"/></a></nav>

    <section id="team" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Account templates</span><h2>Team templates</h2></div><p>Choose the job first. Revans presets stay compact here for visual roster planning, then link to their dedicated raid instructions.</p></div>
      <div className="selection-tabs" role="group" aria-label="Team selection">{plan.teams.map((candidate,index)=><Button key={candidate.name} variant={teamIndex===index?"default":"outline"} aria-pressed={teamIndex===index} onClick={()=>select(index)}><span>Team {String.fromCharCode(65+index)}</span><small>{candidate.name}</small></Button>)}</div>
      <div className="team-layout roster-only"><article className="team-surface">
        <div className="surface-heading"><Badge>{team.mode}</Badge><span>{teamIndex===0?"Primary":"Alternative"}</span></div>
        <h3>{team.name}</h3>
        <div className={`lineup ${team.units.length===5?"has-five":""}`}>{team.units.map((unit)=><article className="unit" key={unit.name}><div className="portrait" style={unit.id?{backgroundImage:`url(${characterImage(unit.id)})`,backgroundColor:plan.color}:{backgroundColor:plan.color}}><span>{unit.id?"":unit.name[0]}</span></div><strong>{unit.name}</strong><small>{unit.role}</small></article>)}</div>
        {team.mc&&<div className="mc-config"><div><span className="section-kicker">MC configuration</span><strong>{team.mc.className}</strong></div><dl><div><dt>Charge attacks</dt><dd>{team.mc.ca}</dd></div><div><dt>Mainhand</dt><dd>{team.mc.mainhand}</dd></div><div><dt>Skills</dt><dd>{team.mc.skills.join(" · ")}</dd></div></dl><p>{team.mc.note}</p></div>}
        <p className="team-note">{team.note}</p>
        {team.guide&&<a className="team-guide-link" href={team.guide.href}>{team.guide.label}<ChevronRight aria-hidden="true"/></a>}
      </article></div>
    </section>

    <section id="targets" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Researched acquisition plan</span><h2>Spark targets by job</h2></div><p>General value, strict first-turn value, and difficult unattended play stay separate so every target has a concrete destination.</p></div>
      <div className="gacha-target-grid">
        <article><Badge>General account</Badge><h3>{advice.gacha.general.name}</h3><p>{advice.gacha.general.reason}</p></article>
        <article><Badge className="status-next">One-turn target</Badge><h3>{advice.gacha.oneTurn.name}</h3><p>{advice.gacha.oneTurn.reason}</p></article>
        <article><Badge className="status-conditional">High-level Full Auto</Badge><h3>{advice.gacha.highLevel.primary}</h3><p>{advice.gacha.highLevel.reason}</p></article>
      </div>
      <article className="one-turn-plan">
        <header><div><span className="section-kicker">Target-complete one-turn setup</span><h3>{advice.gacha.plan.target}</h3></div><Badge>{`CA ${advice.gacha.plan.ca}`}</Badge></header>
        <TargetLineup units={advice.gacha.plan.units} color={plan.color} owned={account.collection.characters}/>
        <dl><div><dt>Current route</dt><dd>{advice.gacha.plan.current}</dd></div><div><dt>Opening sequence</dt><dd><ol>{advice.gacha.plan.opener.map((action,index)=><li key={action}><span>{index+1}</span>{action}</li>)}</ol></dd></div></dl>
        <p><strong>Verdict.</strong> {advice.gacha.plan.verdict}</p>
      </article>
      <article className="high-level-plan">
        <header><div><span className="section-kicker">Target-complete difficult Full Auto</span><h3>{advice.gacha.highLevel.team}</h3></div><Badge>{advice.gacha.highLevel.intervention}</Badge></header>
        <TargetLineup units={advice.gacha.highLevel.units} color={plan.color} owned={account.collection.characters}/>
        <dl><div><dt>Primary target</dt><dd>{advice.gacha.highLevel.primary}</dd></div><div><dt>Secondary</dt><dd>{advice.gacha.highLevel.secondary}</dd></div></dl>
        <p><strong>Boundary.</strong> {advice.gacha.highLevel.skip}</p>
        <div className="evidence-links">{advice.gacha.highLevel.sources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ExternalLink aria-hidden="true"/></a>)}</div>
      </article>
      <div className="later-targets"><span className="section-kicker">Later / specialist targets</span>{advice.gacha.later.map((target)=><article key={target.name}><strong>{target.name}</strong><p>{target.reason}</p></article>)}</div>
      <p className="source-note evidence-links">Reviewed {reviewedAt}. Evidence: {advice.gacha.sources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ExternalLink aria-hidden="true"/></a>)}</p>
    </section>

    <aside className="roadmap-grid-handoff"><div><span className="section-kicker">Weapon grids</span><strong>Use the maintained GBF Wiki reference</strong><p>Grid recommendations change faster than this personal roster plan. Open Advanced Grids for current Omega, Optimus, burst, and raid-specific layouts.</p></div><a href="https://gbf.wiki/Advanced_Grids" target="_blank" rel="noreferrer">Open Advanced Grids <ExternalLink aria-hidden="true"/></a></aside>
  </div>;
}
