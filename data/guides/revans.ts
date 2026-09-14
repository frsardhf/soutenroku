export const revansRaidIds=["diaspora","seofon","agastia","mugen","siegfried","cosmos"] as const;
export type RevansRaidId=(typeof revansRaidIds)[number];

export type RevansPreset={
  title:string;
  purpose:string;
  confidence:"Verified"|"Account test"|"Later";
  team:string[];
  settings:string[];
  requirements:string[];
  operation:string[];
};

export type RevansRaid={
  id:RevansRaidId;
  name:string;
  bossElement:string;
  playerElement:string;
  color:string;
  priority:string;
  readiness:string;
  mechanic:string;
  recommendation:string;
  presets:RevansPreset[];
  axes:{normal:string;ca:string;skill:string};
  sources:{label:string;url:string;scope:string}[];
};

export const revansReviewedAt="13 September 2026";

export const revansRaids:Record<RevansRaidId,RevansRaid>={
  diaspora:{
    id:"diaspora",name:"Diaspora HL",bossElement:"Water",playerElement:"Earth",color:"#aa7a45",priority:"Current entry",readiness:"Buildable now",
    mechanic:"The host should raise the yellow CA activation gauge to 100% before requesting backup. The resulting Emergency Repair System asks for 97 hits, so the CA host normally stops and lets normal/skill rescuers take over.",
    recommendation:"Use the owned Kengo team as a host-preparation preset, not as a post-transition clear team. Okto is not required.",
    presets:[
      {title:"Owned CA-100 host",purpose:"Self-host preparation",confidence:"Account test",team:["Kengo","Aletheia","Earth Satyr","Holiday Anthuria","Caim · only with an all-unique grid","Uriel · future backline"],settings:["Charge attacks ON","Full Auto ON","Full Guard OFF","Quick summon optional"],requirements:["Earth Unsigned Kaneshige · Devilry","50–60k+ HP","Every weapon name unique when using Caim","One Galleon's Jaw for CA supplemental damage"],operation:["Enter alone and use the opening All-Potion if needed.","Run Full Auto until the yellow CA activation gauge reaches 100%.","Stop at the 97-hit Emergency Repair omen.","Request backup with the comment 奥義100 and do not continue attacking."]},
      {title:"Published no-Okto references",purpose:"Safer substitutions",confidence:"Verified",team:["Kengo / Onmyoji","Benjamin or Aletheia","Earth Satyr","FLB Arulumaya","Caim","Flexible reserve"],settings:["CA ON","Guard OFF in the demonstrated FA","Disable Arulumaya skill 3 for the Onmyoji version"],requirements:["Debuff-duration reduction for Fear and Burn","Water-reduction Draconic is a safety alternative","Host contribution reaches roughly 4m around CA 100"],operation:["Use Satyr or Arulumaya to shorten unremovable debuffs.","Treat Aletheia as a CA-speed flex rather than the defensive core.","Onmyoji is valid, but its extra skill damage can consume more host HP before opening the raid."]},
    ],
    axes:{normal:"Rescue axis after a host has established CA activation 100%; do not use for host preparation.",ca:"Preferred host axis. Stop at CA activation 100% instead of trying to clear the second phase.",skill:"Rescue axis and an Onmyoji host alternative, but excessive pre-transition skill damage is undesirable."},
    sources:[
      {label:"GameWith JP · Diaspora",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/322609",scope:"2026 host CA-100, Onmyoji and rescue separation"},
      {label:"Otakupark · CA-100 host",url:"https://otakupark.com/deliasuporahl-kouryaku-ougi100nagasi-zihatuhuruo-tohennsei/",scope:"Practical Magna, no-limited and no-Okto examples"},
      {label:"Kamigame · Diaspora",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88/%E3%83%9E%E3%83%AB%E3%83%81%E3%83%90%E3%83%88%E3%83%AB/%E3%83%87%E3%82%A3%E3%82%A2%E3%82%B9%E3%83%9D%E3%83%A9HL.html",scope:"Mechanics, HP floor and host/rescuer roles"},
    ],
  },
  seofon:{
    id:"seofon",name:"Seofon HL",bossElement:"Wind",playerElement:"Fire",color:"#e45a3f",priority:"Next farm",readiness:"Closest roster overlap",
    mechanic:"Short rescue teams race to the blue-chest contribution line, while self-host teams must retain enough defense to survive. The 10% trigger deals 77,777 damage, so a responsible farming setup should remain useful after reaching honors.",
    recommendation:"Test the owned Fire core only on self-hosts, and keep it labelled experimental until it reaches the contribution target and survives 10%. Percival and Ragazzo are the verified short-rescue upgrades.",
    presets:[
      {title:"Modern rescue Full Auto",purpose:"Rescue · short blue chest",confidence:"Later",team:["Manadiver","Ragazzo","Grand Percival","Grand Zeta","FLB Fraux","Michael"],settings:["CA OFF","Full Auto ON","Reloading improves consistency in fast rooms"],requirements:["Grand Percival and Ragazzo","Sufficient normal/skill cap","HP or recovery to continue through 10%"],operation:["Enter a healthy raid and start Full Auto.","Expect roughly three to four turns depending on grid and lobby speed.","Do not design only for the contribution line if the room may stall at 10%."]},
      {title:"Owned Fire test",purpose:"Self-host · durability test",confidence:"Account test",team:["Manadiver","Grand Zeta","Michael","Grand Wilnas","Athena","Flexible reserve"],settings:["CA OFF","Full Auto ON","Full Guard OFF"],requirements:["This is not the published Percival/Ragazzo rotation","Check 4m contribution consistency","Check survival at the 10% trigger","Approximately 100k HP is the published defensive-host benchmark, not a promise for this lineup"],operation:["Test on self-hosts before relying on public rescues.","Open backup before dealing four million damage so rescuers retain contribution room.","Prioritize Percival before treating Seofon as solved."]},
    ],
    axes:{normal:"The modern rescue route, combined with Manadiver and automatic skill damage.",ca:"A slower Magna survival option; useful when the account cannot yet execute normal burst.",skill:"Not a separate pure archetype—the successful short route is normal plus post-attack skill damage."},
    sources:[
      {label:"GameWith JP · Seofon",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/390423",scope:"Current short rescue and self-host templates"},
      {label:"Otakupark · Seofon",url:"https://otakupark.com/grable-siete-hl-fully-automatic-formation-solo-relief-magna/",scope:"Four-turn Magna rescue and slower no-limited self-host"},
      {label:"Shiokalog · 2026 Seofon self-host",url:"https://shiokalog.com/gbf-seofon-hl-fullauto/",scope:"August–September 2026 defensive host procedure and rescue-room boundary"},
    ],
  },
  agastia:{
    id:"agastia",name:"Agastia HL",bossElement:"Dark",playerElement:"Light",color:"#d1a933",priority:"After Seofon",readiness:"Cosmos owned; support pieces missing",
    mechanic:"Large per-hit damage reduction favors repeated charge attacks. Omen cancellation builds Limit Over, and the post-40% phase requires the six-element damage supplied through the raid's FC system.",
    recommendation:"Build around Grand Cosmos and Kengo. Obtain Pijiu before investing in a normal-attack alternative.",
    presets:[
      {title:"Accessible CA Full Auto",purpose:"Rescue · CA contribution",confidence:"Account test",team:["Kengo","Grand Cosmos","Pijiu","Grand Noa or Nehan","Grand Lu Woh · sustain flex","Flexible reserve"],settings:["CA ON","Nehan skill 3 OFF when used","Quick summon according to the tested charge loop"],requirements:["Light Unsigned Kaneshige","Approximately 60k HP","Pijiu","A plan for the 60% 30-hit and 10-debuff omens"],operation:["Prefer joining near 100% while learning the sequence; some Cosmos rotations depend on that starting point.","Use full chains to build Limit Over.","Noa is an owned-account substitution, not the verified replacement for Nehan.","Do not call this zero-intervention until potion and 60% behavior are tested."]},
      {title:"Summer Horus upgrade",purpose:"Rescue · premium CA",confidence:"Later",team:["Kengo","Grand Cosmos","Summer Horus","Nehan or Summer Seruel","Grand Sandalphon","Yukata Narmaya"],settings:["CA ON","Nehan skill 3 OFF","Some versions require potions"],requirements:["Summer Horus","Defensive awakenings","CA and skill-cap support in the grid"],operation:["Join at 100% when the rotation relies on Cosmos skill 3 for the 60% 30-hit trigger.","Verify whether the specific build is rescue FA or semi-FA."]},
    ],
    axes:{normal:"Premium niche route and not recommended for this account.",ca:"Preferred entry and farming axis because it bypasses the severe per-hit reduction.",skill:"Supports individual omens but does not replace the CA/FC engine."},
    sources:[
      {label:"GameWith JP · Agastia",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/385099",scope:"Current CA Full Auto and omen mechanics"},
      {label:"Otakupark · Agastia",url:"https://otakupark.com/agastya-hl-capture-full-auto-recover-as-appropriate-magna-formation/",scope:"Practical Magna settings, HP and intervention requirements"},
    ],
  },
  mugen:{
    id:"mugen",name:"Mugen HL",bossElement:"Fire",playerElement:"Water",color:"#1599c4",priority:"After Diaspora drops",readiness:"Needs Haaselia FLB and Schrodingers",
    mechanic:"At 70%, Mugen heals to full and applies permanent Strong Armed. Post-70 survival therefore depends on barriers, mitigation and damage cuts rather than ordinary healing.",
    recommendation:"Finish Haaselia FLB with skill 4 and obtain Defense Schrodingers from Diaspora before making Mugen a routine target.",
    presets:[
      {title:"Magna defensive Full Auto",purpose:"Full clear · defensive FA",confidence:"Later",team:["Paladin","Europa","SR Karva · sacrificial","FLB Anne","FLB Haaselia","Gabriel or Maria Theresa"],settings:["Full Auto ON","CA ON","Quick summon Car.On or Fire Carbuncle"],requirements:["Two to three Defense-awakened Schrodingers","FLB Haaselia skill 4","Roughly 60–70k HP","Barrier mainhand"],operation:["Avoid pushing the first phase so quickly that Extinction level remains high.","Use barriers after healing becomes unavailable.","Treat Grand Yatima as a Varuna alternative, not the demonstrated Magna slot."]},
      {title:"Owned Wamdus Kengo",purpose:"Entry · semi-FA",confidence:"Account test",team:["Kengo","Grand Yatima or gauge support","Wamdus","Grand Sylvia","Haaselia","Gabriel"],settings:["CA ON","Manual mitigation calls remain necessary","Quick summon Car.On or Fire Carbuncle"],requirements:["Water Kaneshige","Wamdus CA/FC mitigation loop","High HP","Prefer initial Schrodingers"],operation:["Alternate Wamdus CA mitigation with FC mitigation.","Manually call a fire-cut summon for Giant Ban after 70%.","This is semi-FA, not a verified unattended composition."]},
    ],
    axes:{normal:"Fast Varuna rescue farming exists, but it is a later Hraes/Smarhithi-level project.",ca:"The accessible semi-FA route, especially with Wamdus.",skill:"Only a supporting damage source; it does not solve the post-70 survival check."},
    sources:[
      {label:"GameWith JP · Mugen",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/355009",scope:"Current Full Auto, CA and normal rescue templates"},
      {label:"Otakupark · Mugen",url:"https://otakupark.com/granblue-fantasy-mugen-hl-strategy-solo-full-auto-rescue-formation-introduction-for-magna/",scope:"Magna/Varuna separation and Wamdus semi-FA procedure"},
    ],
  },
  siegfried:{
    id:"siegfried",name:"Siegfried HL",bossElement:"Earth",playerElement:"Wind",color:"#39a978",priority:"Later control project",readiness:"Needs a raid-specific control core",
    mechanic:"Frequent dispels, controlled CT cycling and a safe answer to Kvalfang matter more than raw damage. Reaching ten claw/scale stacks causes a wipe, while excessive delays can disrupt the intended special cycle.",
    recommendation:"Estarriola is the efficient modern target, not an absolute entry gate. Slower Black Cat, Monk and Robin Hood defensive routes exist.",
    presets:[
      {title:"Modern control Full Auto",purpose:"Full clear · control FA",confidence:"Later",team:["Boogeyman","Estarriola","Cagliostro & Clarisse","Grand Rosetta","Raphael","Flexible reserve"],settings:["CA ON","Full Guard ON","Disable the skills identified by the exact published rotation","Reloading recommended because pure FA is slow"],requirements:["Frequent automatic dispels","Cover or all-substitute for Kvalfang","Attack-awakened Exo Australis mainhand","Enough defense to reduce incoming damage to zero where possible"],operation:["Let the boss use CT specials instead of delaying indefinitely.","Cancel or safely receive Kvalfang to control stacks.","Dispel the alternating buffs quickly."]},
      {title:"Defensive class alternatives",purpose:"Self-host · slow full clear",confidence:"Verified",team:["Black Cat / Monk / Robin Hood","Defensive dispeller","Cover unit","Sustain unit","Defensive reserve","Katzelia or flex"],settings:["CA often OFF in Black Cat examples","Full Guard ON","Quick summon Transcended Lucifer where available"],requirements:["Long clear time","Substantially lower honor speed","Exact substitutions must be tested"],operation:["Use this route to enter without Estarriola, not as evidence that the modern core is unnecessary.","Prioritize survival and dispels over a normal-burst lineup."]},
    ],
    axes:{normal:"Poor as a standalone plan; fast-normal characters do not answer the control mechanics by themselves.",ca:"Compatible with safer control teams, but not a Kengo racing strategy.",skill:"The effective primary axis through automatic damage, dispels and defensive utility."},
    sources:[
      {label:"Kamigame · Siegfried",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88/%E3%83%9E%E3%83%AB%E3%83%81%E3%83%90%E3%83%88%E3%83%AB/%E3%82%B8%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AA%E3%83%BC%E3%83%88HL.html",scope:"Current mechanics and control teams"},
      {label:"Otakupark · Siegfried",url:"https://otakupark.com/zi-kuhuri-to-mizugisionnnasi/",scope:"Slower defensive class alternatives"},
      {label:"Yahoo Chiebukuro · 2026 team discussion",url:"https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q14328016224",scope:"Community cross-check for Boogeyman, Estarriola, Cagliostro & Clarisse, and Rosetta"},
    ],
  },
  cosmos:{
    id:"cosmos",name:"Cosmos HL",bossElement:"Light",playerElement:"Dark",color:"#7552a3",priority:"Last",readiness:"Current roster lacks gauge-balancing partners",
    mechanic:"Damage instances of at least three million push the balance toward red, while every ten hits pushes it toward blue. Reaching either extreme wipes the party; the forced shifts at 75% and 25% demand both types of damage.",
    recommendation:"Lich is usable and can deliberately push blue, but only inside a team that supplies controlled large red-shifting hits. Do not run the current Dark general team blindly.",
    presets:[
      {title:"Magna Lich control Full Auto",purpose:"Full clear · older control FA",confidence:"Later",team:["Shieldsworn","Koku","Lich","Fediel","Kou","Flexible reserve"],settings:["Fediel skill 3 manually at battle start","CA depends on the exact balance version","Celeste support preferred in the cited Lich setup"],requirements:["Koku and Fediel","Large-hit counterweight to Lich's multihits","Gauge monitoring while validating"],operation:["Use Lich's end-of-turn hits to push blue intentionally.","Ensure the remaining damage can return the gauge toward red.","Do not assume Lich is universally unsafe or universally sufficient."]},
      {title:"Current 2026 premium Full Auto",purpose:"Rescue · control FA",confidence:"Later",team:["Manadiver","Summer Magus","Vikala","Indala","Kou","Orologia"],settings:["CA ON","Indala skill 3 OFF in the rescue version","Open with an All-Potion on the cited Magna rescue route","Reload in fast rooms"],requirements:["Summer Magus—not Summer Magisa","Vikala and Indala","A healthy raid joined near 100% while learning","Balanced large-hit and multihit output"],operation:["Expect rescue stability to depend on the raid's current gauge, HP position, and room speed.","Use Guard for the dangerous 75% and 25% forced-shift triggers when the cited route calls for it.","Revalidate the 25% forced-blue phase before calling it unattended."]},
    ],
    axes:{normal:"Only viable as a controlled normal/skill hybrid, not a simple CA-off attacker stack.",ca:"Possible with premium control pieces, but must still supply multihits to rebalance the gauge.",skill:"Central to both sides of the gauge: large nukes push red while multihit skills push blue."},
    sources:[
      {label:"GameWith JP · Cosmos",url:"https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/403851",scope:"Current mechanics and premium Full Auto"},
      {label:"Otakupark · Cosmos",url:"https://otakupark.com/granblue-fantasy-cosmos-hl-strategy-full-auto-rescue-spontaneous-formation-introduction-with-magna-formation-4-selections/",scope:"Magna Lich and practical rescue examples"},
      {label:"Kamigame · Cosmos",url:"https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88/%E3%83%9E%E3%83%AB%E3%83%81%E3%83%90%E3%83%88%E3%83%AB/%E3%82%B3%E3%82%B9%E3%83%A2%E3%82%B9HL.html",scope:"Trigger and gauge-mechanic cross-check"},
    ],
  },
};

export function getRevansRaid(id:string){return revansRaids[id as RevansRaidId]}
