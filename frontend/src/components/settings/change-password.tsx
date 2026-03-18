import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ZodSchemas, type ResetPasswordValues } from "../../lib/zod-tools";
import { resetPassword } from "../../services/auth.service";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Lock } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(ZodSchemas.ResetPassword),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ResetPasswordValues) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      return await resetPassword(token, data.password);
    },
    retry: false,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(`Error: ${error}`);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Lock className="w-4 h-4" /> Change Password
        </CardTitle>
        <CardDescription>
          Use a strong password you don't use elsewhere
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <Label>Current password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>

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

          <div className="flex justify-end">
            <Button variant="outline" type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePasswordForm;
