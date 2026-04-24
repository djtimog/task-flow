import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

import { Link } from "react-router-dom";
import { route } from "../../lib/routes";

export function DashboardLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to={route.index}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img src="/logo.png" alt="Logo" className="h-6" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">TaskFlow</span>
              <span className="truncate text-xs">Application</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
