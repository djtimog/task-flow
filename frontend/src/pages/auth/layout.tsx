import { Link, Outlet } from "react-router-dom";
import { ModeToggle } from "../../components/ui/mode-toggle";
import { route } from "../../lib/routes";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container flex justify-between p-7">
        <Link to={route.index}>
          <Button variant={"outline"}>
            <ArrowLeft />
            Go Home
          </Button>
        </Link>
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
