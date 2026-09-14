import { useEffect, useState } from "react";
import AdminDashboardPage from "./pages/admin/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import SupportDashboardPage from "./pages/support/dashboard/DashboardPage";
import type { CurrentUser } from "./types/user";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

function App() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === "/users/sign_in";
  const isSignupPage = currentPath === "/users/sign_up";
  const isForgotPasswordPage = currentPath === "/users/password/new";
  const isResetPasswordPage = currentPath === "/users/password/edit";
  const isAuthPage = isLoginPage || isSignupPage || isForgotPasswordPage || isResetPasswordPage;

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const response = await fetch("/api/me", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });

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

  if (isLoginPage) return <LoginPage />;
  if (isSignupPage) return <SignupPage />;
  if (isForgotPasswordPage) return <ForgotPasswordPage />;
  if (isResetPasswordPage) return <ResetPasswordPage />;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#CFE0D3] text-[#5F6E64]">
        Loading...
      </div>
    );
  }

  if (!user) return null;
  if (user.role === "admin") return <AdminDashboardPage user={user} />;

  return <SupportDashboardPage user={user} />;
}

export default App;
