import type {Plan} from "./roadmaps";

/**
 * Persistence and URL identities. These literals are immutable: rename display
 * labels freely, but never rewrite an existing ID after release.
 */
export const roadmapIdentity={
  "fire": {
    "teams": [
      "grand-zeta-normal-team",
      "sandira-ca-fc-team",
      "seofon-readiness-test"
    ],
    "grids": [
      {
        "id": "magna-iii-farm",
        "weaponGroups": [
          "exo-maitrah-karuna",
          "colossus-cane-ira",
          "colossus-bomber-ira",
          "nilakantha",
          "sol-remnant",
          "scythe-of-renunciation",
          "sword-of-valorblaze"
        ]
      },
      {
        "id": "seofon-durability-test",
        "weaponGroups": [
          "exo-maitrah-karuna",
          "colossus-cane-ira",
          "colossus-bomber-ira",
          "nilakantha",
          "draconic-harp",
          "sol-remnant",
          "sword-of-valorblaze",
          "ancient-ecke-sachs",
          "ultima-spear",
          "heat-of-the-sun",
          "spear-of-bahamut-coda"
        ]
      }
    ]
  },
  "water": {
    "teams": [
      "payila-normal-team",
      "ca-high-difficulty",
      "mugen-entry-wamdus-ca"
    ],
    "grids": [
      {
        "id": "magna-iii",
        "weaponGroups": [
          "dark-opus",
          "levi-gaze-mare",
          "levi-cranium-mare",
          "wamdus-spear",
          "levi-spear",
          "celestial-staff",
          "gabriel-wand"
        ]
      },
      {
        "id": "kengo-ca",
        "weaponGroups": [
          "unsigned-kaneshige",
          "levi-gaze-mare",
          "levi-cranium-mare",
          "tyros-zither",
          "schrodinger",
          "staff-of-renunciation",
          "altruism-soul-staff",
          "wand-of-charmtide"
        ]
      },
      {
        "id": "single-sided-varuna",
        "weaponGroups": [
          "dark-opus",
          "rubea-stiria",
          "taisai-bow",
          "galilei",
          "gabriel-dagger",
          "wamdus-spear",
          "knight-of-ice",
          "ultima-staff",
          "celestial-flex"
        ]
      },
      {
        "id": "double-varuna",
        "weaponGroups": [
          "dark-opus",
          "rubea-stiria",
          "taisai-bow",
          "galilei",
          "gabriel-dagger",
          "wamdus-spear",
          "knight-of-ice",
          "ultima-staff",
          "celestial-flex"
        ]
      },
      {
        "id": "hraes-ceiling",
        "weaponGroups": [
          "hraesvelgr",
          "rubea-stiria",
          "bridekeeper",
          "octavia-blade",
          "taisai-galilei",
          "dark-opus",
          "destroyer"
        ]
      },
      {
        "id": "mugen-entry-ca",
        "weaponGroups": [
          "unsigned-kaneshige",
          "schrodinger",
          "tyros-zither",
          "ancient-auberon",
          "colomba",
          "draconic-buster",
          "bahamut-staff-coda",
          "ultima-blade",
          "reflection-of-the-moon"
        ]
      }
    ]
  },
  "earth": {
    "teams": [
      "onmyoji-general-fa",
      "sabrina-fast-normal",
      "entry-diaspora-ca"
    ],
    "grids": [
      {
        "id": "magna-iii-farm",
        "weaponGroups": [
          "exo-ashavan",
          "yggdrasil-crystal-blade-arbos",
          "nibelung-horn",
          "harp-of-renunciation",
          "bahamut-dagger-coda",
          "gauntlet-of-proudearth"
        ]
      },
      {
        "id": "magna-iii-250",
        "weaponGroups": [
          "exo-ashavan",
          "yggdrasil-crystal-blade-arbos",
          "nibelung-horn",
          "harp-of-renunciation",
          "covenant-ruin-fist",
          "ultima-claw",
          "bahamut-dagger-coda"
        ]
      },
      {
        "id": "diaspora-all-unique-ca",
        "weaponGroups": [
          "unsigned-kaneshige",
          "yggdrasil-crystal-blade-arbos",
          "nibelung-klinge",
          "nibelung-horn",
          "ancient-perseus",
          "galleons-jaw",
          "ished",
          "baihu-claw-malus",
          "gauntlet-of-proudearth",
          "gateway-star-sword",
          "binds-of-the-hanged-man",
          "tribunal-lyre-militis",
          "pistol-of-bahamut-coda"
        ]
      }
    ]
  },
  "wind": {
    "teams": [
      "grand-narmaya-fast-normal",
      "safe-ca-long-fa",
      "catura-ca-v2"
    ],
    "grids": [
      {
        "id": "magna-iii-farm",
        "weaponGroups": [
          "tiamat-edge-aura",
          "tiamat-bolt-aura",
          "coruscant-crozier",
          "ewiyar-s-beak",
          "innocent-love",
          "spear-of-renunciation",
          "covenant-ruin-fist",
          "ring-of-wandergale"
        ]
      },
      {
        "id": "siegfried-control-target",
        "weaponGroups": [
          "exo-australis",
          "coruscant-crozier",
          "tiamat-bolt-aura",
          "tiamat-edge-aura",
          "spear-of-renunciation",
          "melody-of-judgement",
          "ultima-staff",
          "celestial-staff"
        ]
      }
    ]
  },
  "light": {
    "teams": [
      "summer-payila-general-fa",
      "payila-vajra-general-fa",
      "cosmos-ca-team",
      "agastia-entry-cosmos-ca"
    ],
    "grids": [
      {
        "id": "magna-iii-farm",
        "weaponGroups": [
          "exo-heliocentrum",
          "luminiera-bolt-credo",
          "luminiera-sword-omega",
          "luminiera-saber-credo",
          "sword-of-renunciation",
          "altruism-soul-staff",
          "harp-of-everlore"
        ]
      },
      {
        "id": "agastia-entry-ca",
        "weaponGroups": [
          "unsigned-kaneshige",
          "luminiera-bolt-credo",
          "luminiera-sword-omega",
          "celestial-sword",
          "harakhte",
          "sword-of-renunciation",
          "shooting-of-the-star",
          "worldforging-moros",
          "ultima-blade"
        ]
      }
    ]
  },
  "dark": {
    "teams": [
      "azusa-lich-skill-axis",
      "seox-general-team",
      "cosmos-readiness-blocked"
    ],
    "grids": [
      {
        "id": "magna-iii-farm",
        "weaponGroups": [
          "exo-hamartia",
          "celeste-grace-ater",
          "celeste-saber-ater",
          "zechariah",
          "katana-of-renunciation",
          "altruism-soul-staff",
          "scythe-of-darkherald"
        ]
      },
      {
        "id": "seox-general-magna-iii",
        "weaponGroups": [
          "unsigned-kaneshige",
          "celeste-grace-ater",
          "fediels-spine",
          "abyss-spine",
          "katana-of-renunciation",
          "altruism-soul-staff",
          "scythe-of-darkherald",
          "ultima-staff"
        ]
      },
      {
        "id": "cosmos-control-target",
        "weaponGroups": [
          "forbidden-agastia",
          "pain-and-suffering",
          "celeste-saber-ater",
          "celeste-grace-ater",
          "abyss-spine",
          "katana-of-renunciation",
          "draconic-fire-provenance",
          "celestial-staff",
          "worldvexing-angelos",
          "ultima-staff"
        ]
      }
    ]
  }
} as const;

export type StableElementId=keyof typeof roadmapIdentity;

function elementId(plan:Pick<Plan,"element">):StableElementId{
  const id=plan.element.toLowerCase();
  if(!(id in roadmapIdentity))throw new Error(`Missing stable identity for ${plan.element}`);
  return id as StableElementId;
}

export function teamId(plan:Pick<Plan,"element">,index:number){
  const element=elementId(plan);
  const id=roadmapIdentity[element].teams[index];
  if(!id)throw new Error(`Missing stable team ID for ${plan.element} team ${index}`);
  return `${element}-${id}`;
}

export function gridId(plan:Plan,index:number){
  const element=elementId(plan);
  const grid=roadmapIdentity[element].grids[index];
  if(!grid)throw new Error(`Missing stable grid ID for ${plan.element} grid ${index}`);
  return `${element}-${grid.id}`;
}

export function weaponGroupIds(plan:Plan,gridIndex:number):readonly string[]{
  const element=elementId(plan);
  const grid=roadmapIdentity[element].grids[gridIndex];
  if(!grid)throw new Error(`Missing stable weapon IDs for ${plan.element} grid ${gridIndex}`);
  return grid.weaponGroups;
}
