import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const stats = [
  { title: "Total Projects", value: 8 },
  { title: "Active Tasks", value: 24 },
  { title: "Completed Tasks", value: 96 },
  { title: "Team Members", value: 12 },
];

export default function StatsCards() {
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
