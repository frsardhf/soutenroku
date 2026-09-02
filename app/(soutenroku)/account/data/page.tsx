import type {Metadata} from "next";
import {DataPage} from "@/components/account/data-page";

export const metadata:Metadata={title:"Local Data — Soutenroku",description:"Export, import, or reset the local Soutenroku account."};
export default function Page(){return <DataPage/>}
