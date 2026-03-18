import React, { createContext, useContext } from "react";
import { type UserType } from "../lib/type";
import { route } from "../lib/routes";
import { toast } from "sonner";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/use-app-selector";

const UserContext = createContext<UserType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((root) => root.user);
  const location = useLocation();

  if (!user) {
    toast.error("Not Authorised, Login to have Access");
    return (
      <Navigate
        to={`${route.auth.login}?redirect=${location.pathname}`}
        replace
      />
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Use hook inside dashboard layout");
  return context;
};
