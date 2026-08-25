"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import {useCallback,useEffect,useState} from "react";
import {buildLegacyProgressMap} from "@/data/progress-map";
import {createEmptyProgress,migrateLegacyProgress,writeProgress,type ProgressItemId,type SkylogProgressV2} from "@/lib/progress";

export function useProgress(){
  const [progress,setProgress]=useState<SkylogProgressV2>(()=>createEmptyProgress());

  useEffect(()=>{
    setProgress(migrateLegacyProgress(buildLegacyProgressMap()).progress);
  },[]);

  const setComplete=useCallback((itemId:ProgressItemId,complete:boolean)=>{
    setProgress((current)=>{
      const next:SkylogProgressV2={...current,values:{...current.values,[itemId]:complete},updatedAt:new Date().toISOString()};
      writeProgress(next);
      return next;
    });
  },[]);

  const toggle=useCallback((itemId:ProgressItemId)=>{
    setProgress((current)=>{
      const next:SkylogProgressV2={...current,values:{...current.values,[itemId]:!current.values[itemId]},updatedAt:new Date().toISOString()};
      writeProgress(next);
      return next;
    });
  },[]);

  return {values:progress.values,setComplete,toggle};
}
