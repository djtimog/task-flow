import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Mail } from "lucide-react";

export default function ConfirmEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-md">
        <CardHeader className="flex flex-col items-center gap-3 pb-2">
          <div className="bg-primary/10 p-4 rounded-full">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            We've sent a verification link to your email address. Click the
            button in the email to verify your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 pt-4">
          <Button className="w-full" asChild>
            <a href="https://mail.google.com" target="_blank" rel="noopener">
              Open Email App
            </a>
          </Button>

          <p className="text-sm text-muted-foreground">
            Didn't receive it?{" "}
            <button className="text-primary font-medium underline-offset-4 hover:underline">
              Resend email
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
