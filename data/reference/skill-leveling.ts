export const standardSkillCosts = [200,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,15000,16000,17000,18000,19000] as const;

export const opusSkillCosts = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,25000,26666,28333,30000,31666,33333,35000,36666,38333,40000] as const;

export const skillPointValues = [
  {label:"R SL1",points:25},
  {label:"SR SL1",points:100},
  {label:"SSR SL1",points:1000},
  {label:"SSR SL10",points:10000},
] as const;

const ssrFodderOptions = [4,3,2,1] as const;

export function formatPoints(value:number){
  return value.toLocaleString("en-US");
}

export function optimizedSsrFodder(units:number){
  let remaining=units;
  const pieces:string[]=[];
  for(const level of ssrFodderOptions){
    const count=Math.floor(remaining/level);
    if(count){pieces.push(`SSR SL${level} ×${count}`);remaining-=count*level;}
  }
  return pieces.join(" + ");
}

export function efficientFodderRecipe(cost:number){
  const ssrUnits=Math.ceil(cost/1000);
  const waste=ssrUnits*1000-cost;
  return `${optimizedSsrFodder(ssrUnits)}${waste?` · ${formatPoints(waste)} pts over`:""}`;
}

export function ssrSl1Equivalent(cost:number){
  return cost<1000?(cost/1000).toFixed(1):cost%1000===0?String(cost/1000):(cost/1000).toFixed(3);
}
