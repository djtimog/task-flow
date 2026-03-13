import { CreateProjectForm } from "./dashboard/create-project";
import { ModeToggle } from "./ui/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

function DashboardHeader() {
  return (
    <div className="w-full border-b border-border bg-background/80 backdrop-blur-sm px-5 py-3">
      <div className="flex justify-between w-full">
        <SidebarTrigger />
        <div className="flex gap-7">
          <CreateProjectForm />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
