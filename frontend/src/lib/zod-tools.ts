import * as z from "zod";

const RegisterUser = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirm: z.string(),
    email: z.email(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

const LoginUser = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("email"),
    email: z.string().email(),
    password: z.string(),
  }),
  z.object({
    method: z.literal("username"),
    username: z.string(),
    password: z.string(),
  }),
]);

const CreateProject = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
});

const CreateTask = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  member: z.string().min(3, "You must select a member"),
});

const ForgotPassword = z.discriminatedUnion("method", [
  z.object({ method: z.literal("email"), email: z.string().email() }),
  z.object({ method: z.literal("username"), username: z.string().min(1) }),
]);

const ResetPassword = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ZodSchemas = {
  RegisterUser,
  LoginUser,
  CreateProject,
  CreateTask,
  ForgotPassword,
  ResetPassword,
};

export type RegisterValues = z.infer<typeof ZodSchemas.RegisterUser>;
export type LoginValues = z.infer<typeof ZodSchemas.LoginUser>;
export type CreateProjectValues = z.infer<typeof ZodSchemas.CreateProject>;
export type CreateTaskValues = z.infer<typeof ZodSchemas.CreateTask>;
export type ForgotPasswordValues = z.infer<typeof ZodSchemas.ForgotPassword>;

export type ResetPasswordValues = z.infer<typeof ResetPassword>;
