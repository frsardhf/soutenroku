import {expandWeaponSlots} from "./progress-map";
import {roadmapIdentity,weaponGroupIds} from "./roadmap-identity";
import type {Plan} from "./roadmaps";

export function validateRoadmap(plan:Plan){
  const errors:string[]=[];
  const identity=roadmapIdentity[plan.element.toLowerCase() as keyof typeof roadmapIdentity];
  if(!identity)errors.push("stable roadmap identity is missing");
  if(identity&&identity.teams.length!==plan.teams.length)errors.push("stable team ID count does not match");
  if(identity&&identity.grids.length!==plan.grids.length)errors.push("stable grid ID count does not match");
  if(new Set(plan.teams.map((team)=>team.name)).size!==plan.teams.length)errors.push("team names must be unique");
  if(new Set(plan.grids.map((grid)=>grid.name)).size!==plan.grids.length)errors.push("grid names must be unique");
  plan.grids.forEach((grid,gridIndex)=>{
    const groupIds=weaponGroupIds(plan,gridIndex);
    if(groupIds.length!==grid.weapons.length)errors.push(`${grid.name} stable weapon group count does not match`);
    if(new Set(groupIds).size!==groupIds.length)errors.push(`${grid.name} stable weapon group IDs must be unique`);
    const slots=expandWeaponSlots(grid.weapons,groupIds);
    if(grid.weapons[0]?.[0]!=="MH")errors.push(`${grid.name} must start with one mainhand`);
    if(slots.length!==10)errors.push(`${grid.name} expands to ${slots.length} slots instead of 10`);
  });
  if(identity&&new Set(identity.teams).size!==identity.teams.length)errors.push("stable team IDs must be unique");
  if(identity&&new Set(identity.grids.map((grid)=>grid.id)).size!==identity.grids.length)errors.push("stable grid IDs must be unique");
  if(errors.length)throw new Error(`Invalid ${plan.element} roadmap: ${errors.join("; ")}`);
}
