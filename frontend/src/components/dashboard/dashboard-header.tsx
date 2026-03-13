import { CreateProjectForm } from "../dashboard/create-project";
import { ModeToggle } from "../ui/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import NotificationButton from "../dashboard/notification-button";

function DashboardHeader() {
  return (
    <div className="w-full border-b border-border bg-background/80 backdrop-blur-sm px-5 py-3">
      <div className="flex justify-between w-full">
        <SidebarTrigger />
        <div className="flex gap-5">
          <CreateProjectForm />
          <div className="flex gap-2">
            <ModeToggle />
            <NotificationButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
