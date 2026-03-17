import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    // <div className="p-6 space-y-6">
    //   <div>
    //     <h1 className="text-2xl font-bold">Notifications</h1>
    //     <p className="text-muted-foreground">
    //       Stay updated with project activity
    //     </p>
    //   </div>

    //   {notifications.length === 0 ? (
    //     <EmptyNotification />
    //   ) : (
    //     <NotificationList notifications={notifications} />
    //   )}
    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <Bell size={28} />
      Coming soon...
    </div>
  );
}
