"use client";

import {RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAccount} from "@/components/progress/account-provider";
import {activeArcarumProjects,foundationNwqCosts,reserveArcarumProjects,type ArcarumProjectDefinition} from "@/data/guides/arcarum";
import type {ArcarumProjectProgress} from "@/lib/progress";

const goalLabels:Record<ArcarumProjectProgress["goal"],string>={weapon5:"Weapon 5★",character5:"Evoker 5★",skill4:"Fourth skill",level110:"Lv110"};

function remainingWeaponNwq(stage:number){return foundationNwqCosts.slice(Math.max(0,stage+1)).reduce((sum,cost)=>sum+cost,0)}
function remainingNwq(progress:ArcarumProjectProgress){
  let amount=remainingWeaponNwq(progress.weaponStage);
  if(progress.goal==="skill4"||progress.goal==="level110")amount+=progress.skill4?0:30;
  if(progress.goal==="level110"&&progress.characterStage<110)amount+=20;
  return amount;
}
function projectedNwq(definition:ArcarumProjectDefinition,progress:ArcarumProjectProgress){return progress.goal==="level110"&&progress.characterStage<110&&definition.transcendence!=="available"?20:0}
const elementClass=(element:string)=>`arcarum-element arcarum-${element.toLowerCase()}`;

function Stepper({label,value,values,format,onChange}:{label:string;value:number;values:number[];format:(value:number)=>string;onChange:(value:number)=>void}){
  const position=values.indexOf(value);
  return <div className="arcarum-stepper" aria-label={`${label}: ${format(value)}`}><button type="button" disabled={position<=0} onClick={()=>onChange(values[Math.max(0,position-1)])} aria-label={`Decrease ${label}`}>−</button><output>{format(value)}</output><button type="button" disabled={position===values.length-1} onClick={()=>onChange(values[Math.min(values.length-1,position+1)])} aria-label={`Increase ${label}`}>+</button></div>;
}

function ProjectRow({definition,progress,onChange,reserve=false}:{definition:ArcarumProjectDefinition;progress:ArcarumProjectProgress;onChange:(next:ArcarumProjectProgress)=>void;reserve?:boolean}){
  const update=<K extends keyof ArcarumProjectProgress>(key:K,value:ArcarumProjectProgress[K])=>onChange({...progress,[key]:value});
  return <tr className={reserve&&!progress.included?"arcarum-project-muted":undefined}>
    <th scope="row"><span className={elementClass(definition.element)} aria-hidden="true"/><div><strong>{definition.name}</strong><small>{definition.summon} · {definition.note}</small>{reserve&&<label className="arcarum-include"><input type="checkbox" checked={progress.included} onChange={(event)=>update("included",event.target.checked)}/> Include in total</label>}</div></th>
    <td><select aria-label={`${definition.name} goal`} value={progress.goal} onChange={(event)=>update("goal",event.target.value as ArcarumProjectProgress["goal"])}>{Object.entries(goalLabels).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></td>
    <td><select aria-label={`${definition.name} recruitment`} value={progress.recruited?"yes":"no"} onChange={(event)=>update("recruited",event.target.value==="yes")}><option value="no">Not recruited</option><option value="yes">Recruited</option></select></td>
    <td><Stepper label="Weapon" value={progress.weaponStage} values={[-1,0,1,2,3,4,5]} format={(stage)=>stage<0?"Unowned":`${stage}★`} onChange={(value)=>update("weaponStage",value)}/></td>
    <td><Stepper label="Domain" value={progress.domainStage} values={[0,1,2,3,4]} format={(stage)=>`${stage}/4`} onChange={(value)=>update("domainStage",value)}/></td>
    <td><Stepper label="Character" value={progress.characterStage} values={[4,5,110]} format={(stage)=>stage===110?"Lv110":`${stage}★`} onChange={(value)=>update("characterStage",value)}/></td>
    <td><select aria-label={`${definition.name} fourth skill`} value={progress.skill4?"yes":"no"} onChange={(event)=>update("skill4",event.target.value==="yes")}><option value="no">Not obtained</option><option value="yes">Obtained</option></select></td>
    <td className="arcarum-nwq"><strong>{remainingNwq(progress)}</strong>{projectedNwq(definition,progress)>0&&<small>incl. {projectedNwq(definition,progress)} projected</small>}</td>
  </tr>;
}

function ProjectTable({caption,definitions,progressFor,setArcarumProject,reserve=false}:{caption:string;definitions:ArcarumProjectDefinition[];progressFor:(definition:ArcarumProjectDefinition)=>ArcarumProjectProgress;setArcarumProject:(id:string,progress:ArcarumProjectProgress)=>void;reserve?:boolean}){
  return <div className="guide-table-wrap arcarum-project-table"><table className="guide-table"><caption>{caption}</caption><thead><tr><th scope="col">Project</th><th scope="col">Goal</th><th scope="col">Recruitment</th><th scope="col">Weapon</th><th scope="col">Domain</th><th scope="col">Character</th><th scope="col">Skill 4</th><th scope="col">NWQ left</th></tr></thead><tbody>{definitions.map((definition)=><ProjectRow key={definition.id} definition={definition} progress={progressFor(definition)} onChange={(next)=>setArcarumProject(definition.id,next)} reserve={reserve}/>)}</tbody></table></div>;
}

export function ArcarumPlanner(){
  const {account,hydrated,setArcarumProject}=useAccount();
  const all=[...activeArcarumProjects,...reserveArcarumProjects];
  const progressFor=(definition:ArcarumProjectDefinition)=>account.arcarumProjects[definition.id]??definition.defaults;
  const included=all.filter((definition)=>progressFor(definition).included);
  const total=included.reduce((sum,definition)=>sum+remainingNwq(progressFor(definition)),0);
  const projected=included.reduce((sum,definition)=>sum+projectedNwq(definition,progressFor(definition)),0);
  const reset=()=>all.forEach((definition)=>setArcarumProject(definition.id,definition.defaults));
  return <div className={`arcarum-planner${hydrated?"":" is-loading"}`}>
    <div className="arcarum-planner-summary"><article><span>Confirmed remaining</span><strong>{total-projected}</strong><small>New World Quartz</small></article><article><span>Projected reserve</span><strong>{projected}</strong><small>Unreleased Lv110 costs</small></article><article><span>Planned total</span><strong>{total}</strong><small>Included projects only</small></article><Button type="button" variant="outline" size="sm" onClick={reset}><RotateCcw aria-hidden="true"/> Reset defaults</Button></div>
    <ProjectTable caption="Active account projects" definitions={activeArcarumProjects} progressFor={progressFor} setArcarumProject={setArcarumProject}/>
    <details className="arcarum-reserve"><summary>Five deferred male projects <span>excluded by default</span></summary><p>These are parking-lot targets for a future element-specific need. Checking “Include in total” is the explicit decision to activate one.</p><ProjectTable caption="Deferred male reserve projects" definitions={reserveArcarumProjects} progressFor={progressFor} setArcarumProject={setArcarumProject} reserve/></details>
    <p className="arcarum-storage-note">Progress is saved locally with the Soutenroku account and is included in account export/import. Static material costs remain in the guide data.</p>
  </div>;
}
