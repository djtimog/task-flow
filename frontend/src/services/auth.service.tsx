import axios from "axios";
import { toast } from "sonner";
import type { LoginValues, RegisterValues } from "../lib/zod-tools";
const baseUrl = "/api/auth";

export const registerUser = async (data: RegisterValues) => {
  const userData = {
    username: data.username,
    password: data.password,
    email: data.email,
  };

  try {
    const result = await axios.post(`${baseUrl}/register`, userData);
    toast.success("Check your Email to confirm Email");
    return result.data;
  } catch (error: any) {
    toast.error(`Registration failed. ${error.response.data.error}`);
    throw new Error(`Registration failed: ${error}`);
  }
};

export const registerConfirmEmail = async (token: string) => {
  try {
    const result = await axios.post(
      `${baseUrl}/register/confirmEmail/${token}`,
    );

    toast.success("Email confirm succesfully");
    return result.data;
  } catch (error: any) {
    toast(`${error.response.data.error}`);
    throw new Error(`Email confirmation Failed`);
  }
};

export const loginUser = async (data: LoginValues) => {
  try {
    const { method, ...payload } = data;
    const result = await axios.post(`${baseUrl}/login`, payload);
    toast.success(`Logged via ${method} is successfully`);
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Login failed");
  }
};

export const logOutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.post(`${baseUrl}/auth/logout`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Log out succesfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${error.response.data.error}`);
    throw new Error("Login failed");
  }
};
