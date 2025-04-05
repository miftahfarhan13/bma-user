import { axiosClient } from "./apiClient";

export const toggleFavorite = async (carId: string) => {
  const response = await axiosClient.post(`/favorite/toggle/${carId}`);

  if (response.status !== 200) {
    console.error("Toggle favorite failed:", response.data);
    throw new Error(response.data.message || "Toggle favorite failed");
  }

  return response.data.data;
};
