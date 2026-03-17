import React, { createContext, useContext, useEffect } from "react";
import { type UserType } from "../lib/type";
import { route } from "../lib/routes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use-app-selector";

const UserContext = createContext<UserType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((root) => root.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(route.auth.login);
      toast.error("Not Authorised, Login to have Access");
    }
  }, [navigate, user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Use hook inside dashboard layout");
  return context;
};
