import axios from "axios";
import { toast } from "sonner";
import type { LoginValues, RegisterValues } from "../lib/zod-tools";
import { getAuthHeader } from "../lib/auth";

const baseUrl = `/api/auth`;

export const registerUser = async (data: RegisterValues) => {
  try {
    const result = await axios.post(`${baseUrl}/register`, data);
    toast.success("Account created successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Registration failed");
  }
};

export const registerConfirmEmail = async (token: string) => {
  try {
    const result = await axios.post(
      `${baseUrl}/register/confirmEmail/${token}`,
    );
    toast.success("Email confirmed successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Email confirmation failed");
  }
};

export const loginUser = async (data: LoginValues) => {
  try {
    const { method, ...payload } = data;
    const result = await axios.post(`${baseUrl}/login`, payload);
    toast.success(`Logged in successfully via ${method}`);
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Login failed");
  }
};

export const logoutUser = async () => {
  try {
    const result = await axios.post(`${baseUrl}/logout`, {
      headers: getAuthHeader(),
    });
    toast.success("Logged out successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Logout failed");
  }
};

export const refetchToken = async () => {
  try {
    const result = await axios.post(`${baseUrl}/refetchToken`);
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Token refresh failed");
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const result = await axios.post(`${baseUrl}/forgetPassword`, { email });
    toast.success("Password reset email sent");
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Forgot password failed");
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const result = await axios.post(`${baseUrl}/resetPassword/${token}`, {
      password,
    });
    toast.success("Password reset successfully");
    return result.data;
  } catch (error: any) {
    toast.error(`${JSON.stringify(error.response.data.error)}`);
    throw new Error("Password reset failed");
  }
};
