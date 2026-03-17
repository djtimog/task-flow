import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { TooltipProvider } from "../../components/ui/tooltip";
import DashboardHeader from "../../components/dashboard/dashboard-header";
import { UserProvider } from "../../providers/dashboard-provider";

function DashboardLayout() {
  return (
    <UserProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <DashboardHeader />
            <Outlet />
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </UserProvider>
  );
}

export default DashboardLayout;
