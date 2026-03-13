import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { TooltipProvider } from "../../components/ui/tooltip";
import DashboardHeader from "../../components/dashboard-header";

function DashboardLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <DashboardHeader />
          <Outlet />
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default DashboardLayout;
