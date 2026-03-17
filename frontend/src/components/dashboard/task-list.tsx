import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import type { UserType } from "../../lib/type";

export default function TaskList({ user }: { user: UserType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {user.assignedTasks.length > 0 ? (
          user.assignedTasks.map((task) => (
            <div
              key={task.title}
              className="flex justify-between border p-3 rounded-lg"
            >
              <p>{task.title}</p>
              <Badge
                className={`text-black ${task.isDone ? "bg-green-500" : "bg-yellow-500"}`}
              >
                {task.isDone ? "Finished" : "Pending"}
              </Badge>
            </div>
          ))
        ) : (
          <div>{/* a create tasks button */}</div>
        )}
      </CardContent>
    </Card>
  );
}
