import {exchangeItemId,type ExchangeItem,type ExchangeTab} from "@/data/reference/exchanges";
import {gridId} from "@/data/roadmap-identity";
import {type Grid,type Plan} from "@/data/roadmaps";
import {getMonthlyExchangeProgressId,type ProgressItemId} from "@/lib/progress";

export type WeaponSlot={quantity:string;name:string;note:string;copy:number;index:number;stableId:string};

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
