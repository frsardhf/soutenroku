import type {Metadata} from "next";
import {SkillLevelPage} from "@/components/reference/skill-level-page";

export const metadata:Metadata={title:"Weapon Skill Leveling — Soutenroku",description:"Standard and Dark Opus weapon skill costs with SSR-only fodder recipes."};
export default function Page(){return <SkillLevelPage/>}
