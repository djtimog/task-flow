import axios from "axios";
import { toast } from "sonner";
import { getAuthHeader } from "../lib/auth";

const baseUrl = `/api/users`;

export const getAllUsers = async () => {
  try {
    const result = await axios.get(baseUrl, { headers: getAuthHeader() });
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(JSON.stringify(error.response.data.error))}`);
    throw new Error("Failed to fetch users");
  }
};

export const getUserById = async (id: string) => {
  try {
    const result = await axios.get(`${baseUrl}/${id}`, {
      headers: getAuthHeader(),
    });
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Failed to fetch user");
  }
};

export const updateProfile = async (id: string, data: { username: string }) => {
  try {
    const result = await axios.patch(`${baseUrl}/${id}`, data, {
      headers: getAuthHeader(),
    });
    toast.success("Profile updated successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Failed to update profile");
  }
};
