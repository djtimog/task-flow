import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { UserPlus } from "lucide-react";
import { route } from "../../lib/routes";
import { useQuery } from "@tanstack/react-query";
import { acceptInvite } from "../../services/project.service";
import { toast } from "sonner";

export default function AcceptProjectInvite() {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["AcceptProjectInvite", token],
    queryFn: async () => {
      if (!token || !id) {
        toast.error("Unauthorised");
        navigate(route.auth.login);
        throw new Error("Token is missing");
      }
      return await acceptInvite(id, token);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-sm">Accepting invite...</p>
        </div>
      </div>
    );
  }

  if (query.error) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-red-500 font-medium">Something went wrong</p>
          <p className="text-sm text-muted-foreground">{query.error.message}</p>
          <Button variant="outline" asChild>
            <Link to={route.dashboard.index}>Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (query.data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="flex flex-col items-center gap-3">
            <UserPlus className="h-12 w-12 text-green-500" />

            <CardTitle>Invite Accepted</CardTitle>

            <CardDescription className="text-pretty max-w-xs">
              You have successfully joined the project. Head to your dashboard
              to start collaborating with your team.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link to={`/dashboard/projects/${id}`}>Go to Project</Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link to={route.dashboard.index}>Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
