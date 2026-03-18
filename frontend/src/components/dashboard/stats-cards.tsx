import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FolderKanban, ListTodo, CheckCircle2, Users } from "lucide-react";
import type { UserType } from "../../lib/type";

export default function StatsCards({ user }: { user: UserType }) {
  const completedTasks = user.assignedTasks.filter(
    (tasks) => tasks.isDone === true,
  );

  const stats = [
    {
      title: "Total Projects",
      value: user.projects.length,
      icon: FolderKanban,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Tasks",
      value: user.assignedTasks.length - completedTasks.length,
      icon: ListTodo,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Completed Tasks",
      value: completedTasks.length,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Participating Projects",
      value: user.participatingProjects.length,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
