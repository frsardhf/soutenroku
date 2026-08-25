import type {Plan} from "./roadmaps";

/**
 * Persistence and URL identities. These literals are immutable: rename display
 * labels freely, but never rewrite an existing ID after release.
 */
export const roadmapIdentity={
  "fire": {
    "teams": [
      "grand-zeta-normal-team",
      "sandira-ca-fc-team"
    ],
    "grids": [
      {
        "id": "academy-magna",
        "weaponGroups": [
          "sword-of-michael-ssr",
          "ancient-ecke-sachs",
          "nilakantha",
          "true-infernal-flamescythe",
          "bahamut-dagger",
          "scythe-of-renunciation"
        ]
      },
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
      }
    ]
  },
  "water": {
    "teams": [
      "payila-normal-team",
      "ca-high-difficulty"
    ],
    "grids": [
      {
        "id": "academy-magna",
        "weaponGroups": [
          "dark-opus",
          "ancient-auberon",
          "wamdus-spear",
          "bahamut-dagger",
          "fateless",
          "gabriel-wand"
        ]
      },
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
      }
    ]
  },
  "earth": {
    "teams": [
      "sabrina-fast-normal",
      "summer-seox-general-fa"
    ],
    "grids": [
      {
        "id": "academy-magna",
        "weaponGroups": [
          "last-sahrivar",
          "nibelung-horn",
          "yggdrasil-crystal-blade-omega",
          "nibelung-klinge",
          "ancient-perseus",
          "harp-of-renunciation",
          "bahamut-dagger",
          "gauntlet-of-uriel-ssr"
        ]
      },
      {
        "id": "magna-iii-farm",
        "weaponGroups": [
          "yggdrasil-s-bough",
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
          "yggdrasil-s-bough",
          "yggdrasil-crystal-blade-arbos",
          "nibelung-horn",
          "harp-of-renunciation",
          "covenant-ruin-fist",
          "ultima-claw",
          "bahamut-dagger-coda"
        ]
      }
    ]
  },
  "wind": {
    "teams": [
      "grand-narmaya-fast-normal",
      "safe-ca-long-fa"
    ],
    "grids": [
      {
        "id": "academy-magna",
        "weaponGroups": [
          "tiamat-bolt-omega",
          "last-storm-harp",
          "coruscant-crozier",
          "true-conviction-flashspear",
          "arkab-prior",
          "bahamut-dagger",
          "spear-of-renunciation",
          "ring-of-raphael-ssr"
        ]
      },
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
      }
    ]
  },
  "light": {
    "teams": [
      "summer-payila-general-fa",
      "cosmos-ca-team"
    ],
    "grids": [
      {
        "id": "academy-magna",
        "weaponGroups": [
          "true-purity-sunblade",
          "luminiera-sword-omega",
          "cosmic-sword",
          "sword-of-renunciation",
          "bahamut-dagger",
          "harp-of-everlore"
        ]
      },
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
      }
    ]
  },
  "dark": {
    "teams": [
      "summer-azusa-ca-team",
      "lich-skill-crest-fa"
    ],
    "grids": [
      {
        "id": "academy-magna",
        "weaponGroups": [
          "cerberus-order",
          "zechariah",
          "abyss-spine",
          "celeste-zaghnal-omega",
          "advocatus-diaboli",
          "true-phantom-demon-blade",
          "katana-of-renunciation",
          "bahamut-dagger",
          "scythe-of-belial-ssr"
        ]
      },
      {
        "id": "magna-iii-farm",
        "weaponGroups": [
          "unsigned-kaneshige",
          "celeste-grace-ater",
          "celeste-saber-ater",
          "zechariah",
          "katana-of-renunciation",
          "altruism-soul-staff",
          "scythe-of-darkherald"
        ]
      },
      {
        "id": "kengo-ca",
        "weaponGroups": [
          "unsigned-kaneshige",
          "celeste-grace-ater",
          "celeste-saber-ater",
          "abyss-spine",
          "fediel-spine",
          "katana-of-renunciation",
          "scythe-of-darkherald"
        ]
      }
    ]
  }
} as const;

export type StableElementId=keyof typeof roadmapIdentity;

function elementId(plan:Plan):StableElementId{
  const id=plan.element.toLowerCase();
  if(!(id in roadmapIdentity))throw new Error(`Missing stable identity for ${plan.element}`);
  return id as StableElementId;
}

export function teamId(plan:Plan,index:number){
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
