import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {RevansDetail} from "@/components/guides/revans-detail";
import {getRevansRaid,revansRaidIds} from "@/data/guides/revans";

export function generateStaticParams(){return revansRaidIds.map((raid)=>({raid}))}
export async function generateMetadata({params}:{params:Promise<{raid:string}>}):Promise<Metadata>{const {raid:id}=await params;const raid=getRevansRaid(id);return raid?{title:`${raid.name} — Soutenroku`,description:raid.recommendation}:{} }
export default async function Page({params}:{params:Promise<{raid:string}>}){const {raid:id}=await params;const raid=getRevansRaid(id);if(!raid)notFound();return <RevansDetail raid={raid}/>}
