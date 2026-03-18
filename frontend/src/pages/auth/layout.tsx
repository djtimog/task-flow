import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || route.dashboard.index;

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
      toast.success("User Already Login In");
    }
  }, [navigate, user, redirectTo]);

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
