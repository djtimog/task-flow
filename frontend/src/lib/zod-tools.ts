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

export const ZodSchemas = { RegisterUser, LoginUser };

export type RegisterValues = z.infer<typeof ZodSchemas.RegisterUser>;
export type LoginValues = z.infer<typeof ZodSchemas.LoginUser>;
