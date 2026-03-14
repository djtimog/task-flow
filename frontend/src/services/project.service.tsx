import api from "../lib/api";
import { toast } from "sonner";
import type { CreateProjectValues } from "../lib/zod-tools";

const baseUrl = "/projects";

// GET /projects
export const getProjects = async () => {
  try {
    const result = await api.get(baseUrl);
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to fetch projects");
  }
};

// GET /projects/getUserProjects
export const getUserProjects = async () => {
  try {
    const result = await api.get(`${baseUrl}/getUserProjects`);
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to fetch user projects");
  }
};

// GET /projects/:id
export const getProjectById = async (id: string) => {
  try {
    const result = await api.get(`${baseUrl}/${id}`);
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to fetch project");
  }
};

// POST /projects/createProject
export const createProject = async (data: CreateProjectValues) => {
  try {
    const result = await api.post(`${baseUrl}/createProject`, data);
    toast.success("Project created successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to create project");
  }
};

// PUT /projects/:id
export const editProject = async (
  id: string,
  data: Partial<CreateProjectValues>,
) => {
  try {
    const result = await api.put(`${baseUrl}/${id}`, data);
    toast.success("Project updated successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to update project");
  }
};

// DELETE /projects/:id
export const deleteProject = async (id: string) => {
  try {
    const result = await api.delete(`${baseUrl}/${id}`);
    toast.success("Project deleted successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to delete project");
  }
};

// POST /projects/:id/invite
export const inviteToProject = async (id: string, email: string) => {
  try {
    const result = await api.post(`${baseUrl}/${id}/invite`, { email });
    toast.success("Invite sent successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to send invite");
  }
};

// POST /projects/:id/acceptInvite/:token
export const acceptInvite = async (id: string, token: string) => {
  try {
    const result = await api.post(`${baseUrl}/${id}/acceptInvite/${token}`);
    toast.success("Invite accepted successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to accept invite");
  }
};

// POST /projects/:id/createTask
export const createTask = async (
  id: string,
  data: { title: string; description?: string },
) => {
  try {
    const result = await api.post(`${baseUrl}/${id}/createTask`, data);
    toast.success("Task created successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to create task");
  }
};

// POST /projects/:id/createComment
export const createComment = async (id: string, data: { content: string }) => {
  try {
    const result = await api.post(`${baseUrl}/${id}/createComment`, data);
    toast.success("Comment added");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to create comment");
  }
};

// PATCH /projects/:id/updateTaskStatus
export const updateTaskStatus = async (
  id: string,
  data: { taskId: string; status: string },
) => {
  try {
    const result = await api.patch(`${baseUrl}/${id}/updateTaskStatus`, data);
    toast.success("Task status updated");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to update task status");
  }
};
