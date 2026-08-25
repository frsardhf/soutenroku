import {cn} from "@/lib/utils";

export function Separator({className,orientation="horizontal"}:{className?:string;orientation?:"horizontal"|"vertical"}){
  return <div role="separator" aria-orientation={orientation} className={cn("ui-separator",orientation==="vertical"&&"ui-separator-vertical",className)}/>;
}
