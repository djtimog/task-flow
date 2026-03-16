"use client";

import { useState } from "react";
import type { ProjectType } from "../lib/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./../components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./../components/ui/sidebar";
import {
  MoreHorizontalIcon,
  FolderIcon,
  ArrowRightIcon,
  Trash2Icon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../services/project.service";
import { refetchUser } from "../reducers/user.reducer";
import { useDispatch } from "react-redux";

export function NavProjects({ projects }: { projects: ProjectType[] }) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const projectsToShow = showMore ? projects : projects.slice(0, 3);

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    refetchUser(dispatch);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projectsToShow.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <a href={`/dashboard/projects/${item.id}`}>
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="aria-expanded:bg-muted"
                >
                  <MoreHorizontalIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  onClick={() => navigate(`/dashboard/projects/${item.id}`)}
                >
                  <FolderIcon className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <ArrowRightIcon className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => await handleDelete(item.id)}
                  variant="destructive"
                >
                  <Trash2Icon className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {projects.length > 3 && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => setShowMore((prev) => !prev)}
            >
              <MoreHorizontalIcon className="text-sidebar-foreground/70" />
              <span>{showMore ? "Less" : "More"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
