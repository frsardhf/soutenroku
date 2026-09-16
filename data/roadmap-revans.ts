import type { Grid, Plan } from "./roadmaps";

type PlanTeam = Plan["teams"][number];
type ElementRevision = {
  current?: string;
  replaceTeam?: { index: number; team: PlanTeam };
  replaceGrid?: { index: number; grid: Grid };
  replaceOpus?: { index: number; opus: Plan["opus"][number] };
  teams?: PlanTeam[];
  grids: Grid[];
  priorities?: string[];
};

const guide = (raid: string, label: string) => ({
  href: `/raids/revans/${raid}`,
  label,
});

const revisions: Record<string, ElementRevision> = {
  fire: {
    teams: [
      {
        name: "Seofon readiness test",
        mode: "SELF-HOST TEST · CA OFF",
        note: "This is the owned-account bridge toward the published Percival / Ragazzo rescue route. Test on self-hosts and confirm 4m honors before using it publicly; Ragazzo's timed exit makes this a short contribution team, not a durable solo shell.",
        units: [
          { name: "Grand Zeta", role: "Frontline · damage", id: "3040499000" },
          { name: "Michael", role: "Frontline · utility", id: "3040440000" },
          {
            name: "Ragazzo",
            role: "Frontline · short-route DPS",
            id: "3040481000",
          },
          {
            name: "Alanaan",
            role: "Backline · burst option",
            id: "3040167000",
          },
          {
            name: "Fraux",
            role: "Backline · future sustain",
            id: "3040161000",
          },
        ],
        mc: {
          className: "Manadiver",
          ca: "OFF",
          mainhand: "Exo Maitrah Karuna · Attack awakening",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "Full Auto ON and Full Guard OFF for the short test. Grand Percival replaces frontline Michael in the verified modern rescue upgrade, then Michael moves behind the frontline. A defensive high-HP host route remains the safer choice when testing beyond Ragazzo's window.",
        },
        guide: guide("seofon", "Open the Seofon host and rescue boundary"),
      },
    ],
    grids: [
      {
        name: "Seofon durability test",
        tag: "CONDITIONAL",
        note: "Account test built from the existing M3 shell. The Draconic Harp and extra HP slot are deliberate concessions to self-host survival; this is not the faster published Percival/Ragazzo rescue grid.",
        weapons: [
          ["MH", "Exo Maitrah Karuna", "Manadiver · Attack awakening"],
          ["×3", "Colossus Cane Ira", "M3 boost + cap"],
          ["×1", "Colossus Bomber Ira", "Skill supplemental"],
          ["×1", "Nilakantha", "Stamina + HP"],
          ["×1", "Draconic Harp", "Wind damage reduction"],
          ["×1", "Sol Remnant", "EX + TA echo"],
          ["×1", "Sword of Valorblaze", "Seraphic until Ultima key"],
          ["×1", "Ancient Ecke Sachs", "HP + critical"],
          ["×1", "Ultima Spear", "Additional slot · cap + seraphic"],
          ["×1", "Heat of The Sun", "Additional slot + cap"],
          ["×1", "Spear of Bahamut Coda", "Additional slot + ATK / HP"],
        ],
      },
    ],
    priorities: ["Validate Seofon self-host honors and 10% survival"],
  },
  water: {
    teams: [
      {
        name: "Mugen entry · Wamdus CA",
        mode: "SEMI-FA · CA ON",
        note: "This is the accessible owned route, but it is not zero-intervention. Alternate Wamdus charge-attack and Fated Chain mitigation, and manually call a fire-cut summon for Giant Ban after 70%.",
        units: [
          {
            name: "Grand Yatima",
            role: "Frontline · utility",
            id: "3040566000",
          },
          { name: "Wamdus", role: "Frontline · mitigation", id: "3040419000" },
          {
            name: "Grand Sylvia",
            role: "Frontline · CA sustain",
            id: "3040613000",
          },
          {
            name: "Haaselia",
            role: "Backline · 5★ skill 4 target",
            id: "3040168000",
          },
          {
            name: "Grand Gabriel",
            role: "Backline · Primarch",
            id: "3040492000",
          },
        ],
        mc: {
          className: "Kengo",
          ca: "ON",
          mainhand: "Unsigned Kaneshige · Water · Devilry",
          skills: [
            "One with the Blade",
            "No More Doubt",
            "Unfettered Mind",
            "Miserable Mist",
          ],
          note: "Full Auto ON, Full Guard OFF. Quick summon Car.On or a fire Carbuncle. Routine unattended farming comes later with 5★ Haaselia and a proven Paladin shell; the owned team remains semi-FA.",
        },
        guide: guide("mugen", "Open the Mugen survival and intervention guide"),
      },
    ],
    grids: [
      {
        name: "Mugen entry CA",
        tag: "CONDITIONAL",
        note: "Farmable Magna CA/HP shell derived from the published Kengo entry route. Begin with zero to two Defense Schrodingers, keep the four Ancient Auberons for HP, and do not confuse this with the later Hraes normal-rescue grid.",
        weapons: [
          ["MH", "Unsigned Kaneshige", "Water · Devilry emblem"],
          ["×2", "Schrodinger", "Defense awakening target"],
          ["×1", "Tyros Zither", "CA damage + cap"],
          ["×4", "Ancient Auberon", "HP + critical"],
          ["×1", "Colomba", "CA damage + HP"],
          ["×1", "Draconic Buster", "Fire damage reduction"],
          ["×1", "Staff of Bahamut Coda", "Additional slot · race ATK + HP"],
          ["×1", "Ultima Blade", "Additional slot · CA cap + seraphic"],
          ["×1", "Reflection of The Moon", "Additional slot + cap"],
        ],
      },
    ],
    priorities: [
      "Finish Haaselia 5★ skill 4 before routine Mugen FA",
      "Defense-awaken the first two Schrodingers",
    ],
  },
  earth: {
    grids: [
      {
        name: "Diaspora all-unique CA",
        tag: "SPECIALIST",
        note: "All thirteen weapon names are different so Caim's reverse-position passive remains active. This no-Okto CA-100 host shell follows the published farmable Magna layout, with the M3 Arbos sword replacing its older Yggdrasil sword slot. Stop at the 97-hit omen and request backup.",
        weapons: [
          ["MH", "Unsigned Kaneshige", "Earth · Devilry emblem"],
          ["×1", "Yggdrasil Crystal Blade Arbos", "M3 boost + cap"],
          ["×1", "Nibelung Klinge", "HP + attack"],
          ["×1", "Nibelung Horn", "Stamina + critical"],
          ["×1", "Ancient Perseus", "Attack + CA support"],
          ["×1", "Galleon's Jaw", "CA supplemental"],
          ["×1", "Ished", "Attack awakening"],
          ["×1", "Baihu Claw Malus", "General damage cap"],
          ["×1", "Gauntlet of Proudearth", "Seraphic"],
          ["×1", "Gateway-Star Sword", "Celestial CA specs + cap"],
          ["×1", "Binds of The Hanged Man", "Additional slot + cap"],
          ["×1", "Tribunal Lyre Militis", "Additional slot + HP"],
          ["×1", "Pistol of Bahamut Coda", "Additional slot + ATK / HP"],
        ],
      },
    ],
  },
  wind: {
    grids: [
      {
        name: "Siegfried control target",
        tag: "TARGET",
        note: "Current JP Magna Boogeyman shell. It is intentionally defensive and skill-oriented: three Coruscant Croziers for HP, three Aura guns plus two Aura daggers, then Opus and three additional-slot weapons.",
        weapons: [
          ["MH", "Exo Australis", "Boogeyman · Attack awakening"],
          ["×3", "Coruscant Crozier", "HP + critical"],
          ["×3", "Tiamat Bolt Aura", "M3 boost + cap"],
          ["×2", "Tiamat Edge Aura", "Skill + defense"],
          ["×1", "Spear of Renunciation", "Skill cap + stamina"],
          ["×1", "Melody of Judgement", "Additional slot + cap"],
          ["×1", "Ultima Staff", "Normal cap + seraphic"],
          ["×1", "Altruism-Soul Staff", "Additional slot"],
        ],
      },
    ],
    priorities: [
      "Recruit and develop Estarriola for Siegfried",
      "Build one Attack-awakened Exo Australis",
    ],
  },
  light: {
    teams: [
      {
        name: "Agastia entry · Cosmos CA",
        mode: "RESCUE FA · CA ON",
        note: "Grand Cosmos is owned, but Pijiu and a tested 60% omen plan are still required. Join near 100% while learning; this is not reliably zero-intervention when room speed changes.",
        units: [
          {
            name: "Grand Cosmos",
            role: "Frontline · CA / hit count",
            id: "3040467000",
          },
          {
            name: "Pijiu",
            role: "Frontline · required free unit",
            id: "3040587000",
          },
          {
            name: "Grand Noa",
            role: "Frontline · charge support",
            id: "3040255000",
          },
          {
            name: "Grand Sandalphon",
            role: "Backline · Primarch target",
            id: "3040515000",
          },
          {
            name: "Yukata Narmaya",
            role: "Backline · MC CA follow-up",
            id: "3040392000",
          },
        ],
        mc: {
          className: "Kengo",
          ca: "ON",
          mainhand: "Unsigned Kaneshige · Light · Devilry",
          skills: [
            "Unfettered Mind",
            "Ashura Formation",
            "No More Doubt",
            "Miserable Mist",
          ],
          note: "Full Auto ON and Full Guard OFF. Pijiu is the actual entry gate. The current no-Summer-Horus JP template uses Cosmos / Pijiu / Nehan with Nehan skill 3 disabled; Noa is the account adaptation and must be tested.",
        },
        guide: guide("agastia", "Open the Agastia join and omen guide"),
      },
    ],
    grids: [
      {
        name: "Agastia entry CA",
        tag: "TARGET",
        note: "Current 2026 no-Summer-Horus Magna template. It requires a third elemental Kaneshige, so build it only after Pijiu is ready and the owned Noa substitution passes testing.",
        weapons: [
          ["MH", "Unsigned Kaneshige", "Light · Devilry emblem"],
          ["×2", "Luminiera Bolt Credo", "M3 boost + cap"],
          ["×4", "Luminiera Sword Omega", "Attack + HP"],
          ["×1", "Gateway-Star Sword", "Attack + defense cap"],
          ["×1", "Harakhte", "CA support"],
          ["×1", "Sword of Renunciation", "CA cap + stamina"],
          ["×1", "Shooting of The Star", "Additional slot + cap"],
          ["×1", "Worldforging Moros", "Additional slot"],
          ["×1", "Ultima Blade", "CA cap + seraphic"],
        ],
      },
    ],
    priorities: [
      "Obtain and raise Pijiu before crafting Light Kaneshige",
      "Test the 60% 30-hit omen from a 100% join",
    ],
  },
  dark: {
    current: "Skill/sustain FA + Kengo CA progression",
    replaceGrid: {
      index: 1,
      grid: {
        name: "Kengo CA Magna III",
        tag: "TARGET",
        note: "Dark Kaneshige remains justified for the maintained Tyra/Magisa/Tsukuyomi long-fight team. Three Ater fists keep the M3 boost core while Fediel's Spine and Abyss Spine add the CA layer.",
        weapons: [
          ["MH", "Unsigned Kaneshige", "Dark · Devilry emblem"],
          ["×3", "Celeste Grace Ater", "M3 boost + cap"],
          ["×1", "Fediel's Spine", "CA supplemental"],
          ["×1", "Abyss Spine", "CA damage + HP"],
          ["×1", "Katana of Renunciation", "CA cap + stamina"],
          ["×1", "Altruism-Soul Staff", "Lich + Tsukuyomi"],
          ["×1", "Scythe of Darkherald", "Seraphic until Ultima key"],
          ["×1", "Ultima Staff", "CA cap + seraphic target"],
        ],
      },
    },
    replaceOpus: {
      index: 1,
      opus: {
        team: "TEAM B · KENGO CA / LONG FA",
        cap: "Gamma · CA DMG Cap",
        pendulum: "Pendulum of Strength",
        transcend: "Pendulum of Exaltation",
        note: "Tyra, Magisa and Tsukuyomi form the maintained long-fight CA team. Gamma and Exaltation belong to this dedicated preset; keep Beta and Sagacity on the separate general skill team.",
      },
    },
    teams: [
      {
        name: "Cosmos readiness · blocked",
        mode: "NOT READY",
        note: "Do not send the ordinary Lich/Magisa/Tsukuyomi team into Cosmos unattended. This card shows the verified target control core so the missing pieces are visible; it is not an owned team.",
        units: [
          {
            name: "Summer Magus",
            role: "Frontline target · red control",
            id: "3040517000",
          },
          {
            name: "Vikala",
            role: "Frontline target · gauge / defense",
            id: "3040252000",
          },
          {
            name: "Indala",
            role: "Frontline target · blue control",
            id: "3040569000",
          },
          {
            name: "Kou",
            role: "Backline target · emergency sustain",
            id: "3040242000",
          },
          {
            name: "Grand Orologia",
            role: "Backline target · recovery",
            id: "3040536000",
          },
        ],
        mc: {
          className: "Manadiver",
          ca: "ON",
          mainhand: "Forbidden Agastia · Defense awakening",
          skills: [
            "Aether Siphon",
            "Secret Triad",
            "Wild Magica",
            "Miserable Mist",
          ],
          note: "Reference configuration only. Disable Indala skill 3, join at 100%, and use the opening All-Potion required by the checked route. Keep this preset blocked until the complete team can push both red and blue safely.",
        },
        guide: guide("cosmos", "Open the Cosmos gauge and readiness guide"),
      },
    ],
    grids: [
      {
        name: "Cosmos control target",
        tag: "LATER",
        note: "Current JP Magna Manadiver target. The weapon grid is farmable after Agastia and M3, but the character gate remains the real blocker; owning the grid does not make the current Lich team safe.",
        weapons: [
          ["MH", "Forbidden Agastia", "Defense awakening"],
          ["×2", "Pain and Suffering", "Skill supplemental"],
          ["×2", "Celeste Saber Ater", "Skill supplemental"],
          ["×2", "Celeste Grace Ater", "M3 boost + cap"],
          ["×1", "Abyss Spine", "CA + HP"],
          ["×1", "Katana of Renunciation", "Skill cap + stamina"],
          [
            "×1",
            "Festering of Mournful Obsequies",
            "Light reduction · Draconic Provenance",
          ],
          ["×1", "Altruism-Soul Staff", "Additional slot"],
          ["×1", "Worldvexing Angelos", "Additional slot"],
          ["×1", "Ultima Staff", "Normal cap + seraphic"],
        ],
      },
    ],
    priorities: [
      "Keep Cosmos blocked until a verified gauge-control core is owned",
    ],
  },
};

export function applyRevansRoadmapExtensions(plan: Plan): Plan {
  const revision = revisions[plan.element.toLowerCase()];
  if (!revision) return plan;
  const teams = [...plan.teams];
  if (revision.replaceTeam)
    teams[revision.replaceTeam.index] = revision.replaceTeam.team;
  teams.push(...(revision.teams ?? []));
  const grids = [...plan.grids];
  if (revision.replaceGrid)
    grids[revision.replaceGrid.index] = revision.replaceGrid.grid;
  const opus = [...plan.opus];
  if (revision.replaceOpus)
    opus[revision.replaceOpus.index] = revision.replaceOpus.opus;
  const originalPriorities = plan.priorities;
  return {
    ...plan,
    current: revision.current ?? plan.current,
    teams,
    grids: [...grids, ...revision.grids],
    opus,
    priorities: [...(revision.priorities ?? []), ...originalPriorities],
  };
}
