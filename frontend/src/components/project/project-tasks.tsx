import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProjectType, TaskType } from "../../lib/type";
import { updateTaskStatus } from "../../services/project.service";
import { UserAvatar } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { CreateTaskForm } from "./create-task";
import { Loader2 } from "lucide-react";
import { useUser } from "../../providers/dashboard-provider";

export default function ProjectTasks({ project }: { project: ProjectType }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">TaskList</h2>
        {project.tasks.length > 0 && <CreateTaskForm project={project} />}
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
              className="text-muted-foreground"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              No tasks yet
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-55">
              Break your project into actionable tasks for the team.
            </p>
          </div>
          <CreateTaskForm project={project} />
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="w-10 px-3 py-2.5" />
                <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Task
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground w-32">
                  Assigned to
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground w-24">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-100">
              {[...project.tasks].reverse().map((task) => (
                <TableContent
                  task={task}
                  key={task.id}
                  projectId={project.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const TableContent = ({
  projectId,
  task,
}: {
  projectId: string;
  task: TaskType;
}) => {
  const user = useUser();

  const queryClient = useQueryClient();

  const changeMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: boolean }) =>
      await updateTaskStatus(projectId, { taskId: id, isDone: !status }),
  });

  const changeCheck = async (id: string, status: boolean) => {
    changeMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ["Project"] });
          queryClient.refetchQueries({ queryKey: ["User"] });
        },
      },
    );
  };

  return (
    <tr>
      <td className="px-3 py-3">
        {task.assignedTo.email == user.email &&
          (!changeMutation.isPending ? (
            <Checkbox
              checked={task.isDone}
              onCheckedChange={async () =>
                await changeCheck(task.id, task.isDone)
              }
            />
          ) : (
            <Loader2 className="animate-spin repeat-infinite" size={12} />
          ))}
      </td>
      <td className="px-3 py-3">
        <p
          className={`font-medium leading-tight ${task.isDone && "line-through text-gray-400"}`}
        >
          {task.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate max-w-65">
          {task.description}
        </p>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-1.5">
          <UserAvatar username={task.assignedTo.username} size={"sm"} />
          <span className="text-xs text-muted-foreground truncate">
            {task.assignedTo.username.split(" ")[0]}
          </span>
        </div>
      </td>
      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
            task.isDone ? " text-green-800" : "text-foreground"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${task.isDone ? "bg-green-500" : "bg-gray-400"}`}
          />
          {task.isDone ? "Done" : "To do"}
        </span>
      </td>
    </tr>
  );
};
