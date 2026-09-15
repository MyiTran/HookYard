import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AdminDashboardPage from "./pages/admin/dashboard/DashboardPage";
import AdminProjectsPage from "./pages/admin/projects/ProjectsPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SignupPage from "./pages/auth/SignupPage";
import SupportDashboardPage from "./pages/support/dashboard/DashboardPage";
import SupportProjectsPage from "./pages/support/projects/ProjectsPage";
import type { CurrentUser } from "./types/user";

const authPaths = [
  "/users/sign_in",
  "/users/sign_up",
  "/users/password/new",
  "/users/password/edit",
];

function AppRoutes() {
  const location = useLocation();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthPage = authPaths.includes(location.pathname);

  useEffect(() => {
    // Nếu đang ở trang Auth, không cần gọi API kiểm tra "me"
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

  // Hiển thị màn hình chờ mượt mà khi đang gọi API xác thực
  if (loading && !isAuthPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#CFE0D3] text-[#5F6E64]">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* --- CÁC ROUTE XÁC THỰC (AUTH) --- */}
      <Route path="/users/sign_in" element={<LoginPage />} />
      <Route path="/users/sign_up" element={<SignupPage />} />
      <Route path="/users/password/new" element={<ForgotPasswordPage />} />
      <Route path="/users/password/edit" element={<ResetPasswordPage />} />

      {/* --- CÁC ROUTE DÀNH CHO ADMIN --- */}
      {user?.role === "admin" && (
        <>
          <Route path="/admin" element={<AdminDashboardPage user={user} />} />
          <Route
            path="/admin/projects"
            element={
              <AppLayout user={user} title="Projects">
                <AdminProjectsPage />
              </AppLayout>
            }
          />
        </>
      )}

      {/* --- CÁC ROUTE DÀNH CHO SUPPORT / USER THƯỜNG --- */}
      {user && user.role !== "admin" && (
        <>
          <Route path="/" element={<SupportDashboardPage user={user} />} />
          <Route
            path="/projects"
            element={
              <AppLayout user={user} title="Projects">
                <SupportProjectsPage />
              </AppLayout>
            }
          />
        </>
      )}

      {/* --- ĐIỀU HƯỚNG MẶC ĐỊNH KHI KHÔNG KHỚP ROUTE NÀO --- */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthPage ? "/users/sign_in" : user?.role === "admin" ? "/admin" : "/"}
            replace
          />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
