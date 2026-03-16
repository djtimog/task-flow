import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import type { UserType } from "./type";

export const userExtractor = (): UserType | undefined | null => {
  const token = localStorage.getItem("token");
  const now = Date.now() / 1000;

  if (token) {
    const { user, exp }: { user: UserType; iat: number; exp: number } =
      jwtDecode(token);

    const isExpired = exp < now;

    if (!exp || isExpired) {
      localStorage.clear();
      toast("User is now logged out");
      return null;
    }

    return user;
  }

  return null;
};
