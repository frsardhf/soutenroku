import {ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {PRIMALS_REVIEWED_ON,elementalStoneOrder,premiumSummonSeries,primalSources,providenceStoneOrder,waterMainSummons,waterPrimalDecisions,waterPrimalModes,waterStoneQueue,waterTransitionSteps} from "@/data/guides/primals";

export function PrimalsGuide(){
  return <article className="guide-page">
    <header className="guide-page-header">
      <div><p className="guide-kicker">GUIDES / GRID PROGRESSION</p><h1>Primals</h1><p className="guide-deck">An account-focused Optimus transition and Sunlight Stone guide. Summon strength and stone efficiency are kept separate so permanent ticket targets do not consume scarce stones by default.</p></div>
      <dl className="guide-verification-summary"><div><dt>Grid focus</dt><dd>Water</dd></div><div><dt>Last checked</dt><dd>{PRIMALS_REVIEWED_ON}</dd></div></dl>
    </header>
    <nav className="guide-on-this-page" aria-label="On this page"><span>On this page</span><a href="#stone-rules">Stone rules</a><a href="#providence-order">Providence</a><a href="#elemental-order">Elemental</a><a href="#series-order">Series</a><a href="#water-modes">Water</a><a href="#primal-sources">Sources</a></nav>
    <aside className="guide-correction"><strong>Stone conclusion</strong><p>Complete universal unticketable summons first. An Optimus summon becomes a priority only after its weapon package exists; Acies, Robur and Crest are permanent projects for Surprise Tickets and duplicates, even when their finished effects are powerful.</p></aside>

    <section id="stone-rules" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">RESOURCE RULES</p><h2>Spend for an immediate completed job</h2><p>Do not feed isolated stones into an unfinished summon. Hold enough to reach the breakpoint, verify the team will use it now, and farm later uncap materials instead of substituting another Sunlight Stone.</p></header>
      <div className="arcarum-gates">
        <article><span>01</span><div><p>Unfinished uncaps</p><h3>Finish at once</h3><small>Natural duplicates or a new priority can arrive before 3★. Commit only when the meaningful uncap can be completed immediately.</small></div></article>
        <article><span>02</span><div><p>Strength versus efficiency</p><h3>Keep them separate</h3><small>A strong permanent summon can still be a poor stone target because Surprise Tickets can finish it.</small></div></article>
        <article><span>03</span><div><p>Primal transition</p><h3>Weapons first</h3><small>Borrow the Optimus aura and test the grid before investing in a personal summon and its transcendence.</small></div></article>
      </div>
    </section>

    <section id="providence-order" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">UNIVERSAL ORDER</p><h2>Providence for this account</h2><p>This sequence favors unattended Full Auto and progression into V2 and Revans. Yatima and Versusia move upward only after the account starts building deliberate short manual routes.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Account Providence Sunlight Stone order</caption><thead><tr><th scope="col">Order</th><th scope="col">Summon</th><th scope="col">Verdict</th><th scope="col">Why it matters</th><th scope="col">Commit gate</th></tr></thead><tbody>{providenceStoneOrder.map((item)=><tr key={item.name}><td>{item.rank}</td><th scope="row">{item.name}</th><td><strong>{item.verdict}</strong></td><td>{item.use}</td><td>{item.gate}</td></tr>)}</tbody></table></div>
    </section>

    <section id="elemental-order" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">AFTER PROVIDENCE</p><h2>Build one element, not six wish lists</h2><p>Once universal projects are handled, spend around an actual primal transition. Primarch is stable across Magna and primal; Six Dragon becomes much more valuable after normal weapon skills form the grid.</p></header>
      <ol className="arcarum-plan-list">{elementalStoneOrder.map((item)=><li key={item.rank}><span>{item.rank}</span><div><strong>{item.target}</strong><p>{item.value}</p><small>{item.rule}</small></div></li>)}</ol>
    </section>

    <section id="series-order" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">PERMANENT SERIES</p><h2>Acies &gt; Robur &gt; Crest</h2><p>This is an ownership order, not permission to stone them. Acies is still incomplete, Robur is the short-fight alternative to Belial, and Crest remains a dedicated engine rather than a generic slot.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Permanent elemental summon series</caption><thead><tr><th scope="col">Series</th><th scope="col">Release state</th><th scope="col">Effect</th><th scope="col">Best use</th><th scope="col">Acquisition rule</th></tr></thead><tbody>{premiumSummonSeries.map((item)=><tr key={item.series}><th scope="row">{item.series}<small>{item.maximum} maximum</small></th><td>{item.state}</td><td>{item.effect}</td><td>{item.best}</td><td>{item.acquire}</td></tr>)}</tbody></table></div>
      <aside className="guide-correction"><strong>Acies status</strong><p>Only Lodern (Fire skill damage) and Bastet (Light normal attacks) are released. The series does not share one fixed sub-aura template, so the future Water, Earth, Wind and Dark effects must not be guessed.</p></aside>
    </section>

    <section id="primal-rule" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">DECISION RULE</p><h2>The grid package comes before the summon project</h2><p>A borrowed Optimus aura can activate the grid. Personal ownership matters when the second aura or the transcended summon itself contributes something the repeated encounter needs.</p></header>
      <div className="arcarum-gates">{waterPrimalDecisions.map((item,index)=><article key={item.question}><span>{String(index+1).padStart(2,"0")}</span><div><p>{item.question}</p><h3>{item.answer}</h3><small>{item.detail}</small></div></article>)}</div>
    </section>

    <section id="water-modes" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">WATER / VARUNA</p><h2>Choose the summon pair by encounter</h2><p>Single-sided Varuna is the practical entry. Double Varuna remains a real specialist and comfort configuration rather than an obsolete one.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Water grid modes</caption><thead><tr><th scope="col">Mode</th><th scope="col">Summons</th><th scope="col">Best use</th><th scope="col">Constraint</th></tr></thead><tbody>{waterPrimalModes.map((item)=><tr key={item.mode}><th scope="row">{item.mode}</th><td><p>{item.main}</p><small>Support: {item.support}</small></td><td>{item.best}</td><td>{item.cost}</td></tr>)}</tbody></table></div>
    </section>

    <section id="water-stones" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">WATER STONE QUEUE</p><h2>Varuna does not start the queue</h2><p>The current account remains Magna III until the premium weapon package is coherent. Gabriel and Wamdus become elemental priorities only around the real Varuna transition.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Water summon investment queue</caption><thead><tr><th scope="col">Account stage</th><th scope="col">Order</th><th scope="col">Decision</th></tr></thead><tbody>{waterStoneQueue.map((item)=><tr key={item.stage}><th scope="row">{item.stage}</th><td><strong>{item.order}</strong></td><td>{item.note}</td></tr>)}</tbody></table></div>
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
