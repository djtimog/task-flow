import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const tasks = [
  { title: "Design login page", status: "In Progress" },
  { title: "Connect backend API", status: "Todo" },
  { title: "Setup database", status: "Done" },
  { title: "Create project UI", status: "In Progress" },
];

export default function TaskList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex justify-between border p-3 rounded-lg"
          >
            <p>{task.title}</p>
            <Badge>{task.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
