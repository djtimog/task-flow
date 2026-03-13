import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function ProjectHeader({ project }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Created {project.createdAt}
          </p>
        </div>

        <Button>Create Task</Button>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{project.description}</p>
      </CardContent>
    </Card>
  );
}
