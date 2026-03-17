import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { route } from "../../lib/routes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchemas, type ForgotPasswordValues } from "../../lib/zod-tools";
import { forgetPassword } from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function ForgotPassword() {
  const [loginViaEmail, setLoginViaEmail] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ZodSchemas.ForgotPassword),
    defaultValues: {
      method: "email",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordValues) => {
      return await forgetPassword(data);
    },
    retry: false,
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Reset instructions sent! Check your inbox.");
      },
      onError: (error) => {
        console.error("Forgot password failed:", error);
        toast.error(`Error: ${error}`);
      },
    });
  };

  const isPending = forgotPasswordMutation.isPending;

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <p className="text-muted-foreground text-sm">Reset your password</p>
        </div>

        <div className="flex self-end items-center space-x-2">
          <Label htmlFor="login-mode">Via Email</Label>
          <Switch
            id="login-mode"
            defaultChecked
            onCheckedChange={(checked) => {
              setLoginViaEmail(checked);
              setValue("method", checked ? "email" : "username");
            }}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {loginViaEmail ? (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.method && (
                  <span className="text-red-500 text-xs">
                    {errors.method?.message}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="john"
                  {...register("username")}
                />
                {errors.method && (
                  <span className="text-red-500 text-xs">
                    {errors.method?.message}
                  </span>
                )}
              </div>
            )}

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Send Reset Instructions"}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Remembered your password?
          <Link to={route.auth.login}>
            <Button variant="link">Login</Button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
