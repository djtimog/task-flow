import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { TooltipProvider } from "../../components/ui/tooltip";
import DashboardHeader from "../../components/dashboard/dashboard-header";

import { route } from "../../lib/routes";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/use-app-selector";

function DashboardLayout() {
  const user = useAppSelector((root) => root.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(route.auth.login);
      toast.error("Not Authorised, Login to have Access");
    }
  }, [navigate, user]);

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
