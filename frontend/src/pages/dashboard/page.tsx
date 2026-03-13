"use client";

import StatsCards from "../../components/dashboard/stats-cards";
import ProjectList from "../../components/dashboard/project-list";
import TaskList from "../../components/dashboard/task-list";
import ActivityFeed from "../../components/dashboard/activity-feed";
import { useState } from "react";
import { EmptyProject } from "../../components/dashboard/empty-project";

function Dashboard() {
  const [project, setProject] = useState<boolean>(true);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-muted-foreground">
          Here is an overview of your workspace
        </p>
      </div>

      {project ? (
        <>
          <StatsCards />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <ProjectList />
              <TaskList />
            </div>

            <ActivityFeed />
          </div>
        </>
      ) : (
        <EmptyProject />
      )}
    </div>
  );
}

export default Dashboard;
