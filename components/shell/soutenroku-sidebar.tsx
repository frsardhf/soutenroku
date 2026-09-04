"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import * as React from "react";
import {usePathname} from "next/navigation";
import {BookOpen,Compass,Database,Gem,Menu,Route,ShoppingBasket,Sparkles,Swords,Users,UsersRound} from "lucide-react";
import {elementIds,getRoadmap} from "@/data/roadmaps";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Sheet,SheetClose,SheetContent,SheetDescription,SheetTitle,SheetTrigger} from "@/components/ui/sheet";

const guideLinks=[
  {href:"/guides/arcarum",label:"Arcarum path",icon:Compass},
  {href:"/guides/eternals",label:"Eternal plans",icon:UsersRound},
  {href:"/guides/primals",label:"Primals",icon:Gem},
  {href:"/guides/manadiver",label:"Manadiver",icon:Swords},
  {href:"/guides/classes",label:"After Manadiver",icon:Route},
] as const;

const referenceLinks=[
  {href:"/reference/exchanges",label:"Exchange priorities",icon:ShoppingBasket},
  {href:"/reference/skill-levels",label:"Skill leveling",icon:BookOpen},
] as const;

const accountLinks=[
  {href:"/account/data",label:"Local data",icon:Database},
] as const;

const collectionLinks=[
  {href:"/collection",label:"Roster tracker",icon:Users},
  {href:"/collection#filters",label:"Effect finder",icon:Sparkles},
] as const;

function Navigation({mobile=false}:{mobile?:boolean}){
  const pathname=usePathname();
  const link=(href:string,content:React.ReactNode,className:string)=>mobile
    ? <SheetClose asChild><a href={href} className={className} aria-current={pathname===href?"page":undefined}>{content}</a></SheetClose>
    : <a href={href} className={className} aria-current={pathname===href?"page":undefined}>{content}</a>;

  return <nav className="soutenroku-nav" aria-label="Soutenroku">
    <div className="nav-section">
      <span className="nav-label">Roadmaps</span>
      <div className="element-nav-grid">
        {elementIds.map((element)=>{const plan=getRoadmap(element)!;const href=`/roadmaps/${element}`;return <React.Fragment key={element}>{link(href,<><i className="element-dot" style={{"--element-color":plan.color} as React.CSSProperties}/><span>{plan.element}</span></>,cn("element-nav-link",pathname===href&&"is-active"))}</React.Fragment>})}
      </div>
    </div>
    <Separator/>
    <div className="nav-section">
      <span className="nav-label">Collection</span>
      {collectionLinks.map(({href,label,icon:Icon})=><React.Fragment key={href}>{link(href,<><Icon aria-hidden="true"/><span>{label}</span></>,cn("utility-nav-link",pathname==="/collection"&&href==="/collection"&&"is-active"))}</React.Fragment>)}
    </div>
    <div className="nav-section">
      <span className="nav-label">Guides</span>
      {guideLinks.map(({href,label,icon:Icon})=><React.Fragment key={href}>{link(href,<><Icon aria-hidden="true"/><span>{label}</span></>,cn("utility-nav-link",pathname===href&&"is-active"))}</React.Fragment>)}
    </div>
    <div className="nav-section nav-reference">
      <span className="nav-label">Reference</span>
      {referenceLinks.map(({href,label,icon:Icon})=><React.Fragment key={href}>{link(href,<><Icon aria-hidden="true"/><span>{label}</span></>,cn("utility-nav-link",pathname===href&&"is-active"))}</React.Fragment>)}
    </div>
    <div className="nav-section nav-account">
      <span className="nav-label">Account</span>
      {accountLinks.map(({href,label,icon:Icon})=><React.Fragment key={href}>{link(href,<><Icon aria-hidden="true"/><span>{label}</span></>,cn("utility-nav-link",pathname===href&&"is-active"))}</React.Fragment>)}
    </div>
  </nav>;
}

function Brand(){return <a href="/roadmaps/water" className="soutenroku-brand"><span className="brand-mark">蒼</span><span><strong>Soutenroku</strong><small>GBF account plan</small></span></a>}

export function DesktopSidebar(){return <aside className="desktop-sidebar"><Brand/><Navigation/><p className="sidebar-foot">Personal roadmap<br/><time dateTime="2026-09-04">Updated 4 Sep 2026</time></p></aside>}

export function MobileHeader(){return <header className="mobile-header"><Brand/><Sheet><SheetTrigger asChild><Button variant="outline" size="icon" aria-label="Open navigation"><Menu aria-hidden="true"/></Button></SheetTrigger><SheetContent><SheetTitle className="sr-only">Soutenroku navigation</SheetTitle><SheetDescription className="sr-only">Open an element roadmap, guide, or reference page.</SheetDescription><div className="mobile-sheet-brand"><Brand/></div><Navigation mobile/></SheetContent></Sheet></header>}
