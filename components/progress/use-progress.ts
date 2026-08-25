"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import {useCallback,useEffect,useState} from "react";
import {createEmptyProgress,readProgress,writeProgress,type ProgressItemId,type SoutenrokuProgress} from "@/lib/progress";

export function useProgress(){
  const [progress,setProgress]=useState<SoutenrokuProgress>(()=>createEmptyProgress());

  useEffect(()=>{
    setProgress(readProgress());
  },[]);

  const setComplete=useCallback((itemId:ProgressItemId,complete:boolean)=>{
    setProgress((current)=>{
      const next:SoutenrokuProgress={...current,values:{...current.values,[itemId]:complete},updatedAt:new Date().toISOString()};
      writeProgress(next);
      return next;
    });
  },[]);

  const toggle=useCallback((itemId:ProgressItemId)=>{
    setProgress((current)=>{
      const next:SoutenrokuProgress={...current,values:{...current.values,[itemId]:!current.values[itemId]},updatedAt:new Date().toISOString()};
      writeProgress(next);
      return next;
    });
  },[]);

  return {values:progress.values,setComplete,toggle};
}
