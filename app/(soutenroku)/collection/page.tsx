import type {Metadata} from "next";
import {CollectionPage} from "@/components/collection/collection-page";

export const metadata:Metadata={title:"Collection Tracker — Soutenroku",description:"Track GBF characters and summons with Gamewith and Kamigame ratings, grades, and effect filters."};
export default function Page(){return <CollectionPage/>}
