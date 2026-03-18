"use client";

import StatsCards from "../../components/dashboard/stats-cards";
import ProjectList from "../../components/dashboard/project-list";
import TaskList from "../../components/dashboard/task-list";
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

      {user.projects.length > 0 || user.participatingProjects.length > 0 ? (
        <>
          <StatsCards user={user} />

          <div className="space-y-6">
            <ProjectList title={"Recent Projects"} projects={user.projects} />
            <ProjectList
              title={"Participating Projects"}
              projects={user.participatingProjects}
            />
            <TaskList user={user} />
          </div>
        </>
      ) : (
        <EmptyProject />
      )}
    </div>
  );
}

export default Dashboard;
