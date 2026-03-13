"use client";

import ProjectHeader from "../../components/project/project-header";
import ProjectMembers from "../../components/project/project-members";
import ProjectTasks from "../../components/project/project-tasks";

export default function ProjectPage() {
  const project = {
    name: "TaskFlow Web App",
    description: "Build a collaborative task management platform",
    createdAt: "May 20, 2026",
    members: [],
    tasks: [
      {
        id: 1,
        title: "Design dashboard UI",
        status: "In Progress",
      },
      {
        id: 2,
        title: "Connect backend API",
        status: "Todo",
      },
      {
        id: 3,
        title: "Setup authentication",
        status: "Done",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <ProjectHeader project={project} />

      <div className="grid gap-6 lg:grid-cols-3">
        <ProjectMembers members={project.members} />

        <ProjectTasks tasks={project.tasks} />
      </div>
    </div>
  );
}
