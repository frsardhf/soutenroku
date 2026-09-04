import {ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {ETERNALS_REVIEWED_ON,ETERNALS_VERSION,eternalOrder,eternalPlans,eternalRules,eternalSources} from "@/data/guides/eternals";

export function EternalsGuide(){
  return <article className="manadiver-guide arcarum-guide">
    <header className="guide-page-header">
      <div><p className="guide-kicker">GUIDES / ACCOUNT PROGRESSION</p><h1>Eternal plans</h1><p className="guide-deck">A conservative account plan that treats 4★ as valid, 5★ as the normal functional endpoint, and transcendence as a specialist investment rather than mandatory progression.</p></div>
      <dl className="guide-verification-summary"><div><dt>Plan version</dt><dd>{ETERNALS_VERSION}</dd></div><div><dt>Last checked</dt><dd>{ETERNALS_REVIEWED_ON}</dd></div></dl>
    </header>
    <nav className="guide-on-this-page" aria-label="On this page"><span>On this page</span><a href="#eternal-policy">Policy</a><a href="#eternal-ten">All ten</a><a href="#eternal-order">Account order</a><a href="#eternal-sources">Sources</a></nav>
    <aside className="guide-correction"><strong>Working plan · revisit later</strong><p>Haaselia remains ahead of every Eternal transcendence project. No Eternal is automatically taken beyond 5★; Seox is excluded by preference, and Siete 150 is reserved for a future V2 requirement.</p></aside>

    <section id="eternal-policy" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">INVESTMENT POLICY</p><h2>Stop where the account gets the value</h2><p>Recruitment, final uncap and transcendence solve different problems. A higher endpoint is not automatically a better use of scarce materials.</p></header>
      <div className="arcarum-gates">{eternalRules.map((item,index)=><article key={item.title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><small>{item.detail}</small></div></article>)}</div>
    </section>

    <section id="eternal-ten" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">TEN INDIVIDUAL STOPS</p><h2>Recruit, final, or specialize</h2><p>The last column is the account decision. The other columns preserve why the lower endpoints remain valid if priorities change later.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Eternal progression plan v1.0</caption><thead><tr><th scope="col">Eternal</th><th scope="col">4★ base</th><th scope="col">5★ final</th><th scope="col">Transcendence</th><th scope="col">Account plan</th></tr></thead><tbody>{eternalPlans.map((item)=><tr key={item.name}><th scope="row">{item.name}<br/><Badge>{item.element}</Badge></th><td>{item.base}</td><td>{item.final}</td><td>{item.transcendence}</td><td><strong>{item.accountPlan}</strong></td></tr>)}</tbody></table></div>
    </section>

    <section id="eternal-order" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">ACCOUNT ORDER</p><h2>Only open one material sink at a time</h2><p>This queue protects Haaselia and preserves blue papers until a team has a defined breakpoint.</p></header>
      <ol className="arcarum-plan-list">{eternalOrder.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{step}</strong></div></li>)}</ol>
    </section>

    <section id="eternal-sources" className="guide-section guide-source-register"><h3>Source register</h3><ol>{Object.entries(eternalSources).map(([id,source])=><li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true"/></a><span>{source.publisher}</span><p>{source.scope}</p></li>)}</ol></section>
  </article>;
}
