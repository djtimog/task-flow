import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { UserType } from "../../lib/type";

export default function ProjectList({ user }: { user: UserType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {user.projects.length > 0 &&
          user.projects.map((project) => (
            <div
              key={project.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                {project.members.length} members
              </span>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
