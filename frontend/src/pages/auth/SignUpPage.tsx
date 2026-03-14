import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { route } from "../../lib/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchemas, type RegisterValues } from "../../lib/zod-tools";
import { registerUser } from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(ZodSchemas.RegisterUser),
  });
  const signupMutation = useMutation({
    mutationFn: async (data: RegisterValues) => await registerUser(data),
    retry: false,
  });

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterValues) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        navigate(route.auth.confirmEmail);
      },
      onError: (error) => {
        console.error("Signup failed:", error);
        toast.error(`Error: ${error}`);
      },
    });
  };

  const isPending = signupMutation.isPending;

  return (
    <>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <p className="text-muted-foreground text-sm">Create your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John"
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-red-500 text-xs">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

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

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirm")}
                />
                {errors.confirm && (
                  <span className="text-red-500 text-xs">
                    {errors.confirm.message}
                  </span>
                )}
              </div>

              <Button
                className="w-full mt-1"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Link to={route.auth.login}>
              <Button variant={"link"}>Login</Button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
