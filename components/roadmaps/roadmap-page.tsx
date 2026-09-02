"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import {useEffect,useMemo,useRef,useState} from "react";
/* eslint-disable @next/next/no-html-link-for-pages */
import {Check,ChevronRight,ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {useProgress} from "@/components/progress/use-progress";
import {useAccount} from "@/components/progress/account-provider";
import {expandWeaponSlots,weaponProgressId} from "@/data/progress-map";
import {roadmapAdvice,roadmapAdviceReviewedAt} from "@/data/roadmap-advice";
import {gridId,teamId,weaponGroupIds,type StableElementId} from "@/data/roadmap-identity";
import type {Plan} from "@/data/roadmaps";
import {getWeaponAssetPath} from "@/lib/weapons/assets";

const sections=[
  ["team","Team"],["targets","Targets"],["grid","Grid"],["summons","Summons"],["opus","Opus"],["mastery","Mastery"],
  ["awakening","Awakening"],["rings","Rings"],["artifacts","Artifacts"],["backline","Backline"],
] as const;

function characterImage(id:string){
  return `https://gbf.wiki/Special:Redirect/file/Npc_m_${id}_01.jpg`;
}

function controlledStatus(tag:string){
  if(tag==="CURRENT")return "Current";
  if(tag==="NEXT")return "Next";
  if(tag==="TARGET")return "Target";
  if(tag==="SKIP")return "Skip";
  return "Conditional";
}

function legacySelectionFromUrl(plan:Plan){
  if(typeof window==="undefined")return null;
  const query=new URLSearchParams(window.location.search);
  if(!query.has("team")&&!query.has("grid"))return null;
  const team=Math.max(0,plan.teams.findIndex((_,index)=>teamId(plan,index)===query.get("team")));
  const grid=Math.max(0,plan.grids.findIndex((_,index)=>gridId(plan,index)===query.get("grid")));
  return {team,grid};
}

export function RoadmapPage({plan}:{plan:Plan}){
  const [teamIndex,setTeamIndex]=useState(0);
  const [gridIndex,setGridIndex]=useState(0);
  const {values,setComplete}=useProgress();
  const {account,hydrated,setRoadmapSelection}=useAccount();
  const legacyHandled=useRef(false);
  const elementId=plan.element.toLowerCase() as StableElementId;
  const advice=roadmapAdvice[plan.element.toLowerCase() as StableElementId];
  const team=plan.teams[teamIndex]??plan.teams[0];
  const grid=plan.grids[gridIndex]??plan.grids[0];
  const slots=useMemo(()=>expandWeaponSlots(grid.weapons,weaponGroupIds(plan,gridIndex)),[grid,gridIndex,plan]);

  useEffect(()=>{
    if(!hydrated)return;
    if(!legacyHandled.current){
      legacyHandled.current=true;
      const legacy=legacySelectionFromUrl(plan);
      if(legacy){
        setTeamIndex(legacy.team);setGridIndex(legacy.grid);
        setRoadmapSelection(elementId,{teamId:teamId(plan,legacy.team),gridId:gridId(plan,legacy.grid)});
        const url=new URL(window.location.href);url.searchParams.delete("team");url.searchParams.delete("grid");
        window.history.replaceState({},"",`${url.pathname}${url.search}${url.hash}`);
        return;
      }
    }
    const stored=account.roadmapSelections[elementId];
    if(!stored)return;
    const storedTeam=plan.teams.findIndex((_,index)=>teamId(plan,index)===stored.teamId);
    const storedGrid=plan.grids.findIndex((_,index)=>gridId(plan,index)===stored.gridId);
    setTeamIndex(storedTeam>=0?storedTeam:0);setGridIndex(storedGrid>=0?storedGrid:0);
  },[account.roadmapSelections,elementId,hydrated,plan,setRoadmapSelection]);

  function select(nextTeam:number,nextGrid:number){
    setTeamIndex(nextTeam);setGridIndex(nextGrid);
    setRoadmapSelection(elementId,{teamId:teamId(plan,nextTeam),gridId:gridId(plan,nextGrid)});
  }

  return <div className="page-stack roadmap-page" style={{"--element-color":plan.color} as React.CSSProperties}>
    <header className="page-header">
      <div><p className="breadcrumb"><a href="/roadmaps/water">Roadmaps</a><ChevronRight aria-hidden="true"/><span>{plan.element}</span></p><h1>{plan.element} roadmap</h1><p className="page-intro">{plan.subtitle} progression, primary frontline investment, and a grid path built for this account.</p></div>
      <dl className="stage-summary"><dt>Current stage</dt><dd>{plan.current}</dd></dl>
    </header>

    <nav className="anchor-nav" aria-label={`${plan.element} roadmap sections`}>{sections.filter(([id])=>id!=="artifacts"||plan.artifacts).map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}</nav>

    <section id="team" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Team</span><h2>Frontline plan</h2></div><p>Team A is the account default. Team B is a real alternative, not a second mandatory investment path.</p></div>
      <div className="selection-tabs" role="group" aria-label="Team selection">{plan.teams.map((candidate,index)=><Button key={candidate.name} variant={teamIndex===index?"default":"outline"} aria-pressed={teamIndex===index} onClick={()=>select(index,gridIndex)}><span>Team {index===0?"A":"B"}</span><small>{index===0?"Primary":"Alternative"}</small></Button>)}</div>
      <div className="team-layout">
        <article className="team-surface">
          <div className="surface-heading"><Badge>{team.mode}</Badge><span>{teamIndex===0?"Primary":"Alternative"}</span></div>
          <h3>{team.name}</h3>
          <div className="lineup">{team.units.map((unit)=><article className="unit" key={unit.name}><div className="portrait" style={unit.id?{backgroundImage:`url(${characterImage(unit.id)})`,backgroundColor:plan.color}:{backgroundColor:plan.color}}><span>{unit.id?"":unit.name[0]}</span></div><strong>{unit.name}</strong><small>{unit.role}</small></article>)}</div>
          <p className="team-note">{team.note}</p>
        </article>
        <aside className="priority-list"><span className="section-kicker">Investment queue</span><ol>{plan.priorities.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol></aside>
      </div>
    </section>

    <section id="targets" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Gacha targets</span><h2>Three jobs, three target lists</h2></div><p>General account value, strict first-turn value, and high-level Full Auto are stored separately so a numerical tier list cannot erase team-specific reasoning.</p></div>
      <div className="gacha-target-grid">
        <article><Badge>General account</Badge><h3>{advice.gacha.general.name}</h3><p>{advice.gacha.general.reason}</p></article>
        <article><Badge className="status-next">One-turn target</Badge><h3>{advice.gacha.oneTurn.name}</h3><p>{advice.gacha.oneTurn.reason}</p></article>
        <article><Badge className="status-conditional">High-level Full Auto</Badge><h3>{advice.gacha.highLevel.primary}</h3><p>{advice.gacha.highLevel.reason}</p></article>
      </div>
      <article className="one-turn-plan">
        <header><div><span className="section-kicker">Target-complete setup</span><h3>{advice.gacha.plan.target}</h3></div><Badge>{`CA ${advice.gacha.plan.ca}`}</Badge></header>
        <dl><div><dt>Current route</dt><dd>{advice.gacha.plan.current}</dd></div><div><dt>Opening sequence</dt><dd><ol>{advice.gacha.plan.opener.map((action,index)=><li key={action}><span>{index+1}</span>{action}</li>)}</ol></dd></div></dl>
        <p><strong>Verdict.</strong> {advice.gacha.plan.verdict}</p>
      </article>
      <article className="high-level-plan">
        <header><div><span className="section-kicker">Difficult unattended fights</span><h3>{advice.gacha.highLevel.team}</h3></div><Badge>{advice.gacha.highLevel.intervention}</Badge></header>
        <dl><div><dt>Primary target</dt><dd>{advice.gacha.highLevel.primary}</dd></div><div><dt>Secondary</dt><dd>{advice.gacha.highLevel.secondary}</dd></div></dl>
        <p><strong>Boundary.</strong> {advice.gacha.highLevel.skip}</p>
        <div className="evidence-links">{advice.gacha.highLevel.sources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ExternalLink aria-hidden="true"/></a>)}</div>
      </article>
      <div className="later-targets"><span className="section-kicker">Later / specialist targets</span>{advice.gacha.later.map((target)=><article key={target.name}><strong>{target.name}</strong><p>{target.reason}</p></article>)}</div>
      <p className="source-note evidence-links">Reviewed {roadmapAdviceReviewedAt}. Evidence: {advice.gacha.sources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ExternalLink aria-hidden="true"/></a>)}</p>
    </section>

    <section id="grid" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Grid</span><h2>Weapon roadmap</h2></div><p>Move one milestone at a time. Checked slots stay on this device.</p></div>
      <div className="selection-tabs grid-selection" role="group" aria-label="Grid selection">{plan.grids.map((candidate,index)=><Button key={candidate.name} variant={gridIndex===index?"default":"outline"} aria-pressed={gridIndex===index} onClick={()=>select(teamIndex,index)}><span>{candidate.name}</span><small>{controlledStatus(candidate.tag)}</small></Button>)}</div>
      <div className="grid-context"><div><Badge className={`status-${controlledStatus(grid.tag).toLowerCase()}`}>{controlledStatus(grid.tag)}</Badge><h3>{grid.name}</h3></div><p>{grid.note}</p></div>
      <div className="weapon-grid">{slots.map((slot)=>{const progressId=weaponProgressId(plan,gridIndex,slot);const owned=!!values[progressId];const art=getWeaponAssetPath(slot.name);return <article className={`weapon-slot ${slot.index===0?"is-mainhand":""} ${owned?"is-owned":""}`} key={progressId}>
        <div className="weapon-art" style={art?{backgroundImage:`url("${art}")`}:undefined}><span>{slot.index===0?"Mainhand":`Slot ${slot.index+1}`}</span><Checkbox checked={owned} onCheckedChange={(checked)=>setComplete(progressId,checked===true)} aria-label={`Mark ${slot.name} slot ${slot.index+1} owned`}/></div>
        <strong>{slot.name}</strong><small>{slot.note}</small>
      </article>})}</div>
    </section>

    <section id="summons" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Summons</span><h2>Main, support, and sub slots</h2></div><p>The saved configuration is for unattended general Full Auto. One-turn setups may replace the sustain flex with only the call or passive required for the honors threshold.</p></div>
      <div className="summon-preset-list">{advice.summons.presets.map((preset)=><article className="summon-preset" key={preset.name}>
        <header><div><Badge>{preset.name}</Badge><h3>{preset.main} × {preset.support}</h3></div><span><b>Quick</b>{preset.quickSummon}</span></header>
        <div className="summon-slot-groups"><div><span className="section-kicker">Callable sub summons</span><ul>{preset.subSummons.map((summon)=><li key={summon}>{summon}</li>)}</ul></div><div><span className="section-kicker">Sub-aura-only</span><ul>{preset.subAuras.map((summon)=><li key={summon}>{summon}</li>)}</ul></div></div>
        <dl><div><dt>Flex rule</dt><dd>{preset.flex}</dd></div><div><dt>Why</dt><dd>{preset.note}</dd></div></dl>
      </article>)}</div>
      <div className="summon-notes">{advice.summons.notes.map((note)=><p key={note}>{note}</p>)}</div>
      <p className="source-note evidence-links">Reviewed {roadmapAdviceReviewedAt}. Evidence: {advice.summons.sources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ExternalLink aria-hidden="true"/></a>)}</p>
    </section>

    <section id="opus" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Dark Opus</span><h2>Pendulum guide</h2></div><p>Researched for Team A. Keep Normal Attack Cap on Ultima unless the note explicitly changes the cap split.</p></div>
      {plan.opus.map((opus)=><article className="definition-surface opus-guide" key={opus.team}><div className="definition-title"><Badge>Team A</Badge><strong>{opus.team}</strong></div><dl><div><dt>Second skill</dt><dd>{opus.cap}</dd></div><div><dt>Pendulum / chain</dt><dd>{opus.pendulum}</dd></div><div><dt>Lv210+</dt><dd>{opus.transcend}</dd></div></dl><p>{opus.note}</p></article>)}
    </section>

    {plan.mastery&&<section id="mastery" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Extended mastery</span><h2>Frontline LB priorities</h2></div><p>Ordered allocations for Team A’s current role, with dead or redundant nodes called out in the notes.</p></div>
      <div className="research-list">{plan.mastery.map((entry)=><article key={entry.name}><div className="research-name"><strong>{entry.name}</strong><Badge className="status-current"><Check aria-hidden="true"/> Reviewed</Badge></div><div><b>{entry.priority}</b><p>{entry.note}</p></div></article>)}</div>
    </section>}

    <section id="awakening" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Character awakening</span><h2>Frontline types</h2></div><p>Primary choices match Team A and its present grid; conditional survival or cap swaps remain in the note.</p></div>
      <div className="research-grid">{plan.awakenings.map((entry)=><article className="research-tile" key={entry.name}><div><strong>{entry.name}</strong><Badge className={`awakening-${entry.type.toLowerCase()}`}>{entry.type}</Badge></div><p>{entry.note}</p></article>)}</div>
    </section>

    <section id="rings" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Over mastery</span><h2>Ring + earring targets</h2></div><p>Ring ATK and HP are guaranteed, so only the three variable decisions are listed.</p></div>
      <aside className="inline-note"><strong>Perpetuity Ring is fixed</strong><span>EM star cap +10 · ATK +10% · HP +10% · DMG cap +5%. It stacks with the ordinary ring roll.</span></aside>
      <div className="research-grid ring-grid">{plan.overMastery.map((entry)=><article className="research-tile" key={entry.name}><strong>{entry.name}</strong><dl><div><dt>Ring 3</dt><dd>{entry.ring3}</dd></div><div><dt>Ring 4</dt><dd>{entry.ring4}</dd></div><div><dt>Earring</dt><dd>{entry.earring}</dd></div></dl><p>{entry.note}</p></article>)}</div>
      <p className="source-note">Targets were cross-checked against current Japanese character guides and <a href="https://gbf.wiki/Permanent_Mastery#Over_Mastery" target="_blank" rel="noreferrer">GBF Wiki roll ranges <ExternalLink aria-hidden="true"/></a>.</p>
    </section>

    {plan.artifacts&&<section id="artifacts" className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Artifacts</span><h2>2/3 starter bases</h2></div><p>Keep a base with the two highest-value core effects, then reroll the missing effect in its matching skill group.</p></div>
      <aside className="inline-note"><strong>Slot groups cannot move</strong><span>Group I: ATK, elemental ATK, or TA · Group II: damage cap · Group III: conditional effects. Payila and Gabriel also need two separate Water Staff artifacts.</span></aside>
      <div className="research-grid artifact-grid">{plan.artifacts.map((entry)=><article className="research-tile" key={entry.name}>
        <div><strong>{entry.name}</strong><Badge>{entry.weapon}</Badge></div>
        <dl><div><dt>Keep first</dt><dd>{entry.starter}</dd></div><div><dt>Alternative</dt><dd>{entry.alternative}</dd></div><div><dt>Ideal core</dt><dd>{entry.ideal}</dd></div><div><dt>Final reroll</dt><dd>{entry.reroll}</dd></div></dl>
        <p><strong>Avoid:</strong> {entry.avoid}</p><p>{entry.note}</p>
      </article>)}</div>
      <p className="source-note">Critical DMG Cap assumes the active Water grid reaches reliable critical. Until then, use N.A. DMG Cap on Payila and Octavia.</p>
    </section>}

    <section id="backline" className="content-section backline-section">
      <div className="section-heading"><div><span className="section-kicker">Backline</span><h2>Reserve plan</h2></div><p>Use this as a priority order, not a requirement to own every option immediately.</p></div>
      <ul>{plan.backline.map((item)=><li key={item}><Check aria-hidden="true"/><span>{item}</span></li>)}</ul>
    </section>
  </div>;
}
