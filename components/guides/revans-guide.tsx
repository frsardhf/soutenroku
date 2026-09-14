import {ArrowRight,ShieldCheck} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {revansRaidIds,revansRaids,revansReviewedAt} from "@/data/guides/revans";

export function RevansGuide(){
  return <div className="page-stack revans-page">
    <header className="page-header">
      <div><p className="breadcrumb"><span>Raids</span></p><h1>Revans raids</h1><p className="page-intro">Account-specific entry paths separated by host preparation, rescue contribution, and full-clear expectations.</p></div>
      <dl className="stage-summary"><dt>Reviewed {revansReviewedAt}</dt><dd>Diaspora → Seofon</dd></dl>
    </header>

    <aside className="guide-correction"><strong>Read the activity label first</strong><p>“Full Auto” alone is not enough information. A host-preparation team, a blue-chest rescue team, and a solo-clear team can use different characters, settings, and stopping points.</p></aside>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Account order</span><h2>Where to invest next</h2></div><p>Diaspora is already accessible through the Earth CA-100 handoff. The remaining order follows current roster overlap rather than a universal raid difficulty list.</p></div>
      <div className="revans-overview-grid">{revansRaidIds.map((id,index)=>{const raid=revansRaids[id];return <a href={`/raids/revans/${id}`} className="revans-overview-card" style={{"--raid-color":raid.color} as React.CSSProperties} key={id}>
        <div className="revans-rank">{String(index+1).padStart(2,"0")}</div>
        <div><span>{raid.playerElement} advantage · {raid.bossElement} boss</span><h2>{raid.name}</h2><p>{raid.recommendation}</p><div><Badge>{raid.priority}</Badge><small>{raid.readiness}</small></div></div>
        <ArrowRight aria-hidden="true"/>
      </a>})}</div>
    </section>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Reading rule</span><h2>Evidence labels</h2></div></div>
      <div className="revans-evidence-key"><article><ShieldCheck/><strong>Verified</strong><p>A composition or operating pattern shown directly by a cited Japanese guide.</p></article><article><ShieldCheck/><strong>Account test</strong><p>An owned-roster adaptation supported mechanically but not published as the exact lineup.</p></article><article><ShieldCheck/><strong>Later</strong><p>A validated destination that still requires missing characters, classes, weapons, or uncaps.</p></article></div>
    </section>
  </div>;
}
