import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import SearchBar from "../components/search/SearchBar.tsx";

const AppLayout = () => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Tasks",
      path: "/tasks",
    },
    {
      label: "Notes",
      path: "/notes",
    },
    {
      label: "Activity",
      path: "/activity",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-border bg-surface">
        {/* Logo */}
        <div className="border-b border-border px-6 py-5">
          <h1 className="text-xl font-semibold tracking-[0.2em] text-text">
            NEXUS
          </h1>

          <p className="mt-1 text-xs text-text/60">
            Personal workspace
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <p className="px-3 pb-3 text-xs uppercase tracking-wider text-text/50">
            Workspace
          </p>

          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="block rounded-md px-3 py-2.5 text-sm transition"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? "var(--color-border)"
                    : "transparent",
                })}
              >
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-text"
                        : "text-text/60"
                    }
                  >
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-border p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-text">
              {user?.username}
            </p>

            <p className="truncate text-xs text-text/55">
              {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full rounded-md border border-border px-3 py-2 text-sm text-text/70 transition hover:text-text"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-64 min-h-screen">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-8">
          <p className="text-sm text-text/60">
            Workspace
          </p>

          <SearchBar/>

          <p className="text-sm text-text/70">
            {user?.username}
          </p>
        </header>

        {/* Page */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;