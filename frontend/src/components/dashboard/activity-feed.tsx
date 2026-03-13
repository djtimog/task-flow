import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const activity = [
  "John created a new project",
  "Sarah completed a task",
  "David joined the team",
  "Anna updated project details",
];

export default function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {activity.map((item, i) => (
          <p key={i} className="text-sm border-b pb-2 last:border-none">
            {item}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
