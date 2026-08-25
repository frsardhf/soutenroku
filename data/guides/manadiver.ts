export type ManadiverEvidenceKind =
  | "Mechanics"
  | "JP configuration"
  | "Account inference";

export type ManadiverEvidence = {
  id: string;
  kind: ManadiverEvidenceKind;
  claim: string;
  sourceIds: string[];
  verifiedOn: string;
};

export type ManadiverSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  scope: string;
};

export type EvidenceBacked = {
  evidenceIds: string[];
};

export const MANADIVER_VERIFIED_ON = "24 Aug 2026";

export const manadiverSources: ManadiverSource[] = [
  {
    id: "gbf-wiki-manadiver",
    title: "Manadiver",
    publisher: "GBF Wiki",
    url: "https://gbf.wiki/Manadiver",
    scope: "Class skills, Manatura triggers, charge-bar costs, and unlock mechanics.",
  },
  {
    id: "kamigame-manadiver",
    title: "Manadiver class guide",
    publisher: "Kamigame",
    url: "https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%B8%E3%83%A7%E3%83%96/%E3%83%9E%E3%83%8A%E3%83%80%E3%82%A4%E3%83%90%E3%83%BC.html",
    scope: "Japanese skill, EMP, and Manatura recommendations.",
  },
  {
    id: "yahoo-manadiver",
    title: "Community Manadiver skill discussion",
    publisher: "Yahoo! Chiebukuro",
    url: "https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11327179946",
    scope: "Community context for practical skill selection rather than a fixed universal loadout.",
  },
  {
    id: "fc2-2025-12-configs",
    title: "December 2025 element-by-element battle configurations",
    publisher: "Aokusukitoru3ytn (FC2)",
    url: "https://aokusukitoru3ytn.blog.fc2.com/blog-entry-5670.html",
    scope: "Concrete Japanese Fire, Water, Wind, and Light scripts and their class choices.",
  },
];

export const manadiverEvidence: ManadiverEvidence[] = [
  {
    id: "fixed-and-ems",
    kind: "Mechanics",
    claim:
      "Aether Siphon is the fixed class skill; Secret Triad, Wild Magica, and Overtrance are Manadiver Extended Mastery Skills, while utility such as Miserable Mist occupies the remaining configurable slot.",
    sourceIds: ["gbf-wiki-manadiver", "kamigame-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "short-sequence",
    kind: "Mechanics",
    claim:
      "Secret Triad supplies 30% charge bar, fills three enemy charge diamonds, and grants one crest; Wild Magica consumes 50% charge bar for double strike, so Aether Siphon is inserted when the MC does not begin with enough gauge.",
    sourceIds: ["gbf-wiki-manadiver", "kamigame-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "ca-off-loop",
    kind: "Mechanics",
    claim:
      "CA OFF does not disable Manatura: the MC's normal attacks can refill charge bar and the Manatura follow-up consumes it after the qualifying attack.",
    sourceIds: ["gbf-wiki-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "overtrance-timing",
    kind: "Mechanics",
    claim:
      "Overtrance has a turn-4-or-later activation condition and a three-turn initial lockout, so it belongs to multi-turn routing rather than a strict first-turn setup.",
    sourceIds: ["gbf-wiki-manadiver", "fc2-2025-12-configs"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "starter-manatura",
    kind: "Mechanics",
    claim:
      "Leviathan and Ouroboros are the relevant 30%-bar general-damage options; Ouroboros costs an Eternity Sand, making Leviathan the sensible transition-stage default.",
    sourceIds: ["gbf-wiki-manadiver", "kamigame-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "manatura-shortlist",
    kind: "Mechanics",
    claim:
      "The official Manatura table lists Dark Rapture and Lu Woh at 30% charge bar, while Agastia and Mini Mimic show no charge-bar cost; their effects remain script-specific.",
    sourceIds: ["gbf-wiki-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "jp-fire",
    kind: "JP configuration",
    claim:
      "The checked Fire short setup uses Secret Triad, Miserable Mist, Wild Magica, and Ouroboros, then scripts The Sun, Triad, Zeta skill 1, Percival skill 3, and attack.",
    sourceIds: ["fc2-2025-12-configs"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "jp-wind",
    kind: "JP configuration",
    claim:
      "The checked Wind setup opens with Wild Magica, Secret Triad, Miserable Mist, and Ouroboros, then switches charge attacks ON for the continuing Full Auto turns.",
    sourceIds: ["fc2-2025-12-configs"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "jp-light",
    kind: "JP configuration",
    claim:
      "The checked Light short setup uses Secret Triad, Wild Magica, and Distream.",
    sourceIds: ["fc2-2025-12-configs"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "jp-water",
    kind: "JP configuration",
    claim:
      "The checked Water setup uses Splitting Spirit, Secret Triad, and Overtrance; because Overtrance cannot activate on turn 1, this is explicitly a multi-turn script.",
    sourceIds: ["fc2-2025-12-configs", "gbf-wiki-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "jp-negative-cases",
    kind: "JP configuration",
    claim:
      "The checked strict Earth short example uses Glorybringer, while the checked top Dark short examples use Apsaras or Fighter Origin rather than Manadiver.",
    sourceIds: ["fc2-2025-12-configs"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "account-team-state",
    kind: "Account inference",
    claim:
      "Skylog's current saved teams mix CA settings and classes; the generic CA-OFF starter therefore cannot be copied across every element without changing each team's intended behavior.",
    sourceIds: [],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "job-emp",
    kind: "JP configuration",
    claim:
      "Short-battle priorities are damage cap, skill-damage cap, ATK, and TA; debuff success matters when Miserable Mist must land, while longer Full Auto can spend further points on durability.",
    sourceIds: ["kamigame-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
  {
    id: "community-context",
    kind: "JP configuration",
    claim:
      "Japanese community advice treats the open utility slot and Manatura choice as encounter-dependent rather than prescribing one immutable loadout.",
    sourceIds: ["yahoo-manadiver", "kamigame-manadiver"],
    verifiedOn: MANADIVER_VERIFIED_ON,
  },
];

export const manadiverStarter = {
  label: "Generic starting point",
  title: "CA OFF short / easy Full Auto",
  chargeAttack: "OFF",
  fixedSkill: "Aether Siphon",
  extendedSkills: ["Secret Triad", "Wild Magica"],
  utilitySkill: "Miserable Mist",
  manaturaNow: "Leviathan",
  manaturaLater: "Ouroboros",
  note:
    "Use this to learn the class loop, not as a claim that every saved Skylog team should run CA OFF. Keep Leviathan while moving from M2 to M3; Ouroboros is a later damage upgrade after an Eternity Sand is genuinely affordable.",
  evidenceIds: ["fixed-and-ems", "short-sequence", "starter-manatura"],
} satisfies EvidenceBacked & Record<string, unknown>;

export const manadiverPresets = [
  {
    id: "short-easy",
    name: "Short / easy FA",
    chargeAttack: "OFF",
    skills: ["Aether Siphon", "Secret Triad", "Wild Magica", "Miserable Mist"],
    manatura: "Leviathan now · Ouroboros later",
    useWhen: "The party needs its own DEF Down and the goal is a fast normal-attack opening.",
    caution: "A starting-gauge shortage changes the action order; see the sequence below.",
    evidenceIds: ["fixed-and-ems", "short-sequence", "ca-off-loop"],
  },
  {
    id: "def-covered",
    name: "DEF Down already covered",
    chargeAttack: "OFF",
    skills: ["Aether Siphon", "Secret Triad", "Wild Magica", "Distream"],
    manatura: "Leviathan now · Ouroboros later",
    useWhen: "Summons, allies, or raid debuffs already cover DEF Down consistently.",
    caution: "Do not remove Miserable Mist merely because another player might apply debuffs.",
    evidenceIds: ["jp-light", "ca-off-loop"],
  },
  {
    id: "general-fa",
    name: "General Full Auto",
    chargeAttack: "TEAM-DEPENDENT",
    skills: ["Aether Siphon", "Two encounter-relevant EMS", "Debuff, dispel, or sustain flex"],
    manatura: "Choose for the fight, not only the damage ceiling",
    useWhen: "The fight lasts beyond the opening turn or survival and utility decide success.",
    caution: "There is no evidence-backed universal three-skill preset for every element and boss.",
    evidenceIds: ["account-team-state", "community-context"],
  },
  {
    id: "water-falsehood",
    name: "Water Falsehood / Overtrance",
    chargeAttack: "SETUP-DEPENDENT",
    skills: ["Aether Siphon", "Splitting Spirit", "Secret Triad", "Overtrance"],
    manatura: "Match the tested Water script",
    useWhen: "Running a deliberately scripted, multi-turn Falsehood setup.",
    caution: "Not a 1T preset: Overtrance only becomes usable from turn 4 after its lockout.",
    evidenceIds: ["jp-water", "overtrance-timing"],
  },
] satisfies Array<EvidenceBacked & Record<string, unknown>>;

export const manadiverSequences = [
  {
    id: "gauge-ready",
    condition: "Enough starting charge bar",
    steps: ["Secret Triad", "Wild Magica", "Attack"],
    result: "Triad supplies crests and gauge; Wild spends the gauge to grant double strike.",
    evidenceIds: ["short-sequence"],
  },
  {
    id: "zero-gauge",
    condition: "Starting from 0% charge bar",
    steps: ["Secret Triad", "Aether Siphon", "Wild Magica", "Attack"],
    result: "Aether Siphon bridges the remaining gauge requirement before Wild Magica.",
    evidenceIds: ["short-sequence"],
  },
  {
    id: "ct-blocked",
    condition: "Charge diamonds cannot be filled or drained",
    steps: ["Use Splitting Spirit as the gauge fallback", "Continue the tested team script"],
    result: "Treat this as an encounter-specific replacement, not the generic default.",
    evidenceIds: ["short-sequence", "jp-water"],
  },
] satisfies Array<EvidenceBacked & Record<string, unknown>>;

export const manadiverMechanics = [
  {
    term: "Crests",
    summary:
      "Secret Triad grants one elemental crest while filling three enemy charge diamonds. That crest is part of the setup resource, not a reason by itself to force a crest-focused party.",
    evidenceIds: ["short-sequence"],
  },
  {
    term: "Charge bar",
    summary:
      "Wild Magica needs 50% charge bar. Secret Triad contributes 30%, and Aether Siphon fills the gap when starting gauge is absent.",
    evidenceIds: ["short-sequence"],
  },
  {
    term: "CA OFF",
    summary:
      "This prevents charge attacks; it does not stop normal attacks from rebuilding bar or Manatura from consuming that resource after its qualifying trigger.",
    evidenceIds: ["ca-off-loop"],
  },
  {
    term: "Double strike",
    summary:
      "Wild Magica converts charge bar into a second normal-attack sequence, which is why it anchors the short CA-OFF pattern.",
    evidenceIds: ["short-sequence"],
  },
  {
    term: "Manatura",
    summary:
      "Think of it as an equipped automatic follow-up with its own trigger, effect, and bar cost. Pick one for the script you are actually running, then verify the bar flow in the battle log.",
    evidenceIds: ["ca-off-loop", "starter-manatura"],
  },
] satisfies Array<EvidenceBacked & Record<string, unknown>>;

export const manadiverSkillKinds = [
  {
    kind: "Fixed class skill",
    items: "Aether Siphon",
    explanation: "Always present; it is not one of the configurable EMS choices.",
  },
  {
    kind: "Manadiver EMS",
    items: "Secret Triad · Wild Magica · Overtrance",
    explanation:
      "Equipped active skills unlocked through class mastery. Short setups usually spend the available Manadiver-specific slots on Triad and Wild; Overtrance is for later turns.",
  },
  {
    kind: "Shared / utility skill",
    items: "Miserable Mist · Distream · Splitting Spirit",
    explanation:
      "The flexible slot that supplies the encounter's missing debuff, extra hit, or gauge tool.",
  },
  {
    kind: "Permanent Job EMP",
    items: "Damage Cap · Skill DMG Cap · ATK · TA · Debuff Success · durability",
    explanation:
      "Passive nodes bought with EMP. They are not buttons and do not consume a subskill slot.",
  },
] as const;

export const manaturaRows = [
  {
    name: "Leviathan",
    status: "START",
    barCost: "30%",
    role: "Accessible general-damage baseline",
    guidance: "Use now during the M2 → M3 transition; it teaches the bar loop without a Sand commitment.",
    evidenceIds: ["starter-manatura"],
  },
  {
    name: "Ouroboros",
    status: "LATER",
    barCost: "30%",
    role: "Higher-damage short-battle option",
    guidance: "Appears in the checked Fire and Wind scripts, but costs one Eternity Sand. Upgrade only after the account can justify that scarcity.",
    evidenceIds: ["starter-manatura", "jp-fire", "jp-wind"],
  },
  {
    name: "Agastia",
    status: "CONDITIONAL",
    barCost: "No listed cost",
    role: "Advanced encounter option",
    guidance: "Evaluate after the relevant advanced content is comfortable; it is not the transition-roadmap baseline.",
    evidenceIds: ["manatura-shortlist"],
  },
  {
    name: "Dark Rapture",
    status: "CONDITIONAL",
    barCost: "30%",
    role: "Advanced / high-difficulty option",
    guidance: "Build around its actual trigger and effect; do not substitute it into the short preset by name alone.",
    evidenceIds: ["manatura-shortlist"],
  },
  {
    name: "Lu Woh",
    status: "CONDITIONAL",
    barCost: "30%",
    role: "Fight-specific utility",
    guidance: "Choose only when its utility solves the encounter more reliably than the generic damage choices.",
    evidenceIds: ["manatura-shortlist"],
  },
  {
    name: "Mini Mimic",
    status: "NICHE",
    barCost: "No listed cost",
    role: "Utility / farming specialist",
    guidance: "Keep as a specialist tool, not the default recommendation for frontline damage progression.",
    evidenceIds: ["manatura-shortlist"],
  },
] satisfies Array<EvidenceBacked & Record<string, unknown>>;

export const nicheManatura = [
  {
    group: "Elemental alternatives",
    names: "Europa · Wilnas · Yggdrasil",
    note:
      "Treat these as element- or encounter-specific tools. Compare their exact trigger and effect with Leviathan/Ouroboros in the intended team before investing around them.",
  },
  {
    group: "Script specialists",
    names: "Qilin · Bahamut",
    note:
      "Potentially useful in a deliberately tested burst or setup script, but not proof that Manadiver is the best class for that element's fastest route.",
  },
  {
    group: "Collection and utility",
    names: "Coco · Mimi · other situational Manatura",
    note:
      "Keep for their specific utility or collection value. They do not replace the Leviathan-now, Ouroboros-later progression recommendation.",
  },
] as const;

export const accountApplications = [
  {
    element: "Fire",
    savedTeam: "Team A · Grand Zeta general FA",
    savedState: "Manadiver · CA setting is encounter-dependent",
    recommendation:
      "Keep it as a general-FA class. The checked JP Fire short script validates Triad + Mist + Wild + Ouroboros as a separate burst preset, not as the only way to run this team.",
    verdict: "TEST SHORT PRESET",
    evidenceIds: ["jp-fire", "account-team-state"],
  },
  {
    element: "Water",
    savedTeam: "Team A · Payila normal team",
    savedState: "CA ON · Manadiver later",
    recommendation:
      "Do not overwrite the saved CA-ON plan with the generic CA-OFF starter. Treat Falsehood with Splitting Spirit + Triad + Overtrance as a separate scripted multi-turn variant.",
    verdict: "KEEP CA ON",
    evidenceIds: ["jp-water", "overtrance-timing", "account-team-state"],
  },
  {
    element: "Earth",
    savedTeam: "Team A · Sabrina fast normal",
    savedState: "Manadiver · short FA",
    recommendation:
      "The current roadmap can keep Manadiver as an account-fit choice, but label it as inference: the checked strict JP short example used Glorybringer, not Manadiver.",
    verdict: "ACCOUNT FIT",
    evidenceIds: ["jp-negative-cases", "account-team-state"],
  },
  {
    element: "Wind",
    savedTeam: "Team A · Grand Narmaya fast normal",
    savedState: "Manadiver · fast FA",
    recommendation:
      "The checked JP configuration validates the Wild + Triad + Mist opener with Ouroboros, but it turns CA ON afterward. Treat that as support for the opening package, not a permanent CA-OFF setting; start with Leviathan until the Sand cost is justified.",
    verdict: "OPENING MATCH",
    evidenceIds: ["jp-wind", "starter-manatura", "account-team-state"],
  },
  {
    element: "Light",
    savedTeam: "Team A · Summer Payila general FA",
    savedState: "CA ON · stronger current account element",
    recommendation:
      "Keep CA ON for the saved general team. Make the checked Triad + Wild + Distream CA-OFF setup an explicit fast/easy variant rather than silently changing Team A.",
    verdict: "ADD VARIANT",
    evidenceIds: ["jp-light", "account-team-state"],
  },
  {
    element: "Dark",
    savedTeam: "Primary Kengo team · Manadiver Team B",
    savedState: "Primary Kengo CA ON · Team B Manadiver CA ON skill/crest",
    recommendation:
      "Leave Kengo as primary and preserve the CA-ON Manadiver alternative. The checked top short examples used other classes, so a generic CA-OFF conversion is not supported for this account.",
    verdict: "DO NOT CONVERT",
    evidenceIds: ["jp-negative-cases", "account-team-state"],
  },
] satisfies Array<EvidenceBacked & Record<string, unknown>>;

export const jpConfigurationChecks = [
  {
    element: "Fire",
    classChoice: "Manadiver",
    configuration: "Secret Triad · Miserable Mist · Wild Magica · Ouroboros",
    script: "The Sun → Triad → Grand Zeta 1 → Grand Percival 3 → attack",
    conclusion: "Direct short-setup support",
    evidenceIds: ["jp-fire"],
  },
  {
    element: "Water",
    classChoice: "Manadiver",
    configuration: "Splitting Spirit · Secret Triad · Overtrance",
    script: "Multi-turn; Overtrance cannot be a turn-1 button",
    conclusion: "Supports a specialist route, not 1T",
    evidenceIds: ["jp-water", "overtrance-timing"],
  },
  {
    element: "Earth",
    classChoice: "Glorybringer in the checked strict-short example",
    configuration: "No matching Manadiver proof from this source",
    script: "Keep the Skylog Manadiver plan labeled as account inference",
    conclusion: "Negative evidence matters",
    evidenceIds: ["jp-negative-cases"],
  },
  {
    element: "Wind",
    classChoice: "Manadiver",
    configuration: "Wild Magica · Secret Triad · Miserable Mist · Ouroboros",
    script: "Opening package, then CA ON for the continuing Full Auto",
    conclusion: "Skill-package support; CA setting is not permanently OFF",
    evidenceIds: ["jp-wind"],
  },
  {
    element: "Light",
    classChoice: "Manadiver",
    configuration: "Secret Triad · Wild Magica · Distream",
    script: "CA-OFF fast/easy variant",
    conclusion: "Variant support; not the saved CA-ON general plan",
    evidenceIds: ["jp-light", "account-team-state"],
  },
  {
    element: "Dark",
    classChoice: "Apsaras / Fighter Origin in the checked top short examples",
    configuration: "No matching top-short Manadiver proof from this source",
    script: "Retain Kengo primary and account-specific Manadiver alternative",
    conclusion: "Do not force class parity",
    evidenceIds: ["jp-negative-cases", "account-team-state"],
  },
] satisfies Array<EvidenceBacked & Record<string, unknown>>;

export const manadiverJobEmp = {
  short: ["Damage Cap", "Skill DMG Cap", "ATK", "Triple Attack"],
  conditional: ["Debuff Success when Miserable Mist must land"],
  longerFights: ["HP", "Defense and other durability nodes after the damage core"],
  note:
    "These are permanent class EMP nodes. They do not replace Aether Siphon or consume any active-skill slot.",
  evidenceIds: ["job-emp", "fixed-and-ems"],
} satisfies EvidenceBacked & Record<string, unknown>;

export function getManadiverEvidence(id: string) {
  return manadiverEvidence.find((item) => item.id === id);
}

export function getManadiverSource(id: string) {
  return manadiverSources.find((item) => item.id === id);
}
