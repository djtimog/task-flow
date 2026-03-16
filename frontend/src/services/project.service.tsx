import { toast } from "sonner";
import type { CreateProjectValues } from "../lib/zod-tools";
import axios from "axios";

const baseUrl = "/projects";

export const getProjects = async () => {
  try {
    const result = await axios.get(baseUrl);
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to fetch projects");
  }
};

export const getUserProjects = async () => {
  try {
    const result = await axios.get(`${baseUrl}/getUserProjects`);
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to fetch user projects");
  }
};

export const getProjectById = async (id: string) => {
  try {
    const result = await axios.get(`${baseUrl}/${id}`);
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to fetch project");
  }
};

export const createProject = async (data: CreateProjectValues) => {
  try {
    const result = await axios.post(`${baseUrl}/createProject`, data);
    toast.success("Project created successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to create project");
  }
};

export const editProject = async (
  id: string,
  data: Partial<CreateProjectValues>,
) => {
  try {
    const result = await axios.put(`${baseUrl}/${id}`, data);
    toast.success("Project updated successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to update project");
  }
};

export const deleteProject = async (id: string) => {
  try {
    const result = await axios.delete(`${baseUrl}/${id}`);
    toast.success("Project deleted successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to delete project");
  }
};

export const inviteToProject = async (id: string, email: string) => {
  try {
    const result = await axios.post(`${baseUrl}/${id}/invite`, { email });
    toast.success("Invite sent successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to send invite");
  }
};

export const acceptInvite = async (id: string, token: string) => {
  try {
    const result = await axios.post(`${baseUrl}/${id}/acceptInvite/${token}`);
    toast.success("Invite accepted successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to accept invite");
  }
};

export const createTask = async (
  id: string,
  data: { title: string; description?: string },
) => {
  try {
    const result = await axios.post(`${baseUrl}/${id}/createTask`, data);
    toast.success("Task created successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to create task");
  }
};

export const createComment = async (id: string, data: { content: string }) => {
  try {
    const result = await axios.post(`${baseUrl}/${id}/createComment`, data);
    toast.success("Comment added");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to create comment");
  }
};

export const updateTaskStatus = async (
  id: string,
  data: { taskId: string; status: string },
) => {
  try {
    const result = await axios.patch(`${baseUrl}/${id}/updateTaskStatus`, data);
    toast.success("Task status updated");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Failed to update task status");
  }
};
