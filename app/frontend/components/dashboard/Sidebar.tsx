import { useState } from "react";
import MenuIcon from "./MenuIcon";
import type { CurrentUser } from "../../types/user";

type SidebarProps = { user: CurrentUser };

function Sidebar({ user }: SidebarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isAdmin = user.role === "admin";
  const currentPath = window.location.pathname;

  const menuItems = isAdmin
    ? [
        { name: "Overview", path: "/admin" },
        { name: "Users", path: "/admin/users" },
        { name: "Tenants", path: "#" },
        { name: "Customers", path: "#" },
        { name: "Endpoints", path: "#" },
        { name: "Deliveries", path: "#" },
      ]
    : [
        { name: "Overview", path: "/" },
        { name: "Customers", path: "#" },
        { name: "Endpoints", path: "#" },
        { name: "Deliveries", path: "#" },
        { name: "Replay", path: "#" },
        { name: "Diagnose", path: "#" },
      ];

  async function logout() {
    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.getAttribute("content");

    const response = await fetch("/users/sign_out", {
      method: "DELETE",
      credentials: "include",
      headers: { Accept: "application/json", "X-CSRF-Token": csrfToken || "" },
    });

    if (response.ok) window.location.href = "/users/sign_in";
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#CFE0D3] px-6 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hook<span className="text-[#23613F]">Yard</span></h1>
        <p className="mt-1 text-xs font-medium uppercase tracking-[3px] text-[#53665A]">Webhook operations</p>
      </div>

      <nav className="mt-12 space-y-1">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#53665A]">Workspace</p>

        {menuItems.map((item) => {
          const active = currentPath === item.path;

          return (
            <a
              key={item.name}
              href={item.path}
              className={
                active
                  ? "flex h-12 items-center gap-3 rounded-xl bg-[#B6CEBC] px-4 font-semibold text-[#173D28]"
                  : "flex h-12 items-center gap-3 rounded-xl px-4 font-medium text-[#405348] transition hover:bg-[#C1D5C6] hover:text-[#173D28]"
              }
            >
              <MenuIcon name={item.name} />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>

      <div className="relative mt-auto border-t border-[#B7CCBC] pt-5">
        {showUserMenu && (
          <div className="absolute bottom-16 left-0 z-20 w-full rounded-xl border border-[#B7CCBC] bg-white p-2 shadow-[0_14px_35px_rgba(23,33,27,0.14)]">
            <p className="truncate border-b border-[#E4EBE6] px-3 py-3 text-xs text-[#607267]">{user.email}</p>

            <button
              type="button"
              onClick={logout}
              className="mt-2 flex h-10 w-full items-center justify-between rounded-lg px-3 text-sm font-medium text-[#934343] transition hover:bg-[#FBEEEE]"
            >
              <span>Sign out</span>

              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M10 17l5-5-5-5M15 12H3M14 3h6v18h-6" />
              </svg>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowUserMenu(!showUserMenu)}
          aria-expanded={showUserMenu}
          className="flex w-full items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-[#C1D5C6]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#214E35] font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>

          <span className="min-w-0 flex-1 text-left">
            <span className="block truncate text-sm font-semibold">{user.name}</span>
            <span className="block text-xs font-medium capitalize text-[#53665A]">{user.role}</span>
          </span>

          <span className="text-xs text-[#53665A]">{showUserMenu ? "⌄" : "⌃"}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
