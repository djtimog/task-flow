import { Link, Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "../../components/ui/mode-toggle";
import { route } from "../../lib/routes";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../hooks/use-app-selector";

function AuthLayout() {
  const user = useAppSelector((root) => root.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(route.dashboard.index);
      toast.success("User Already Login In");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className=" flex justify-between p-7">
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
