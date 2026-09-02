"use client";

import {useRef,useState,type ChangeEvent} from "react";
import {AlertTriangle,CheckCircle2,Download,HardDrive,RotateCcw,Upload} from "lucide-react";
import {useAccount} from "@/components/progress/account-provider";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {createAccountExport,parseAccountExport,type SoutenrokuExport} from "@/lib/progress";

function counts(data:SoutenrokuExport["data"]){
  return {
    progress:Object.values(data.progress).filter(Boolean).length,
    roadmaps:Object.keys(data.roadmapSelections).length,
    characters:Object.keys(data.collection.characters).length,
    summons:Object.keys(data.collection.summons).length,
  };
}

export function DataPage(){
  const {account,hydrated,persistenceError,importAccount,resetAccount}=useAccount();
  const [pending,setPending]=useState<SoutenrokuExport|null>(null);
  const [message,setMessage]=useState<string|null>(null);
  const [error,setError]=useState<string|null>(null);
  const [confirmReset,setConfirmReset]=useState(false);
  const fileInput=useRef<HTMLInputElement>(null);
  const currentCounts=counts(account);
  const pendingCounts=pending?counts(pending.data):null;

  function download(){
    const payload=createAccountExport(account);
    const blob=new Blob([`${JSON.stringify(payload,null,2)}\n`],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement("a");
    anchor.href=url;anchor.download=`soutenroku-${new Date().toISOString().slice(0,10)}.json`;anchor.click();
    URL.revokeObjectURL(url);
    setError(null);setMessage("Backup downloaded.");
  }

  async function chooseFile(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];
    event.target.value="";
    if(!file)return;
    if(file.size>5_000_000){setPending(null);setError("That file is too large. Soutenroku backups must be under 5 MB.");return;}
    const parsed=parseAccountExport(await file.text());
    if(!parsed){setPending(null);setError("This is not a valid Soutenroku account backup, or it uses an unsupported version.");return;}
    setPending(parsed);setError(null);setMessage(null);
  }

  function applyImport(mode:"merge"|"replace"){
    if(!pending)return;
    importAccount(pending.data,mode);
    setPending(null);setError(null);setMessage(mode==="merge"?"Backup merged with this device.":"Device data replaced from backup.");
  }

  function clearData(){
    resetAccount();setPending(null);setConfirmReset(false);setError(null);setMessage("Local account data cleared.");
  }

  return <div className="page-stack data-page">
    <header className="page-header">
      <div><p className="breadcrumb"><span>Account</span></p><h1>Local data</h1><p className="page-intro">Back up or move your Soutenroku progress between devices. Everything remains in this browser unless you export it.</p></div>
      <dl className="stage-summary"><dt>Storage</dt><dd><HardDrive aria-hidden="true"/> This device only</dd></dl>
    </header>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">Account snapshot</span><h2>What is saved</h2></div><p>Roadmap checks and selected team/grid tabs now share one clean, versioned account file. Collection totals are ready for the upcoming tracker.</p></div>
      <div className="data-count-grid" aria-busy={!hydrated}>
        <article><strong>{hydrated?currentCounts.progress:"—"}</strong><span>Completed checks</span></article>
        <article><strong>{hydrated?currentCounts.roadmaps:"—"}</strong><span>Roadmap selections</span></article>
        <article><strong>{hydrated?currentCounts.characters:"—"}</strong><span>Characters tracked</span></article>
        <article><strong>{hydrated?currentCounts.summons:"—"}</strong><span>Summons tracked</span></article>
      </div>
      {persistenceError&&<p className="data-message is-error"><AlertTriangle aria-hidden="true"/>This browser blocked local storage. Changes remain visible for now but may not survive a reload.</p>}
      {message&&<p className="data-message is-success"><CheckCircle2 aria-hidden="true"/>{message}</p>}
      {error&&<p className="data-message is-error"><AlertTriangle aria-hidden="true"/>{error}</p>}
    </section>

    <section className="content-section data-action-grid">
      <article className="data-action-card">
        <Badge>Recommended first</Badge><Download aria-hidden="true" className="data-action-icon"/><h2>Export backup</h2><p>Download a readable JSON snapshot before clearing browser data or moving to another computer.</p>
        <Button onClick={download} disabled={!hydrated}><Download aria-hidden="true"/>Download JSON</Button>
      </article>
      <article className="data-action-card">
        <Badge>Restore or combine</Badge><Upload aria-hidden="true" className="data-action-icon"/><h2>Import backup</h2><p>Select a Soutenroku JSON file. You can inspect its totals before choosing how it changes this device.</p>
        <input ref={fileInput} className="sr-only" type="file" accept="application/json,.json" onChange={chooseFile}/>
        <Button variant="outline" onClick={()=>fileInput.current?.click()}><Upload aria-hidden="true"/>Choose JSON file</Button>
      </article>
    </section>

    {pending&&pendingCounts&&<section className="data-import-preview" aria-live="polite">
      <div><span className="section-kicker">Import preview</span><h2>Backup from {new Date(pending.exportedAt).toLocaleString()}</h2><p>{pendingCounts.progress} checks · {pendingCounts.roadmaps} roadmap selections · {pendingCounts.characters} characters · {pendingCounts.summons} summons</p></div>
      <div className="data-import-actions"><Button onClick={()=>applyImport("merge")}><Upload aria-hidden="true"/>Merge with current</Button><Button variant="outline" onClick={()=>applyImport("replace")}>Replace current</Button><Button variant="ghost" onClick={()=>setPending(null)}>Cancel</Button></div>
      <p><strong>Merge</strong> keeps existing records and lets the imported backup win where the same item exists. <strong>Replace</strong> overwrites all local account data.</p>
    </section>}

    <section className="content-section danger-zone">
      <div><span className="section-kicker">Reset</span><h2>Clear this device</h2><p>Use this only when you want a completely fresh local account. Export first if you may need the data again.</p></div>
      {!confirmReset?<Button variant="outline" onClick={()=>setConfirmReset(true)}><RotateCcw aria-hidden="true"/>Clear local data</Button>:<div className="reset-confirm"><strong>Clear all local Soutenroku data?</strong><div><Button onClick={clearData}>Yes, clear it</Button><Button variant="ghost" onClick={()=>setConfirmReset(false)}>Cancel</Button></div></div>}
    </section>
  </div>;
}
