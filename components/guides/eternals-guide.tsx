import {ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {ETERNALS_REVIEWED_ON,ETERNALS_VERSION,eternalFiveStarMaterialGroups,eternalMaterialAssumption,eternalMaterialRupies,eternalMaterialSummary,eternalOrder,eternalPlans,eternalRules,eternalSources,tienTranscendenceStages,type EternalMaterial} from "@/data/guides/eternals";

function MaterialIcon({item}:{item:EternalMaterial}){
  const label=`${item.name}: ${item.amount}${item.note?`. ${item.note}`:""}`;
  return <div className="eternal-material-icon" role="img" aria-label={label} title={label}>
    <div className="eternal-material-frame">
      {/* Remote item art is already delivered as tiny, optimized inventory icons. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {item.icon?<img src={item.icon} alt="" loading="lazy"/>:<span aria-hidden="true">{item.name.split(/[-\s]/).map((part)=>part[0]).join("").slice(0,3)}</span>}
      <strong>{item.amount}</strong>
    </div>
    <span className="eternal-material-tooltip" aria-hidden="true">{item.name}</span>
  </div>;
}

function MaterialGrid({items}:{items:readonly EternalMaterial[]}){
  return <div className="eternal-material-grid">{items.map((item,index)=><MaterialIcon key={`${item.name}-${index}`} item={item}/>)}</div>;
}

export function EternalsGuide(){
  return <article className="manadiver-guide arcarum-guide">
    <header className="guide-page-header">
      <div><p className="guide-kicker">GUIDES / ACCOUNT PROGRESSION</p><h1>Eternal plans</h1><p className="guide-deck">A conservative account plan that treats 4★ as valid, 5★ as the normal functional endpoint, and transcendence as a specialist investment rather than mandatory progression.</p></div>
      <dl className="guide-verification-summary"><div><dt>Plan version</dt><dd>{ETERNALS_VERSION}</dd></div><div><dt>Last checked</dt><dd>{ETERNALS_REVIEWED_ON}</dd></div></dl>
    </header>
    <nav className="guide-on-this-page" aria-label="On this page"><span>On this page</span><a href="#eternal-policy">Policy</a><a href="#eternal-ten">All ten</a><a href="#eternal-materials">Tien 150 materials</a><a href="#eternal-order">Account order</a><a href="#eternal-sources">Sources</a></nav>
    <aside className="guide-correction"><strong>Active account policy</strong><p>Only female Eternals receive planned Transcendence investment. Male Eternals stay at base 4★ unless Tien is taken past Lv130: her Lv140 gate requires all ten Eternals at 5★. Seox remains excluded from personal Dark teams either way.</p></aside>

    <section id="eternal-policy" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">INVESTMENT POLICY</p><h2>Stop where the account gets the value</h2><p>Recruitment, final uncap and transcendence solve different problems. A higher endpoint is not automatically a better use of scarce materials.</p></header>
      <div className="arcarum-gates">{eternalRules.map((item,index)=><article key={item.title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><small>{item.detail}</small></div></article>)}</div>
    </section>

    <section id="eternal-ten" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">TEN INDIVIDUAL STOPS</p><h2>Recruit, final, or specialize</h2><p>The last column is the account decision. The other columns preserve why the lower endpoints remain valid if priorities change later.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Eternal progression plan v1.0</caption><thead><tr><th scope="col">Eternal</th><th scope="col">4★ base</th><th scope="col">5★ final</th><th scope="col">Transcendence</th><th scope="col">Account plan</th></tr></thead><tbody>{eternalPlans.map((item)=><tr key={item.name}><th scope="row">{item.name}<br/><Badge>{item.element}</Badge></th><td>{item.base}</td><td>{item.final}</td><td>{item.transcendence}</td><td><strong>{item.accountPlan}</strong></td></tr>)}</tbody></table></div>
    </section>

    <section id="eternal-materials" className="guide-section">
      <header className="guide-section-heading"><div><p className="guide-kicker">TIEN LEVEL 150 CHECKLIST</p><h2>All-ten 5★ gate and Tien additions</h2></div><p>Compact icon grids keep the full material plan scannable. The quantity is printed on the icon; hover an item for its name and any counting note.</p></header>
      <aside className="eternal-material-warning"><strong>Decision point: Lv140</strong><p>Tien can reach Lv130 while the male Eternals remain 4★. Advancing her to Lv140 or 150 changes the plan because all ten Eternals must first be 5★.</p></aside>
      <div className="eternal-material-totals">
        <div><span>All-ten 5★ rupies</span><strong>{eternalMaterialRupies.fiveStar}</strong></div>
        <div><span>Tien Lv110–150 rupies</span><strong>{eternalMaterialRupies.tien}</strong></div>
        <div><span>Combined rupies</span><strong>{eternalMaterialRupies.total}</strong></div>
      </div>
      <article className="eternal-material-summary"><header><div><p className="guide-kicker">COMBINED HEADLINE TOTALS</p><h3>Starting from all ten recruited at 4★</h3></div><small>{eternalMaterialAssumption}</small></header><MaterialGrid items={eternalMaterialSummary}/></article>

      <div className="eternal-material-section-heading"><div><p className="guide-kicker">A. ALL TEN TO 5★</p><h3>Shared and element-specific pools</h3></div><p>These grids are the prerequisite block for Tien Lv140. Flex pools depend on which elements you choose while changing Revenant weapons.</p></div>
      <div className="eternal-material-groups">{eternalFiveStarMaterialGroups.map((group)=><article key={group.title} className="eternal-material-group"><header><h4>{group.title}</h4><p>{group.detail}</p></header><MaterialGrid items={group.items}/></article>)}</div>

      <div className="eternal-material-section-heading"><div><p className="guide-kicker">B. TIEN TRANSCENDENCE</p><h3>Additional cost by level gate</h3></div><p>Stage costs below are added on top of Tien’s own 5★ share already included in the all-ten block.</p></div>
      <div className="eternal-tien-stages">{tienTranscendenceStages.map((stage)=><article key={stage.level} className="eternal-tien-stage"><header><span>LV {stage.level}</span><div><h4>{stage.title}</h4><p>{stage.detail}</p></div></header><MaterialGrid items={stage.items}/>{stage.subnote&&<p className="eternal-material-subnote">{stage.subnote}</p>}</article>)}</div>
    </section>

    <section id="eternal-order" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">ACCOUNT ORDER</p><h2>Female-only transcendence queue</h2><p>This queue protects the active Evoker project and stops each Eternal where the account receives the intended value.</p></header>
      <ol className="arcarum-plan-list">{eternalOrder.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{step}</strong></div></li>)}</ol>
    </section>

    <section id="eternal-sources" className="guide-section guide-source-register"><h3>Source register</h3><ol>{Object.entries(eternalSources).map(([id,source])=><li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true"/></a><span>{source.publisher}</span><p>{source.scope}</p></li>)}</ol></section>
  </article>;
}
