import { Button } from "../ui/button";
import { Bell } from "lucide-react";

export default function NotificationItem({ notification }: any) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-3 ${
        notification.read ? "opacity-70" : "bg-muted/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-muted rounded-md">
          <Bell size={16} />
        </div>

        <div>
          <p className="text-sm">{notification.message}</p>
          <p className="text-xs text-muted-foreground">{notification.time}</p>
        </div>
      </div>

      {!notification.read && (
        <Button size="sm" variant="ghost">
          Mark as read
        </Button>
      )}
    </div>
  );
}
