"use client";

import { useNavigate, useParams } from "react-router-dom";
import ProjectHeader from "../../components/project/project-header";
import ProjectMembers from "../../components/project/project-members";
import ProjectTasks from "../../components/project/project-tasks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProjectById } from "../../services/project.service";
import AppLoader from "../../components/app-loader";
import type { ProjectType } from "../../lib/type";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { CommentsSidebar } from "../../components/project/comment-side-bar";

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"members" | "tasks">("members");

  const projectQuery = useSuspenseQuery<ProjectType>({
    queryKey: ["Project", id],
    queryFn: async () => {
      if (id) {
        const result = await getProjectById(id);
        return result.data;
      } else {
        navigate("/dashboard");
        return null;
      }
    },
  });

  if (projectQuery.isLoading) return <AppLoader />;

  const project = projectQuery.data;

  const tabs: { key: "members" | "tasks"; label: string; count: number }[] = [
    { key: "members", label: "Members", count: project.members.length },
    { key: "tasks", label: "Tasks", count: project.tasks.length },
  ];

  return (
    <div className="min-h-screen font-sans">
      <ProjectHeader project={project} />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:min-h-[calc(100vh-89px)]">
        <main className="flex-1 px-6 py-5 min-w-0">
          <div className="flex gap-1 mb-5">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                disabled={activeTab === tab.key}
                variant={"secondary"}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </Button>
            ))}
          </div>

          {activeTab === "members" && <ProjectMembers project={project} />}

          {activeTab === "tasks" && <ProjectTasks project={project} />}
        </main>

        <div className="lg:w-80 xl:w-96 lg:shrink-0 flex flex-col min-h-96">
          <CommentsSidebar project={project} />
        </div>
      </div>
    </div>
  );
}
