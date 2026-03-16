import type { ProjectType } from "../../lib/type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function ProjectTasks({ project }: { project: ProjectType }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-700">TaskList</h2>
        {project.tasks.length > 0 && (
          <Button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            + Add task
          </Button>
        )}
      </div>

      {project.tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 px-4 text-center border border-dashed border-gray-200 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-500"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">No tasks yet</p>
            <p className="text-xs text-gray-500 mt-1 max-w-55">
              Break your project into actionable tasks for the team.
            </p>
          </div>
          <Button className="mt-1 px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors">
            + Create first task
          </Button>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-10 px-3 py-2.5" />
                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500">
                  Task
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 w-32">
                  Assigned to
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 w-24">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {project.tasks.map((task, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      // onChange={(e) => onToggle(i, e.target.checked)}
                      placeholder={`${task.title} task`}
                      className="w-4 h-4 rounded accent-gray-900 cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <p
                      className={`font-medium leading-tight ${task.isDone ? "line-through text-gray-400" : "text-gray-900"}`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-65">
                      {task.description}
                    </p>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <Avatar size="sm">
                        <AvatarFallback>
                          {task.assignedTo.username.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600 truncate">
                        {task.assignedTo.username.split(" ")[0]}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                        task.isDone
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${task.isDone ? "bg-green-500" : "bg-gray-400"}`}
                      />
                      {task.isDone ? "Done" : "To do"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
