export type UserType = {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  projects: ProjectType[];
  participatingProjects: ProjectType[];
  assignedTasks: TaskType[];
};

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  creator: UserType;
  members: { member: UserType; inviteStatus: boolean }[];
  comments: CommentType[];
  tasks: TaskType[];
};

export type CommentType = {
  id: string;
  message: string;
  creator: UserType;
  project: ProjectType;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  assignedTo: UserType;
  project: ProjectType;
  isDone: boolean;
};
