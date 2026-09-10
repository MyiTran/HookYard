import { useEffect, useState } from "react";
import LoginPage from "./pages/auth/LoginPage";
import AdminDashboardPage from "./pages/admin/dashboard/DashboardPage";
import SupportDashboardPage from "./pages/support/dashboard/DashboardPage";
import type { CurrentUser } from "./types/user";

function App() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoginPage = window.location.pathname === "/users/sign_in";

  useEffect(() => {
    if (isLoginPage) {
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
  }, [isLoginPage]);

  if (isLoginPage) {
    return <LoginPage />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#CFE0D3] text-[#5F6E64]">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  if (user.role === "admin") {
    return <AdminDashboardPage user={user} />;
  }

  return <SupportDashboardPage user={user} />;
}

export default App;
