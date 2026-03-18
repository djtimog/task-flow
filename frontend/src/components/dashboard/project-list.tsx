import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { ProjectType } from "../../lib/type";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowUpRightIcon } from "lucide-react";

export default function ProjectList({
  title,
  projects,
}: {
  title: string;
  projects: ProjectType[];
}) {
  const [showMore, setShowMore] = useState(false);

  const projectsToShow = showMore ? projects : projects.slice(0, 3);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      {projects.length > 0 ? (
        <CardContent className="space-y-4">
          {projectsToShow.map((project) => (
            <Link
              className="flex justify-between items-center border p-3 rounded-lg"
              to={`/dashboard/projects/${project.id}`}
              key={project.id}
            >
              <div>
                <p className="font-medium flex items-center gap-1 hover:underline">
                  {project.title} <ArrowUpRightIcon size={"10"} />
                </p>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                {project.members.length} members
              </span>
            </Link>
          ))}
          {projects.length > 3 && (
            <Button
              variant={"link"}
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "Show Less" : "Show More"}
            </Button>
          )}
        </CardContent>
      ) : (
        <CardContent>No Project Yet!</CardContent>
      )}
    </Card>
  );
}
