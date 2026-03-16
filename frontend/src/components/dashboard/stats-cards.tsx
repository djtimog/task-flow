import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { UserType } from "../../lib/type";

export default function StatsCards({ user }: { user: UserType }) {
  const completedTasks = user.assignedTasks.filter(
    (tasks) => tasks.isDone === true,
  );
  const stats = [
    { title: "Total Projects", value: user.projects.length },
    { title: "Active Tasks", value: user.assignedTasks.length },
    { title: "Completed Tasks", value: completedTasks.length },
    {
      title: "Participating Projects",
      value: user.participatingProjects.length,
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
