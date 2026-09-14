/* eslint-disable @next/next/no-html-link-for-pages */

import {ArrowLeft,ArrowRight,Check,ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {revansReviewedAt,type RevansRaid} from "@/data/guides/revans";

export function RevansDetail({raid}:{raid:RevansRaid}){
  return <div className="page-stack revans-page" style={{"--raid-color":raid.color} as React.CSSProperties}>
    <header className="page-header">
      <div><p className="breadcrumb"><a href="/raids/revans">Revans raids</a><span>/</span><span>{raid.name}</span></p><h1>{raid.name}</h1><p className="page-intro">Use {raid.playerElement} against this {raid.bossElement} raid. {raid.mechanic}</p></div>
      <dl className="stage-summary"><dt>{raid.priority}</dt><dd>{raid.readiness}</dd></dl>
    </header>

    <div className="revans-route-links"><a className="revans-back" href="/raids/revans"><ArrowLeft aria-hidden="true"/>All Revans raids</a><a className="revans-roadmap-link" href={`/roadmaps/${raid.playerElement.toLowerCase()}`}>Open {raid.playerElement} team and grid<ArrowRight aria-hidden="true"/></a></div>
    <aside className="guide-correction"><strong>Account recommendation</strong><p>{raid.recommendation}</p></aside>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Presets</span><h2>Activity-specific teams</h2></div><p>Published reference teams and owned-roster adaptations are deliberately labelled differently.</p></div>
      <div className="revans-preset-list">{raid.presets.map((preset)=><article className="revans-preset" key={preset.title}>
        <header><div><Badge>{preset.purpose}</Badge><h3>{preset.title}</h3></div><span className={`revans-confidence is-${preset.confidence.toLowerCase().replace(" ","-")}`}>{preset.confidence}</span></header>
        <div className="revans-preset-columns">
          <div><span className="section-kicker">Lineup</span><ol className="revans-lineup">{preset.team.map((member,index)=><li key={member}><span>{index<4?index===0?"MC":String(index):"SUB"}</span><strong>{member}</strong></li>)}</ol></div>
          <div><span className="section-kicker">Settings</span><ul>{preset.settings.map((item)=><li key={item}><Check aria-hidden="true"/>{item}</li>)}</ul><span className="section-kicker revans-requirements-label">Requirements</span><ul>{preset.requirements.map((item)=><li key={item}><Check aria-hidden="true"/>{item}</li>)}</ul></div>
        </div>
        <div className="revans-operation"><span className="section-kicker">Operating notes</span><ol>{preset.operation.map((step,index)=><li key={step}><span>{index+1}</span><p>{step}</p></li>)}</ol></div>
      </article>)}</div>
    </section>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Damage axes</span><h2>What actually fits</h2></div><p>These are raid-specific judgments, not generic element team ratings.</p></div>
      <div className="revans-axis-grid"><article><strong>Normal attack</strong><p>{raid.axes.normal}</p></article><article><strong>Charge attack</strong><p>{raid.axes.ca}</p></article><article><strong>Skill damage</strong><p>{raid.axes.skill}</p></article></div>
    </section>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Research · reviewed {revansReviewedAt}</span><h2>Japanese sources</h2></div><p>Use the scope notes to distinguish mechanics references from practical composition reports.</p></div>
      <div className="revans-source-list">{raid.sources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}><div><strong>{source.label}</strong><p>{source.scope}</p></div><ExternalLink aria-hidden="true"/></a>)}</div>
    </section>
  </div>;
}
