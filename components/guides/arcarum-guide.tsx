import {ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {ARCARUM_REVIEWED_ON,ARCARUM_VERSION,arcarumDecisionGates,arcarumSources,arcarumSummons,arcarumTranscendenceNotes,baseBacklineSummary,evokerMaterialTotals,femaleEvokerOrder} from "@/data/guides/arcarum";

const elementClass=(element:string)=>`arcarum-element arcarum-${element.toLowerCase()}`;

export function ArcarumGuide(){
  return <article className="manadiver-guide arcarum-guide">
    <header className="guide-page-header">
      <div><p className="guide-kicker">GUIDES / ACCOUNT PROGRESSION</p><h1>Arcarum path</h1><p className="guide-deck">A female-only Evoker investment queue, the six damage summons, and the material gates behind each concentrated 5★ route.</p></div>
      <dl className="guide-verification-summary"><div><dt>Plan version</dt><dd>{ARCARUM_VERSION}</dd></div><div><dt>Last checked</dt><dd>{ARCARUM_REVIEWED_ON}</dd></div></dl>
    </header>
    <nav className="guide-on-this-page" aria-label="On this page"><span>On this page</span><a href="#arcarum-plan">Female queue</a><a href="#arcarum-six">Six summons</a><a href="#arcarum-gates">Project gates</a><a href="#arcarum-materials">Materials</a><a href="#arcarum-transcendence">Transcendence</a><a href="#arcarum-base">Backline</a><a href="#arcarum-sources">Sources</a></nav>
    <aside className="guide-correction"><strong>Active female-only route</strong><p>Haaselia → Fraux → Nier → Maria Theresa. Recruitment may use genuinely spare Evolite before the prior 5★ is complete, but major materials stay concentrated on one active project.</p></aside>

    <section id="arcarum-plan" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">ORDER OF OPERATIONS</p><h2>One fixed queue, one major sink at a time</h2><p>The account values the women first. This personal sequence overrides generic aggregate tier-list order while retaining each character’s actual role.</p></header>
      <ol className="arcarum-plan-list">{femaleEvokerOrder.map((item,index)=><li key={item.name}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{item.name} · {item.summon}</strong><p>{item.element} · {item.target}. {item.reason}</p></div></li>)}</ol>
    </section>

    <section id="arcarum-six" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">SIX DAMAGE ROUTES</p><h2>Target all six at 4★</h2><p>Caim and Haaselia already cover Earth and Water. The remaining summon projects are Fire, Wind, Light and Dark; recruiting their Evokers is a separate decision.</p></header>
      <div className="arcarum-summon-grid">{arcarumSummons.map((item)=><article key={item.element}><header><i className={elementClass(item.element)} aria-hidden="true"/><div><span>{item.element}</span><h3>{item.summon}</h3></div><Badge className={item.state==="Recruited"?"status-current":"status-next"}>{item.state}</Badge></header><dl><div><dt>Evoker</dt><dd>{item.evoker}</dd></div></dl><p>{item.note}</p></article>)}</div>
    </section>

    <section id="arcarum-gates" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">PROJECT GATES</p><h2>Keep the fixed order without blocking recruitment</h2><p>These gates distinguish spending a spare Evolite from diverting the Veritas, Ideas, quartz and sands belonging to the active 5★ project.</p></header>
      <div className="arcarum-gates">{arcarumDecisionGates.map((item,index)=><article key={item.trigger}><span>{String(index+1).padStart(2,"0")}</span><div><p>{item.trigger}</p><h3>{item.action}</h3><small>{item.reason}</small></div></article>)}</div>
    </section>

    <section id="arcarum-materials" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">SANDBOX MATERIAL GATES</p><h2>Typical Domain plus Foundation 5★ totals</h2><p>Approximate one-Evoker route totals. For Haaselia, prioritize Moon Veritas and Moon Ideas while combining Mundus five-gauge enemies with Sephira boxes.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Approximate materials for one concentrated Evoker route</caption><thead><tr><th scope="col">Material</th><th scope="col">Amount</th><th scope="col">Planning note</th></tr></thead><tbody>{evokerMaterialTotals.map((item)=><tr key={item.material}><th scope="row">{item.material}</th><td><strong>{item.amount}</strong></td><td>{item.note}</td></tr>)}</tbody></table></div>
      <aside className="guide-correction"><strong>Xeno Lucky Loot</strong><p>Choose Sephira Evolite while this female-only route is active. Use Xeno Cocytus Militis or Xeno Vohu Manah Militis—whichever clears faster. Gold Brick or Lapis Merit becomes preferable only after Evolite stops being the recruitment bottleneck.</p></aside>
    </section>

    <section id="arcarum-transcendence" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">2026 STATUS</p><h2>Evoker Transcendence releases</h2><p>Separate older 5★ tier-list rankings from the newer Transcendence kits.</p></header>
      <ol className="arcarum-plan-list">{arcarumTranscendenceNotes.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{item}</strong></div></li>)}</ol>
    </section>

    <section id="arcarum-base" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">BASE REVERSE POSITION</p><h2>What works immediately from the backline</h2><p>This prevents a level-95 upgrade from being mistaken for a recruitment-level passive. Geisenborger, for example, gains offensive cap stacking only after 5★.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Notable base Evoker backline effects</caption><thead><tr><th scope="col">Evoker</th><th scope="col">Base sub-ally value</th><th scope="col">Use</th></tr></thead><tbody>{baseBacklineSummary.map((item)=><tr key={item.name}><th scope="row">{item.name}</th><td><p>{item.value}</p></td><td><Badge>{item.rating}</Badge></td></tr>)}</tbody></table></div>
    </section>

    <section id="arcarum-sources" className="guide-section guide-source-register"><h3>Source register</h3><ol>{Object.entries(arcarumSources).map(([id,source])=><li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true"/></a><span>{source.publisher}</span><p>{source.scope}</p></li>)}</ol></section>
  </article>;
}
