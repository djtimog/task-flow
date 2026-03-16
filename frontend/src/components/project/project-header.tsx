import type { ProjectType } from "../../lib/type";
import { Button } from "../ui/button";

export default function ProjectHeader({ project }: { project: ProjectType }) {
  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {project.title}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
            {project.description}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span>
              Created by
              <span className="text-gray-600 font-medium">
                {project.creator.username}
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
        <Button className="flex-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New task
        </Button>
      </div>
    </header>
  );
}
