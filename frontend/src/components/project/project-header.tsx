import { Plus } from "lucide-react";
import type { ProjectType } from "../../lib/type";
import { Button } from "../ui/button";

export default function ProjectHeader({ project }: { project: ProjectType }) {
  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold ">
            {project.title.toUpperCase()}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5 max-w-lg">
            {project.description}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span>
              Created by{" "}
              <span className="text-shadow-muted-foreground font-medium">
                {project.creator.username.toUpperCase()}
              </span>
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Active
            </span>
            <span>
              {project.members.length} member
              {project.members.length !== 1 ? "s" : ""} · {project.tasks.length}{" "}
              task{project.tasks.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <Button variant={"outline"}>
          <Plus />
          New task
        </Button>
      </div>
    </header>
  );
}
