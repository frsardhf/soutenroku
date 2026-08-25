import {exchangeItemId,exchangeTabs,type ExchangeItem,type ExchangeTab} from "@/data/reference/exchanges";
import {gridId,weaponGroupIds} from "@/data/roadmap-identity";
import {plans,type Grid,type Plan} from "@/data/roadmaps";
import {getMonthlyExchangeProgressId,type LegacyProgressIdMap,type ProgressItemId} from "@/lib/progress";

export type WeaponSlot={quantity:string;name:string;note:string;copy:number;index:number;stableId:string};

// The unscoped legacy checklist was replaced in August 2026. Pin its monthly
// booleans to that deployment month so a delayed first visit cannot complete a
// future month's reset stock.
export const LEGACY_MONTHLY_MIGRATION_DATE=new Date(2026,7,1);

export function expandWeaponSlots(weapons:Grid["weapons"],groupIds:readonly string[]):WeaponSlot[]{
  let index=0;
  return weapons.flatMap(([quantity,name,note],groupIndex)=>{
    const groupId=groupIds[groupIndex];
    if(!groupId)throw new Error(`Missing stable weapon group ID for ${name}`);
    const count=quantity==="MH"?1:Number(quantity.replace(/[^0-9]/g,""))||1;
    return Array.from({length:count},(_,copy)=>({quantity,name,note,copy,index:index++,stableId:`${groupId}:${copy+1}`}));
  });
}

export function weaponProgressId(plan:Plan,gridIndex:number,slot:WeaponSlot):ProgressItemId{
  return `weapon:${gridId(plan,gridIndex)}:${slot.stableId}`;
}

export function exchangeProgressId(section:Pick<ExchangeTab,"id">,item:Pick<ExchangeItem,"id"|"tag">,date=new Date()):ProgressItemId{
  return item.tag==="MONTHLY"
    ? getMonthlyExchangeProgressId(item.id,date)
    : exchangeItemId(section.id,item.id);
}

export function buildLegacyProgressMap(date=new Date()):LegacyProgressIdMap{
  const entries:[string,ProgressItemId][]=[];
  for(const plan of plans)for(let gridIndex=0;gridIndex<plan.grids.length;gridIndex++){
    const grid=plan.grids[gridIndex];
    for(const slot of expandWeaponSlots(grid.weapons,weaponGroupIds(plan,gridIndex))){
      entries.push([`${plan.element}-${grid.name}-${slot.name}-${slot.copy}`,weaponProgressId(plan,gridIndex,slot)]);
    }
  }
  for(const section of exchangeTabs)for(const item of section.items){
    const migrationDate=item.tag==="MONTHLY"?LEGACY_MONTHLY_MIGRATION_DATE:date;
    entries.push([`Exchange-${section.name}-${item.name}`,exchangeProgressId(section,item,migrationDate)]);
  }
  return Object.fromEntries(entries);
}
