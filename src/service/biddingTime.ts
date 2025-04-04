import { IBiddingTimeResponse } from "@/types/biddingTime";
import { axiosClient } from "./apiClient";

export const getCurrentBiddingTime =
  async (): Promise<IBiddingTimeResponse> => {
    const response = await axiosClient.get(`/current/time`);

    if (response.status !== 200) {
      throw new Error(
        response.data.message || "Error get current bidding time"
      );
    }

    return response.data?.data;
  };
