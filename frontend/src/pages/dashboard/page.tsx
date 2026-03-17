"use client";

import StatsCards from "../../components/dashboard/stats-cards";
import ProjectList from "../../components/dashboard/project-list";
import TaskList from "../../components/dashboard/task-list";
import ActivityFeed from "../../components/dashboard/activity-feed";
import { EmptyProject } from "../../components/dashboard/empty-project";
import { useUser } from "../../providers/dashboard-provider";

function Dashboard() {
  const user = useUser();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back 👋 {user.username}</h1>
        <p className="text-muted-foreground">
          Here is an overview of your workspace
        </p>
      </div>

      {user.projects.length > 0 ? (
        <>
          <StatsCards user={user} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <ProjectList user={user} />
              <TaskList user={user} />
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
