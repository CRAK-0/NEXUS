import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

import { useAuth } from "../context/AuthContext.tsx";
import SearchBar from "../components/search/SearchBar.tsx";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";

import NexusSidebar from "../components/layout/NexusSidebar.tsx";

const AppLayout = () => {
  const { user } = useAuth();

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("nexus-theme");

    return savedTheme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("dark", "light");
    html.classList.add(theme);

    localStorage.setItem("nexus-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  return (
    <SidebarProvider>
      <NexusSidebar />

      <div className="min-h-screen flex-1">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-8">
          <div className="flex items-center gap-4">
            <SidebarTrigger />

            <p className="text-sm text-text/60">
              Workspace
            </p>
          </div>

          <SearchBar />

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text/60 transition-colors hover:bg-background hover:text-text"
            >
              {theme === "dark" ? (
                <RiSunLine size={18} />
              ) : (
                <RiMoonLine size={18} />
              )}
            </button>

            <p className="text-sm text-text/70">
              {user?.username}
            </p>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;