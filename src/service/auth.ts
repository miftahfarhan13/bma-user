import { ILoginRequest } from "@/types/auth";
import { axiosClient } from "./apiClient";
import { IUserResponse } from "@/types/user";

export const login = async (body: ILoginRequest) => {
  const response = await axiosClient.post("/login", body);

  if (response.status !== 200) {
    console.error("Login failed:", response.data);
    throw new Error(response.data.message || "Login failed");
  }

  return response.data.data;
};

export const logout = async () => {
  const response = await axiosClient.post("/logout");

  if (response.status !== 200) {
    console.error("Logout failed:", response.data);
    throw new Error(response.data.message || "Logout failed");
  }

  return response.data.data;
};

export const getMe = async (): Promise<IUserResponse> => {
  const response = await axiosClient.get("/me");

  if (response.status !== 200) {
    throw new Error(response.data.message || "Unauthenticated");
  }

  return response.data.data;
};
