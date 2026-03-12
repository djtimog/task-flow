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

import {
  LayoutDashboard,
  User,
  FrameIcon,
  PieChartIcon,
  MapIcon,
} from "lucide-react";
import { DashboardLogo } from "./dashboard-logo";
import { NavProjects } from "./nav-projects";

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
      url: "/profile",
      icon: <User />,
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: <FrameIcon /> },
    { name: "Sales & Marketing", url: "#", icon: <PieChartIcon /> },
    { name: "Travel", url: "#", icon: <MapIcon /> },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
