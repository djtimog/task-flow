import { Link } from "react-router-dom";
import { route } from "../../lib/routes";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

function NotificationButton() {
  return (
    <Link to={route.dashboard.notification}>
      <Button size={"icon"} variant={"outline"}>
        <Bell />
      </Button>
    </Link>
  );
}

export default NotificationButton;
