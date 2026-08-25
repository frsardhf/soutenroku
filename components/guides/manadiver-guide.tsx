import {
  MANADIVER_VERIFIED_ON,
  accountApplications,
  getManadiverEvidence,
  getManadiverSource,
  jpConfigurationChecks,
  manadiverEvidence,
  manadiverJobEmp,
  manadiverMechanics,
  manadiverPresets,
  manadiverSequences,
  manadiverSkillKinds,
  manadiverSources,
  manadiverStarter,
  manaturaRows,
  nicheManatura,
} from "@/data/guides/manadiver";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function EvidenceMarks({ ids }: { ids: string[] }) {
  return (
    <div className="guide-evidence-marks" aria-label="Evidence classification">
      {ids.map((id) => {
        const evidence = getManadiverEvidence(id);
        if (!evidence) return null;

        return (
          <a
            className={`guide-evidence-mark evidence-${evidence.kind
              .toLowerCase()
              .replaceAll(" ", "-")}`}
            href={`#evidence-${evidence.id}`}
            key={evidence.id}
            title={evidence.claim}
          >
            {evidence.kind}
            <span>{evidence.verifiedOn}</span>
          </a>
        );
      })}
    </div>
  );
}

function GuideSectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <header className="guide-section-heading">
      <p className="guide-kicker">{kicker}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export function ManadiverGuide() {
  return (
    <article className="manadiver-guide">
      <header className="guide-page-header">
        <div>
          <p className="guide-kicker">GUIDES / CLASS CONFIGURATION</p>
          <h1>Manadiver</h1>
          <p className="guide-deck">
            A practical short-battle starting point, the resource loop behind it, and the
            places where Soutenroku&apos;s saved teams intentionally do something different.
          </p>
        </div>
        <dl className="guide-verification-summary">
          <div>
            <dt>Account stage</dt>
            <dd>Magna II → Magna III</dd>
          </div>
          <div>
            <dt>Last checked</dt>
            <dd>{MANADIVER_VERIFIED_ON}</dd>
          </div>
        </dl>
      </header>

      <nav className="guide-on-this-page" aria-label="On this page">
        <span>On this page</span>
        <a href="#manadiver-default">Default</a>
        <a href="#manadiver-presets">Presets</a>
        <a href="#manadiver-loop">Action loop</a>
        <a href="#manadiver-manatura">Manatura</a>
        <a href="#manadiver-account">Your teams</a>
        <a href="#manadiver-emp">Job EMP</a>
        <a href="#manadiver-evidence">Evidence</a>
      </nav>

      <aside className="guide-correction" aria-label="Important scope note">
        <strong>Do not copy CA OFF to every element.</strong>
        <p>
          The starter below is a reusable short/easy pattern. Water Team A and Light Team
          A are saved as CA ON, Dark&apos;s primary team is Kengo CA ON, and several other
          teams use Manadiver for general Full Auto rather than a strict one-turn script.
        </p>
      </aside>

      <section id="manadiver-default" className="guide-section">
        <GuideSectionHeading
          kicker="START HERE"
          title="One generic starter, clearly scoped"
          description="Learn this loop first, then select the account-specific preset instead of treating it as a six-element law."
        />
        <article className="manadiver-starter">
          <header>
            <div>
              <span className="guide-status status-current">{manadiverStarter.label}</span>
              <h3>{manadiverStarter.title}</h3>
            </div>
            <strong className="guide-ca-setting">CA {manadiverStarter.chargeAttack}</strong>
          </header>
          <dl className="manadiver-loadout">
            <div>
              <dt>Fixed skill</dt>
              <dd>{manadiverStarter.fixedSkill}</dd>
            </div>
            <div>
              <dt>Extended Mastery Skills</dt>
              <dd>{manadiverStarter.extendedSkills.join(" + ")}</dd>
            </div>
            <div>
              <dt>Utility slot</dt>
              <dd>{manadiverStarter.utilitySkill}</dd>
            </div>
            <div>
              <dt>Manatura</dt>
              <dd>
                {manadiverStarter.manaturaNow} <span aria-hidden="true">→</span>{" "}
                {manadiverStarter.manaturaLater}
              </dd>
            </div>
          </dl>
          <p>{manadiverStarter.note}</p>
          <EvidenceMarks ids={manadiverStarter.evidenceIds} />
        </article>
      </section>

      <section id="manadiver-presets" className="guide-section">
        <GuideSectionHeading
          kicker="LOADOUT MATRIX"
          title="Choose by fight, not by habit"
          description="The utility slot, CA setting, and even the reason for using Manadiver change with the script."
        />
        <div className="guide-table-wrap">
          <table className="guide-table manadiver-preset-table">
            <caption>Recommended Manadiver loadout patterns</caption>
            <thead>
              <tr>
                <th scope="col">Preset</th>
                <th scope="col">CA</th>
                <th scope="col">Skills</th>
                <th scope="col">Manatura</th>
                <th scope="col">Use and limit</th>
              </tr>
            </thead>
            <tbody>
              {manadiverPresets.map((preset) => (
                <tr key={preset.id}>
                  <th scope="row">{preset.name}</th>
                  <td>
                    <span className="guide-ca-setting">{preset.chargeAttack}</span>
                  </td>
                  <td>
                    <ul className="guide-inline-list">
                      {preset.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{preset.manatura}</td>
                  <td>
                    <p>{preset.useWhen}</p>
                    <p className="guide-caution">{preset.caution}</p>
                    <EvidenceMarks ids={preset.evidenceIds} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="manadiver-loop" className="guide-section">
        <GuideSectionHeading
          kicker="ACTION ORDER"
          title="The short-loop decision is starting gauge"
          description="The extra Aether Siphon click is conditional; the sequence is not contradictory."
        />
        <ol className="manadiver-sequences">
          {manadiverSequences.map((sequence) => (
            <li key={sequence.id}>
              <article>
                <header>
                  <span className="guide-status status-conditional">IF</span>
                  <h3>{sequence.condition}</h3>
                </header>
                <ol className="action-sequence" aria-label={`Actions when ${sequence.condition}`}>
                  {sequence.steps.map((step, index) => (
                    <li key={step}>
                      <span>{index + 1}</span>
                      <strong>{step}</strong>
                    </li>
                  ))}
                </ol>
                <p>{sequence.result}</p>
                <EvidenceMarks ids={sequence.evidenceIds} />
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="guide-section">
        <GuideSectionHeading
          kicker="MECHANICS"
          title="Manadiver in plain language"
          description="Five concepts explain most configuration choices without memorizing every tooltip."
        />
        <dl className="manadiver-mechanics">
          {manadiverMechanics.map((mechanic) => (
            <div key={mechanic.term}>
              <dt>{mechanic.term}</dt>
              <dd>
                <p>{mechanic.summary}</p>
                <EvidenceMarks ids={mechanic.evidenceIds} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="manadiver-skill-taxonomy">
          <h3>Skills versus Job EMP</h3>
          <div className="guide-table-wrap">
            <table className="guide-table">
              <caption>What each configuration term means</caption>
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Examples</th>
                  <th scope="col">What it changes</th>
                </tr>
              </thead>
              <tbody>
                {manadiverSkillKinds.map((item) => (
                  <tr key={item.kind}>
                    <th scope="row">{item.kind}</th>
                    <td>{item.items}</td>
                    <td>{item.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <EvidenceMarks ids={["fixed-and-ems", "job-emp"]} />
        </div>
      </section>

      <section id="manadiver-manatura" className="guide-section">
        <GuideSectionHeading
          kicker="MANATURA"
          title="Start cheap; specialize after the grid"
          description="The table separates progression advice from advanced options without pretending every Manatura is interchangeable."
        />
        <div className="guide-table-wrap">
          <table className="guide-table manatura-table">
            <caption>Manatura shortlist for this account stage</caption>
            <thead>
              <tr>
                <th scope="col">Manatura</th>
                <th scope="col">Priority</th>
                <th scope="col">Bar cost</th>
                <th scope="col">Role</th>
                <th scope="col">Account guidance</th>
              </tr>
            </thead>
            <tbody>
              {manaturaRows.map((manatura) => (
                <tr key={manatura.name}>
                  <th scope="row">{manatura.name}</th>
                  <td>
                    <span
                      className={`guide-status status-${manatura.status.toLowerCase()}`}
                    >
                      {manatura.status}
                    </span>
                  </td>
                  <td>{manatura.barCost}</td>
                  <td>{manatura.role}</td>
                  <td>
                    <p>{manatura.guidance}</p>
                    <EvidenceMarks ids={manatura.evidenceIds} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="manatura-niches">
          <h3>Other Manatura: open only when a script needs them</h3>
          <Accordion type="multiple">
            {nicheManatura.map((item) => (
              <AccordionItem value={item.group} key={item.group}>
                <AccordionTrigger>
                  <span>{item.group}</span>
                  <strong>{item.names}</strong>
                </AccordionTrigger>
                <AccordionContent><p>{item.note}</p></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="manadiver-account" className="guide-section">
        <GuideSectionHeading
          kicker="SOUTENROKU APPLICATION"
          title="What changes in your six saved elements"
          description="Account inference is shown explicitly and kept separate from direct Japanese configuration evidence."
        />
        <div className="account-application-list">
          {accountApplications.map((item) => (
            <article className="account-application" key={item.element}>
              <header>
                <div>
                  <span className="guide-element-marker" data-element={item.element.toLowerCase()} />
                  <h3><Link href={`/roadmaps/${item.element.toLowerCase()}`} prefetch={false}>{item.element}</Link></h3>
                </div>
                <span className="guide-status status-target">{item.verdict}</span>
              </header>
              <dl>
                <div>
                  <dt>Saved team</dt>
                  <dd>{item.savedTeam}</dd>
                </div>
                <div>
                  <dt>Current state</dt>
                  <dd>{item.savedState}</dd>
                </div>
              </dl>
              <p>{item.recommendation}</p>
              <EvidenceMarks ids={item.evidenceIds} />
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section">
        <GuideSectionHeading
          kicker="JP CONFIGURATION CHECK"
          title="Positive and negative evidence"
          description="A checked source choosing a different class is recorded instead of being rewritten as a Manadiver recommendation."
        />
        <div className="guide-table-wrap">
          <table className="guide-table jp-config-table">
            <caption>Element comparison from the checked December 2025 Japanese configuration source</caption>
            <thead>
              <tr>
                <th scope="col">Element</th>
                <th scope="col">Class in source</th>
                <th scope="col">Configuration</th>
                <th scope="col">Script note</th>
                <th scope="col">Conclusion</th>
              </tr>
            </thead>
            <tbody>
              {jpConfigurationChecks.map((item) => (
                <tr key={item.element}>
                  <th scope="row">{item.element}</th>
                  <td>{item.classChoice}</td>
                  <td>{item.configuration}</td>
                  <td>{item.script}</td>
                  <td>
                    <strong>{item.conclusion}</strong>
                    <EvidenceMarks ids={item.evidenceIds} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="manadiver-emp" className="guide-section">
        <GuideSectionHeading
          kicker="JOB EMP"
          title="Permanent priorities after unlock"
          description="Buy the damage core first, then add accuracy or durability for the actual Full Auto job."
        />
        <article className="job-emp-plan">
          <dl>
            <div>
              <dt>Short priority</dt>
              <dd>{manadiverJobEmp.short.join(" → ")}</dd>
            </div>
            <div>
              <dt>Conditional</dt>
              <dd>{manadiverJobEmp.conditional.join(" · ")}</dd>
            </div>
            <div>
              <dt>Longer Full Auto</dt>
              <dd>{manadiverJobEmp.longerFights.join(" · ")}</dd>
            </div>
          </dl>
          <p>{manadiverJobEmp.note}</p>
          <EvidenceMarks ids={manadiverJobEmp.evidenceIds} />
        </article>
      </section>

      <section id="manadiver-evidence" className="guide-section guide-evidence-ledger">
        <GuideSectionHeading
          kicker="EVIDENCE LEDGER"
          title="What each label actually supports"
          description="Mechanics, observed Japanese configurations, and account-level inference are intentionally different claim types."
        />
        <div className="evidence-ledger-list">
          {manadiverEvidence.map((evidence) => (
            <article id={`evidence-${evidence.id}`} key={evidence.id}>
              <header>
                <span
                  className={`guide-evidence-mark evidence-${evidence.kind
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {evidence.kind}
                </span>
                <time>{evidence.verifiedOn}</time>
              </header>
              <p>{evidence.claim}</p>
              {evidence.sourceIds.length > 0 ? (
                <ul className="evidence-source-links">
                  {evidence.sourceIds.map((sourceId) => {
                    const source = getManadiverSource(sourceId);
                    if (!source) return null;

                    return (
                      <li key={source.id}>
                        <a href={source.url} target="_blank" rel="noreferrer">
                          {source.publisher}: {source.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="guide-source-note">Derived from the saved Soutenroku plan.</p>
              )}
            </article>
          ))}
        </div>

        <footer className="guide-source-register">
          <h3>Source register</h3>
          <ol>
            {manadiverSources.map((source) => (
              <li key={source.id}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
                <span>{source.publisher}</span>
                <p>{source.scope}</p>
              </li>
            ))}
          </ol>
        </footer>
      </section>
    </article>
  );
}

export default ManadiverGuide;
