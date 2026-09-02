"use client";

import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from "react";
import {
  createEmptyAccount,
  localAccountRepository,
  mergeAccounts,
  SOUTENROKU_STORAGE_KEY,
  type ProgressItemId,
  type RoadmapSelection,
  type SoutenrokuAccount,
} from "@/lib/progress";

interface AccountContextValue {
  account:SoutenrokuAccount;
  hydrated:boolean;
  persistenceError:boolean;
  setComplete:(itemId:ProgressItemId,complete:boolean)=>void;
  setRoadmapSelection:(element:string,selection:RoadmapSelection)=>void;
  importAccount:(incoming:SoutenrokuAccount,mode:"merge"|"replace")=>void;
  resetAccount:()=>void;
}

const AccountContext=createContext<AccountContextValue|null>(null);

export function AccountProvider({children}:{children:ReactNode}){
  const [account,setAccount]=useState<SoutenrokuAccount>(()=>createEmptyAccount());
  const [hydrated,setHydrated]=useState(false);
  const [persistenceError,setPersistenceError]=useState(false);

  useEffect(()=>{
    let active=true;
    void localAccountRepository.load().then((loaded)=>{if(active){setAccount(loaded);setHydrated(true)}});
    return()=>{active=false};
  },[]);

  useEffect(()=>{
    function sync(event:StorageEvent){
      if(event.key!==SOUTENROKU_STORAGE_KEY)return;
      void localAccountRepository.load().then(setAccount);
    }
    window.addEventListener("storage",sync);
    return()=>window.removeEventListener("storage",sync);
  },[]);

  const commit=useCallback((update:(current:SoutenrokuAccount)=>SoutenrokuAccount)=>{
    setAccount((current)=>{
      const next={...update(current),updatedAt:new Date().toISOString()};
      void localAccountRepository.save(next).then((saved)=>setPersistenceError(!saved));
      return next;
    });
  },[]);

  const setComplete=useCallback((itemId:ProgressItemId,complete:boolean)=>{
    if(!itemId.trim())return;
    commit((current)=>({...current,progress:{...current.progress,[itemId]:complete}}));
  },[commit]);

  const setRoadmapSelection=useCallback((element:string,selection:RoadmapSelection)=>{
    commit((current)=>({...current,roadmapSelections:{...current.roadmapSelections,[element]:selection}}));
  },[commit]);

  const importAccount=useCallback((incoming:SoutenrokuAccount,mode:"merge"|"replace")=>{
    commit((current)=>mode==="merge"?mergeAccounts(current,incoming):incoming);
  },[commit]);

  const resetAccount=useCallback(()=>{
    const empty=createEmptyAccount();
    setAccount(empty);
    void localAccountRepository.clear().then((cleared)=>setPersistenceError(!cleared));
  },[]);

  const value=useMemo(()=>({account,hydrated,persistenceError,setComplete,setRoadmapSelection,importAccount,resetAccount}),[account,hydrated,persistenceError,setComplete,setRoadmapSelection,importAccount,resetAccount]);
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount(){
  const context=useContext(AccountContext);
  if(!context)throw new Error("useAccount must be used inside AccountProvider");
  return context;
}
