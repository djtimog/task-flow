export type UserType = {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  projects: string[];
  participatingProjects: string[];
  assignedTasks: string[];
};
