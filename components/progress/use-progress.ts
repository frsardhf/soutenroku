"use client";

import {useCallback} from "react";
import {useAccount} from "./account-provider";
import type {ProgressItemId} from "@/lib/progress";

export function useProgress(){
  const {account,setComplete}=useAccount();
  const toggle=useCallback((itemId:ProgressItemId)=>setComplete(itemId,!account.progress[itemId]),[account.progress,setComplete]);
  return {values:account.progress,setComplete,toggle};
}
