import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {RoadmapPage} from "@/components/roadmaps/roadmap-page";
import {elementIds,getRoadmap} from "@/data/roadmaps";
import {validateRoadmap} from "@/data/validate-roadmaps";

export function generateStaticParams(){return elementIds.map((element)=>({element}))}

export async function generateMetadata({params}:{params:Promise<{element:string}>}):Promise<Metadata>{
  const {element}=await params;const plan=getRoadmap(element);
  return plan?{title:`${plan.element} Roadmap — Soutenroku`,description:`${plan.element} ${plan.subtitle} team, grid, Opus, mastery, awakening, and ring roadmap.`}:{};
}

export default async function ElementRoadmap({params}:{params:Promise<{element:string}>}){
  const {element}=await params;
  const plan=getRoadmap(element);
  if(!plan||!elementIds.includes(element as (typeof elementIds)[number]))notFound();
  validateRoadmap(plan);
  return <RoadmapPage plan={plan}/>;
}
