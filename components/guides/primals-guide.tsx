import {ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {PRIMALS_REVIEWED_ON,primalSources,waterMainSummons,waterPrimalDecisions,waterPrimalModes,waterTransitionSteps} from "@/data/guides/primals";

export function PrimalsGuide(){
  return <article className="manadiver-guide">
    <header className="guide-page-header">
      <div><p className="guide-kicker">GUIDES / GRID PROGRESSION</p><h1>Primals</h1><p className="guide-deck">A growing account guide to entering Optimus grids without treating personal ownership as an automatic prerequisite. Water is the first researched element.</p></div>
      <dl className="guide-verification-summary"><div><dt>Elements covered</dt><dd>Water</dd></div><div><dt>Last checked</dt><dd>{PRIMALS_REVIEWED_ON}</dd></div></dl>
    </header>
    <nav className="guide-on-this-page" aria-label="On this page"><span>On this page</span><a href="#primal-rule">General rule</a><a href="#water-modes">Water modes</a><a href="#water-main">Main summons</a><a href="#water-transition">Transition</a><a href="#primal-sources">Sources</a></nav>
    <aside className="guide-correction"><strong>Water conclusion</strong><p>Do not make personal Varuna 250 the entry gate. Build the weapon package, use an owned route-defining main summon with support Varuna 250, and reserve personal Varuna for later double-sided durability, flexibility and its level-250 sub aura.</p></aside>

    <section id="primal-rule" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">DECISION RULE</p><h2>The grid package comes before the summon project</h2><p>A borrowed Optimus aura can activate the grid. Personal ownership matters when the second aura or the transcended summon itself contributes something the repeated encounter needs.</p></header>
      <div className="arcarum-gates">{waterPrimalDecisions.map((item,index)=><article key={item.question}><span>{String(index+1).padStart(2,"0")}</span><div><p>{item.question}</p><h3>{item.answer}</h3><small>{item.detail}</small></div></article>)}</div>
    </section>

    <section id="water-modes" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">WATER / VARUNA</p><h2>Choose the summon pair by encounter</h2><p>Single-sided Varuna is the practical entry. Double Varuna remains a real specialist and comfort configuration rather than an obsolete one.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Water grid modes</caption><thead><tr><th scope="col">Mode</th><th scope="col">Summons</th><th scope="col">Best use</th><th scope="col">Constraint</th></tr></thead><tbody>{waterPrimalModes.map((item)=><tr key={item.mode}><th scope="row">{item.mode}</th><td><p>{item.main}</p><small>Support: {item.support}</small></td><td>{item.best}</td><td>{item.cost}</td></tr>)}</tbody></table></div>
    </section>

    <section id="water-main" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">SINGLE-SIDED MAIN</p><h2>Providence summons are route tools</h2><p>These names explain the modern pattern, but the correct choice is the one whose aura or call the preset actually uses.</p></header>
      <div className="arcarum-summon-grid">{waterMainSummons.map((item)=><article key={item.name}><header><div><Badge>MAIN OPTION</Badge><h3>{item.name}</h3></div></header><p>{item.use}</p><small>{item.warning}</small></article>)}</div>
    </section>

    <section id="water-transition" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">ACCOUNT ROUTE</p><h2>Test before transcending Varuna</h2><p>This order protects Damascus bars and Optimus materials while still allowing the account to benefit from a finished Primal weapon package.</p></header>
      <ol className="arcarum-plan-list">{waterTransitionSteps.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{step}</strong></div></li>)}</ol>
    </section>

    <section id="primal-sources" className="guide-section guide-source-register"><h3>Source register</h3><ol>{Object.entries(primalSources).map(([id,source])=><li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true"/></a><span>{source.publisher}</span><p>{source.scope}</p></li>)}</ol></section>
  </article>;
}
