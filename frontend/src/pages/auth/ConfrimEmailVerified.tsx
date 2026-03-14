"use client";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { route } from "../../lib/routes";
import { useQuery } from "@tanstack/react-query";
import { registerConfirmEmail } from "../../services/auth.service";
import { toast } from "sonner";

export default function ConfirmEmailVerified() {
  const { token } = useParams();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["ConfirmEmail"],
    queryFn: async () => {
      if (!token) {
        toast.error("Unauthorised");
        navigate("/auth/signup");
        throw new Error("Token is missing");
      }
      return await registerConfirmEmail(token);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (query.isLoading) {
    toast.loading("Loading...");
    return (
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (query.error) {
    toast.error(query.error.message);
    return (
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-red-500 font-medium">Something went wrong</p>
          <p className="text-sm text-muted-foreground">{query.error.message}</p>
        </div>
      </div>
    );
  }
  if (query.data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-12 w-12 text-green-500" />

            <CardTitle>Email Confirmed</CardTitle>

            <CardDescription className="text-pretty max-w-xs">
              Your email has been successfully verified. You can now access your
              TaskFlow workspace.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link to={route.dashboard.index}>Go to Dashboard</Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link to={route.auth.login}>Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  return null;
}
