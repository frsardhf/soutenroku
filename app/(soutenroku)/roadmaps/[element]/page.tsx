import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {RoadmapPage} from "@/components/roadmaps/roadmap-page";
import {roadmapAdvice,roadmapAdviceReviewedAt} from "@/data/roadmap-advice";
import {elementIds,getRoadmap} from "@/data/roadmaps";
import {validateRoadmap} from "@/data/validate-roadmaps";

export function generateStaticParams(){return elementIds.map((element)=>({element}))}

export async function generateMetadata({params}:{params:Promise<{element:string}>}):Promise<Metadata>{
  const {element}=await params;const plan=getRoadmap(element);
  return plan?{title:`${plan.element} Teams — Soutenroku`,description:`${plan.element} account-specific team templates and researched spark targets.`}:{};
}

export default async function ElementRoadmap({params}:{params:Promise<{element:string}>}){
  const {element}=await params;
  const plan=getRoadmap(element);
  if(!plan||!elementIds.includes(element as (typeof elementIds)[number]))notFound();
  validateRoadmap(plan);
  const elementId=element as (typeof elementIds)[number];
  const viewPlan={element:plan.element,subtitle:plan.subtitle,current:plan.current,color:plan.color,teams:plan.teams};
  return <RoadmapPage plan={viewPlan} advice={roadmapAdvice[elementId]} reviewedAt={roadmapAdviceReviewedAt}/>;
}
