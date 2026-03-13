import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import HomePage from "./pages/HomePage";
import AuthLayout from "./pages/auth/layout";
import DashboardLayout from "./pages/dashboard/layout";
import Dashboard from "./pages/dashboard/page";
import Profile from "./pages/dashboard/profile";

function App() {
  return (
    <>
      <div>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
