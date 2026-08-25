import type {Metadata} from "next";
import {ManadiverGuide} from "@/components/guides/manadiver-guide";

export const metadata:Metadata={title:"Manadiver Guide — Soutenroku",description:"A sourced Manadiver setup guide with CA settings, Manatura choices, action order, EMP priorities, and account-specific use."};
export default function Page(){return <ManadiverGuide/>}
