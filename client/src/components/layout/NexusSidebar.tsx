import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  RiDashboardLine,
  RiFolderLine,
  RiTaskLine,
  RiStickyNoteLine,
  RiHistoryLine,
  RiLogoutBoxLine
} from "@remixicon/react";

const NexusSidebar = () => {
  const { user, logout } = useAuth();

 const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: RiDashboardLine,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: RiFolderLine,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: RiTaskLine,
  },
  {
    label: "Notes",
    path: "/notes",
    icon: RiStickyNoteLine,
  },
  {
    label: "Activity",
    path: "/activity",
    icon: RiHistoryLine,
  },
];
const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
    <SidebarHeader className="border-b border-border px-6 py-5 group-data-[collapsible=icon]:px-2">
  <div className="flex flex-col items-center justify-center">
  <h1 className="text-xl font-semibold tracking-[0.2em] text-text">
    {state === "expanded" ? "NEXUS" : "N"}
  </h1>

  {state === "expanded" && (
    <p className="mt-1 text-xs text-text/60">
      Personal workspace
    </p>
  )}
</div>
</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
  const Icon = item.icon;

  return (
    <SidebarMenuItem key={item.path}>
      <NavLink to={item.path}>
  {({ isActive }) => (
    <SidebarMenuButton isActive={isActive}>
      <Icon />
      <span>{item.label}</span>
    </SidebarMenuButton>
  )}
</NavLink>
    </SidebarMenuItem>
  );
})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
  <div className="px-2 py-2">
    {state === "expanded" && (
      <>
        <p className="text-sm font-medium text-text">
          {user?.username}
        </p>

        <p className="truncate text-xs text-text/50">
          {user?.email}
        </p>
      </>
    )}
  </div>

  <SidebarMenu>
    <SidebarMenuItem>
     <SidebarMenuButton onClick={logout}>
  <RiLogoutBoxLine />
  <span>Logout</span>
</SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>
    </Sidebar>
  );
};

export default NexusSidebar;