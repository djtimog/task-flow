import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function ProjectTasks({ tasks }: any) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {tasks.map((task: any) => (
          <div
            key={task.id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <p>{task.title}</p>

            <Badge variant="secondary">{task.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
