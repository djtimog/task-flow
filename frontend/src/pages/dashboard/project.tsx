"use client";

import { useNavigate, useParams } from "react-router-dom";
import ProjectHeader from "../../components/project/project-header";
import ProjectMembers from "../../components/project/project-members";
import ProjectTasks from "../../components/project/project-tasks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProjectById } from "../../services/project.service";
import AppLoader from "../../components/app-loader";
import type { ProjectType, UserType } from "../../lib/type";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"members" | "tasks">("members");

  const projectQuery = useSuspenseQuery<ProjectType>({
    queryKey: ["Project"],
    queryFn: async () => {
      if (id) {
        const result = await getProjectById(id);
        return result.data;
      }
      navigate("/dashboard");
      return null;
    },
  });
  if (projectQuery.isLoading) return <AppLoader />;

  const project = projectQuery.data;

  const commentsWithTime: CommentWithTime[] = project.comments.map((c, i) => ({
    ...c,
    time: ["2h ago", "1h ago", "30m ago"][i] ?? "Recently",
  }));

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
                className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg transition-colors font-medium ${
                  activeTab === tab.key
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
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

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">
              {activeTab === "members" ? "Team members" : "Task list"}
            </h2>
            {activeTab === "tasks" && project.tasks.length > 0 && (
              <Button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                + Add task
              </Button>
            )}
          </div>

          {activeTab === "members" && <ProjectMembers project={project} />}

          {activeTab === "tasks" && <ProjectTasks project={project} />}
        </main>

        <div className="lg:w-80 xl:w-96 lg:shrink-0 flex flex-col min-h-96">
          <CommentsSidebar comments={commentsWithTime} />
        </div>
      </div>
    </div>
  );
}
