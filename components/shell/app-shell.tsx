import type {ReactNode} from "react";
import {DesktopSidebar,MobileHeader} from "./skylog-sidebar";

export function AppShell({children}:{children:ReactNode}){
  return <div className="app-shell"><DesktopSidebar/><MobileHeader/><main className="app-content">{children}</main></div>;
}
