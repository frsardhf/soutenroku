import {ExternalLink} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {ARCARUM_REVIEWED_ON,arcarumDecisionGates,arcarumSources,arcarumSummons,baseBacklineSummary} from "@/data/guides/arcarum";

const elementClass=(element:string)=>`arcarum-element arcarum-${element.toLowerCase()}`;

export function ArcarumGuide(){
  return <article className="manadiver-guide arcarum-guide">
    <header className="guide-page-header">
      <div><p className="guide-kicker">GUIDES / ACCOUNT PROGRESSION</p><h1>Arcarum path</h1><p className="guide-deck">A provisional route for the six damage summons, Haaselia’s first major uncap, and the account checks that determine every Evoker investment after that.</p></div>
      <dl className="guide-verification-summary"><div><dt>Current recruits</dt><dd>Caim · Haaselia</dd></div><div><dt>Last checked</dt><dd>{ARCARUM_REVIEWED_ON}</dd></div></dl>
    </header>
    <nav className="guide-on-this-page" aria-label="On this page"><span>On this page</span><a href="#arcarum-plan">Current plan</a><a href="#arcarum-six">Six summons</a><a href="#arcarum-gates">After Haaselia</a><a href="#arcarum-base">Base backline</a><a href="#arcarum-sources">Sources</a></nav>
    <aside className="guide-correction"><strong>Working plan · revisit later</strong><p>Raise The Sun, The Moon, The Hanged Man, Judgement, The Star and Death to 4★ for the 10% superior-element damage sub-aura. In parallel, make Haaselia the first 5★ Evoker project. Do not wait for all ten recruits before uncapping her.</p></aside>

    <section id="arcarum-plan" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">ORDER OF OPERATIONS</p><h2>Broad summon value, one focused Evoker</h2><p>The summon goal and character goal are related but not identical. Build the six broadly useful sub-auras while concentrating scarce Evoker materials on one proven upgrade.</p></header>
      <ol className="arcarum-plan-list">
        <li><span>01</span><div><strong>Complete the six 4★ damage summons</strong><p>Their sub-aura rises from 7% to 10% superior-element damage. This is not ordinary damage-cap up, although it can increase damage beyond the normal capped result.</p></div></li>
        <li><span>02</span><div><strong>Prepare Haaselia 5★ and fourth skill in parallel</strong><p>She is the first concentrated character investment for general Water, Full Auto and charge-attack teams.</p></div></li>
        <li><span>03</span><div><strong>Protect Magna III progression</strong><p>If Eternity Sands are still gating essential Magna summons, collect Haaselia’s materials without forcing the NWF weapon step ahead of the account’s wider grid foundation.</p></div></li>
        <li><span>04</span><div><strong>Use account needs—not completion count—for the next Evolite</strong><p>After Haaselia, choose the next recruit or uncap from the decision gates below. All ten Evokers remain a completion goal, not the next power breakpoint.</p></div></li>
      </ol>
    </section>

    <section id="arcarum-six" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">SIX DAMAGE ROUTES</p><h2>Target all six at 4★</h2><p>Caim and Haaselia already cover Earth and Water. The remaining summon projects are Fire, Wind, Light and Dark; recruiting their Evokers is a separate decision.</p></header>
      <div className="arcarum-summon-grid">{arcarumSummons.map((item)=><article key={item.element}><header><i className={elementClass(item.element)} aria-hidden="true"/><div><span>{item.element}</span><h3>{item.summon}</h3></div><Badge className={item.state==="Recruited"?"status-current":"status-next"}>{item.state}</Badge></header><dl><div><dt>Evoker</dt><dd>{item.evoker}</dd></div></dl><p>{item.note}</p></article>)}</div>
    </section>

    <section id="arcarum-gates" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">AFTER HAASELIA</p><h2>Let the next bottleneck decide</h2><p>These are triggers, not another fixed queue. Choose the first condition that is actually affecting a saved team or repeated farm.</p></header>
      <div className="arcarum-gates">{arcarumDecisionGates.map((item,index)=><article key={item.trigger}><span>{String(index+1).padStart(2,"0")}</span><div><p>{item.trigger}</p><h3>{item.action}</h3><small>{item.reason}</small></div></article>)}</div>
    </section>

    <section id="arcarum-base" className="guide-section">
      <header className="guide-section-heading"><p className="guide-kicker">BASE REVERSE POSITION</p><h2>What works immediately from the backline</h2><p>This prevents a level-95 upgrade from being mistaken for a recruitment-level passive. Geisenborger, for example, gains offensive cap stacking only after 5★.</p></header>
      <div className="guide-table-wrap"><table className="guide-table"><caption>Notable base Evoker backline effects</caption><thead><tr><th scope="col">Evoker</th><th scope="col">Base sub-ally value</th><th scope="col">Use</th></tr></thead><tbody>{baseBacklineSummary.map((item)=><tr key={item.name}><th scope="row">{item.name}</th><td><p>{item.value}</p></td><td><Badge>{item.rating}</Badge></td></tr>)}</tbody></table></div>
    </section>

    <section id="arcarum-sources" className="guide-section guide-source-register"><h3>Source register</h3><ol>{Object.entries(arcarumSources).map(([id,source])=><li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink aria-hidden="true"/></a><span>{source.publisher}</span><p>{source.scope}</p></li>)}</ol></section>
  </article>;
}
