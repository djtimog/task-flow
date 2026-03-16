import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { UserType } from "../../lib/type";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function ProjectList({ user }: { user: UserType }) {
  const [showMore, setShowMore] = useState(false);

  const projectsToShow = showMore ? user.projects : user.projects.slice(0, 3);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {projectsToShow.map((project) => (
          <Link
            className="flex justify-between items-center border p-3 rounded-lg"
            to={`/dashboard/projects/${project.id}`}
            key={project.id}
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
          </Link>
        ))}
        {user.projects.length > 3 && (
          <Button variant={"link"} onClick={() => setShowMore((prev) => !prev)}>
            {showMore ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
