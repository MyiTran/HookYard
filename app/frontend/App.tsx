import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminDashboardPage from "./pages/admin/dashboard/DashboardPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SignupPage from "./pages/auth/SignupPage";
import SupportDashboardPage from "./pages/support/dashboard/DashboardPage";
import type { CurrentUser } from "./types/user";

function App() {
  const location = useLocation();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const authPaths = ["/users/sign_in", "/users/sign_up", "/users/password/new", "/users/password/edit"];
  const isAuthPage = authPaths.includes(location.pathname);

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const response = await fetch("/api/me", { credentials: "include", headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error();

        const data = await response.json();
        setUser(data.user);
      } catch {
        window.location.href = "/users/sign_in";
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [isAuthPage]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#CFE0D3] text-[#5F6E64]">Loading...</div>;

  return (
    <Routes>
      <Route path="/users/sign_in" element={<LoginPage />} />
      <Route path="/users/sign_up" element={<SignupPage />} />
      <Route path="/users/password/new" element={<ForgotPasswordPage />} />
      <Route path="/users/password/edit" element={<ResetPasswordPage />} />

      {user?.role === "admin" && <Route path="/admin" element={<AdminDashboardPage user={user} />} />}
      {user?.role === "support" && <Route path="/" element={<SupportDashboardPage user={user} />} />}

      <Route path="*" element={<Navigate to={user?.role === "admin" ? "/admin" : user ? "/" : "/users/sign_in"} replace />} />
    </Routes>
  );
}

export default App;
