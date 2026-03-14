"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./../components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import { LayoutDashboard, User, Bell, Settings } from "lucide-react";
import { DashboardLogo } from "./dashboard/dashboard-logo";
import { NavProjects } from "./nav-projects";
import { useAppSelector } from "../hooks/use-app-selector";

const data = {
  user: {
    name: "Timog",
    email: "timog@email.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },

    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: <User />,
    },
    {
      title: "Notification",
      url: "/dashboard/notification",
      icon: <Bell />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings />,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((root) => root.user);
  if (!user) return null;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {user.projects.length > 0 && <NavProjects projects={user.projects} />}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
