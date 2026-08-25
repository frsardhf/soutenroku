import {ExternalLink} from "lucide-react";
import {
  CLASS_ROADMAP_REVIEWED_ON,
  classRoadmapSources,
  classRoadmapSteps,
  deprioritizedClasses,
  maintainedClasses,
} from "@/data/guides/class-roadmap";
import {Badge} from "@/components/ui/badge";

const statusClass = (status:string) => ({Next:"status-next",Foundation:"status-current",Later:"status-conditional",Specialist:"status-target"}[status] ?? "");

export function ClassRoadmapGuide(){
  return <article className="manadiver-guide class-roadmap-guide">
    <header className="guide-page-header">
      <div><p className="guide-kicker">GUIDES / ACCOUNT PROGRESSION</p><h1>After Manadiver</h1><p className="guide-deck">A class unlock order for unattended and low-intervention play—from an unfinished Magna III grid to future high-level Full Auto.</p></div>
      <dl className="guide-verification-summary"><div><dt>Account stage</dt><dd>Magna II → Magna III</dd></div><div><dt>Last checked</dt><dd>{CLASS_ROADMAP_REVIEWED_ON}</dd></div></dl>
    </header>

    <nav className="guide-on-this-page" aria-label="On this page"><span>On this page</span><a href="#class-order">Unlock order</a><a href="#class-maintain">Keep active</a><a href="#class-skip">Deprioritize</a><a href="#class-sources">Sources</a></nav>

    <aside className="guide-correction"><strong>Recommended route</strong><p>Manadiver → Paladin → Yamato → Onmyoji → Panacea → Boogeyman → Fighter Origin. Kengo remains a maintained parallel class rather than an obsolete step.</p></aside>

    <section id="class-order" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">UNLOCK ORDER</p><h2>Survive first, then raise the ceiling</h2><p>The order values a run that finishes unattended. A class rated highly for manual racing does not automatically enter this queue.</p></header>
      <ol className="class-roadmap-list">
        {classRoadmapSteps.map((step)=><li key={step.name}><span className="class-rank">{String(step.rank).padStart(2,"0")}</span><article><header><div><Badge className={statusClass(step.status)}>{step.status}</Badge><h3>{step.name}</h3></div><strong>{step.role}</strong></header><p>{step.accountUse}</p><aside><b>Boundary</b>{step.caution}</aside><div className="evidence-links">{step.sourceIds.map((id)=>{const source=classRoadmapSources[id];return <a href={source.url} target="_blank" rel="noreferrer" key={id}>{source.publisher}<ExternalLink aria-hidden="true"/></a>})}</div></article></li>)}
      </ol>
    </section>

    <section id="class-maintain" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">PARALLEL FOUNDATION</p><h2>Keep these available</h2><p>Unlock progression is not a deletion queue. Existing tools remain useful when their damage model matches the team.</p></header>
      <div className="class-support-grid">{maintainedClasses.map((item)=><article key={item.name}><Badge>{item.rule}</Badge><h3>{item.name}</h3><p>{item.note}</p></article>)}</div>
    </section>

    <section id="class-skip" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">NOT NOW</p><h2>Useful classes outside your priority</h2><p>These are not bad jobs. Their strongest use asks for manual routing, special weapons, consumables, or a narrower farming objective.</p></header>
      <dl className="class-deprioritized">{deprioritizedClasses.map((item)=><div key={item.name}><dt>{item.name}</dt><dd>{item.reason}</dd></div>)}</dl>
    </section>

    <section id="class-sources" className="guide-section guide-source-register"><h3>Source register</h3><ol>{Object.entries(classRoadmapSources).map(([id,source])=><li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a><span>{source.publisher}</span><p>{source.scope}</p></li>)}</ol></section>
  </article>;
}
