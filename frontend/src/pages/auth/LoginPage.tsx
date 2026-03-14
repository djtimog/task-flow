import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { route } from "../../lib/routes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchemas, type LoginValues } from "../../lib/zod-tools";
import { loginUser } from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../lib/store";
import { initializeUser } from "../../reducers/user.reducer";

function LoginPage() {
  const [loginViaEmail, setLoginViaEmail] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(ZodSchemas.LoginUser),
    defaultValues: {
      method: "email",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginValues) => await loginUser(data),
    retry: false,
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginValues) => {
    loginMutation.mutate(data, {
      onSuccess: (result) => {
        const token = result.token as string;
        initializeUser(token, dispatch);
        navigate(route.dashboard.index);
      },
      onError: (error) => {
        console.error("Login failed:", error);
        toast.error(`Error: ${error}`);
      },
    });
  };

  const isPending = loginMutation.isPending;

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <p className="text-muted-foreground text-sm">Manage your tasks</p>
        </div>

        <div className="flex self-end items-center space-x-2">
          <Label htmlFor="login-mode">Login via Email</Label>
          <Switch
            id="login-mode"
            defaultChecked
            onCheckedChange={(checked) => {
              setLoginViaEmail(checked);
              setValue("method", checked ? "email" : "username"); // 👈 keep Zod in sync
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

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button className="w-full mt-1" type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?
          <Link to={route.auth.signup}>
            <Button variant="link">Sign up</Button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
