import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import SearchBar from "../components/search/SearchBar.tsx";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";

import NexusSidebar from "../components/layout/NexusSidebar.tsx";

const AppLayout = () => {
  const { user } = useAuth();

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

          <p className="text-sm text-text/70">
            {user?.username}
          </p>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;