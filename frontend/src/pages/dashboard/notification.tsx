"use client";

import NotificationList from "../../components/dashboard/notification-list";
import { EmptyNotification } from "../../components/dashboard/empty-notification";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      message: "John added you to the Mobile App project",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Sarah completed task: Setup database",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "New task assigned: Design dashboard UI",
      time: "Yesterday",
      read: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with project activity
        </p>
      </div>

      {notifications.length === 0 ? (
        <EmptyNotification />
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </div>
  );
}
