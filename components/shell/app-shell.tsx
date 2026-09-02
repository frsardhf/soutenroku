import type {ReactNode} from "react";
import {DesktopSidebar,MobileHeader} from "./soutenroku-sidebar";
import {AccountProvider} from "@/components/progress/account-provider";

export function AppShell({children}:{children:ReactNode}){
  return <AccountProvider><div className="app-shell"><DesktopSidebar/><MobileHeader/><main className="app-content">{children}</main></div></AccountProvider>;
}
