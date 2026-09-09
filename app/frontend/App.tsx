import { useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import type { CurrentUser } from "./types/user";
import LoginPage from "./pages/LoginPage";

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
      const response = await fetch("/api/me", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        window.location.href = "/users/sign_in";
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    }

    loadUser();
  }, [isLoginPage]);

  if (isLoginPage) {
    return <LoginPage />;
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EBEFEC] text-[#5F6E64]">
        Loading...
      </div>
    );
  }

  return <DashboardPage user={user} />;
}

export default App;
