export type ClassRoadmapSource = {
  label: string;
  publisher: string;
  url: string;
  scope: string;
};

export type ClassRoadmapStep = {
  rank: number;
  name: string;
  status: "Next" | "Foundation" | "Later" | "Specialist";
  role: string;
  accountUse: string;
  caution: string;
  sourceIds: string[];
};

export const CLASS_ROADMAP_REVIEWED_ON = "24 Aug 2026";

export const classRoadmapSources: Record<string, ClassRoadmapSource> = {
  unlock: {
    label: "Current recommended job route",
    publisher: "GameWith JP",
    url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/36694",
    scope: "Current Class V roles, prerequisites, and Full Auto/high-difficulty use.",
  },
  onmyoji: {
    label: "Onmyoji performance and prerequisites",
    publisher: "GameWith JP",
    url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/431304",
    scope: "Omen coverage, debuffs, multiple actions, Full Auto, and Chaos Ruler/Yamato prerequisites.",
  },
  fighter: {
    label: "Fighter Origin priority and examples",
    publisher: "GameWith JP",
    url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/512606",
    scope: "Origin unlock cost, cross-content value, and current Full Auto/high-difficulty examples.",
  },
  fireGw: {
    label: "2026 Fire 250HELL Full Auto classes",
    publisher: "GameWith JP",
    url: "https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/504243",
    scope: "Observed modern Full Auto use of Fighter Origin, Boogeyman, Kengo, Rising Force, and Lumberjack.",
  },
};

export const classRoadmapSteps: ClassRoadmapStep[] = [
  {
    rank: 1,
    name: "Paladin",
    status: "Next",
    role: "Unattended survival",
    accountUse: "The immediate post-Manadiver unlock. Damage caps, shields, cuts, and party mitigation help unfinished M3 grids finish fights that a damage class cannot yet survive.",
    caution: "Collect shields over time, but do not delay the unlock until the shield collection is perfect.",
    sourceIds: ["unlock"],
  },
  {
    rank: 2,
    name: "Yamato → Onmyoji",
    status: "Next",
    role: "V2 control and offensive Full Auto",
    accountUse: "Level Yamato as the prerequisite, then use Onmyoji as the destination. It covers debuff, hit-count, single-hit damage, dispel, delay, and action-denial requirements while retaining useful damage.",
    caution: "Yamato itself is strongest when omen responses are timed manually; it is an unlock bridge for this account rather than the saved general FA class.",
    sourceIds: ["unlock", "onmyoji"],
  },
  {
    rank: 3,
    name: "Panacea",
    status: "Foundation",
    role: "Healing and debuff recovery",
    accountUse: "Use when the characters and grid already deal enough damage but cannot stay alive unattended. Staff/staff emphasizes safety; spear combinations can retain more offensive pressure.",
    caution: "This is a problem-solving class, not a replacement for every element's primary damage team.",
    sourceIds: ["unlock"],
  },
  {
    rank: 4,
    name: "Boogeyman",
    status: "Later",
    role: "Modern HELL and long Full Auto",
    accountUse: "Adds practical debuffs, dispels, and hit counts for long event bosses. Unlock after the defensive foundation because its value is encounter-dependent.",
    caution: "Do not force it into every raid merely because recent 250HELL examples use it.",
    sourceIds: ["unlock", "fireGw"],
  },
  {
    rank: 5,
    name: "Fighter Origin",
    status: "Later",
    role: "Long-term damage ceiling",
    accountUse: "The first Origin destination. It is currently the broadest Origin investment across farming, Full Auto, and high difficulty, and it enables the future Dark Summer Catura shell.",
    caution: "Its materials, 30,000 JP, and level progression are expensive. Finish the accessible Class V tools before treating it as the next immediate unlock.",
    sourceIds: ["fighter", "fireGw"],
  },
  {
    rank: 6,
    name: "Mariachi",
    status: "Specialist",
    role: "FC and CA-oriented V2 fights",
    accountUse: "A later specialist for teams that can repeatedly generate charge attacks and Fatal Chains, especially when the encounter rewards FC-based omen handling.",
    caution: "Mainhand and companion harp requirements make it less universal than Paladin, Onmyoji, or Fighter Origin.",
    sourceIds: ["unlock"],
  },
];

export const maintainedClasses = [
  {
    name: "Kengo",
    rule: "Maintain, do not replace",
    note: "Stop after Water and Dark Kaneshige for now. Fire, Wind, and Light do have saved CA teams, but their current grids and primary Full Auto plans do not justify another CCW material cycle yet; Earth is even lower priority. Revisit one element only when its CA team becomes a frequently used preset with dedicated CA-cap support.",
  },
  {
    name: "Lumberjack",
    rule: "Cheap fallback",
    note: "Still useful before Paladin or Panacea when a good axe/harp and passive sustain are available, but no longer a major long-term investment target.",
  },
];

export const deprioritizedClasses = [
  { name: "King / Viking / Smarhihito", reason: "Short-fight, swap, or risk-oriented strengths do not match the current unattended objective." },
  { name: "Soldier / Tormentor", reason: "Their ceiling depends on bullet construction, consumables, or manual encounter control." },
  { name: "Lancer Origin / Wizard Origin", reason: "Later than Fighter Origin for this account; current ceiling examples are more weapon- and script-dependent." },
  { name: "Glorybringer / Wrestler / Relic Buster", reason: "Keep as setup-specific farming tools, not the next general Full Auto progression project." },
];
