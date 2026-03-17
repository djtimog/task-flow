import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { route } from "../../lib/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchemas, type ResetPasswordValues } from "../../lib/zod-tools";
import { resetPassword } from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(ZodSchemas.ResetPassword),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordValues) => {
      if (!token) return;
      await resetPassword(token, data.password);
    },
    retry: false,
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset successful!");
        navigate(route.auth.login);
      },
      onError: (error) => {
        console.error("Reset password failed:", error);
        toast.error(`Error: ${error}`);
      },
    });
  };

  const isPending = resetPasswordMutation.isPending;

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <p className="text-muted-foreground text-sm">Set a new password</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">New Password</Label>
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={isPending || !token}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </Button>

            {!token && (
              <p className="text-red-500 text-xs text-center">
                Invalid or missing reset token.
              </p>
            )}
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

export default ResetPassword;
