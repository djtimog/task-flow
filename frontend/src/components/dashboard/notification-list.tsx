import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NotificationItem from "./notification.item";

export default function NotificationList({ notifications }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {notifications.map((notification: any) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </CardContent>
    </Card>
  );
}
