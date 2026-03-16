import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import HomePage from "./pages/HomePage";
import AuthLayout from "./pages/auth/layout";
import DashboardLayout from "./pages/dashboard/layout";
import Dashboard from "./pages/dashboard/page";
import Profile from "./pages/dashboard/profile";
import ProjectPage from "./pages/dashboard/project";
import NotificationsPage from "./pages/dashboard/notification";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import ConfirmEmailVerified from "./pages/auth/ConfrimEmailVerified";
import { useEffect } from "react";
import { getUser, refetchUser } from "./reducers/user.reducer";
import { useDispatch } from "react-redux";
import SettingsPage from "./pages/dashboard/settings";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./hooks/use-app-selector";

function App() {
  const dispatch = useDispatch();
  const user = useAppSelector((root) => root.user);

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  const userQuery = useQuery({
    queryKey: ["User"],
    queryFn: () => {
      if (user) {
        refetchUser(user, dispatch);
      }
      return null;
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
  return (
    <>
      <div>
        <div className="min-h-screen bg-background text-foreground">
          {!userQuery.isLoading ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route
                  path="register/confirmEmail/:token"
                  element={<ConfirmEmailVerified />}
                />
                <Route
                  path="register/confirmEmail"
                  element={<ConfirmEmail />}
                />
              </Route>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="notification" element={<NotificationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="project/:id" element={<ProjectPage />} />
              </Route>
            </Routes>
          ) : (
            <div>Loading... * a loading component</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
