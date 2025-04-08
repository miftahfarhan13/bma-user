import { IPasswordRequest, IProfileRequest } from "@/types/profile";
import { axiosClient } from "./apiClient";

export const updateProfile = async (body: IProfileRequest) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  if (body.name) formData.append("name", body.name);
  if (body.email) formData.append("email", body.email);
  if (body.phone_number) formData.append("phone_number", body.phone_number);
  if (body.avatar) formData.append("avatar", body.avatar);

  const response = await axiosClient.post("/profile", body, config);

  if (response.status !== 200) {
    throw new Error(response.data.message || "Update profile failed");
  }

  return response.data.data;
};

export const updatePassword = async (body: IPasswordRequest) => {
  const response = await axiosClient.post("/profile/update-password", body);

  if (response.status !== 200) {
    throw new Error(response.data.message || "Update password failed");
  }

  return response.data.data;
};
