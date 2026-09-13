import type {Metadata} from "next";
import {RevansGuide} from "@/components/guides/revans-guide";

export const metadata:Metadata={title:"Revans Raids — Soutenroku",description:"Account-specific host, rescue, and Full Auto plans for all six Revans raids."};
export default function Page(){return <RevansGuide/>}
