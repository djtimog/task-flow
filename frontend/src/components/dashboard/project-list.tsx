import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const projects = [
  {
    name: "Mobile App",
    description: "Develop the new company mobile app",
    members: 5,
  },
  {
    name: "Website Redesign",
    description: "Improve landing page and UI",
    members: 3,
  },
  {
    name: "Marketing Campaign",
    description: "Prepare launch campaign",
    members: 4,
  },
];

export default function ProjectList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div>
              <p className="font-medium">{project.name}</p>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {project.members} members
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
