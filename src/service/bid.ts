import { IBid, IPlaceBidRequest } from "@/types/bid";
import { axiosClient } from "./apiClient";

export const getBidsByCarId = async (id: number): Promise<IBid[]> => {
  const response = await axiosClient.get(`/bids/car/${id}`);

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error get bids by car");
  }

  return response.data.data;
};

export const placeBid = async (body: IPlaceBidRequest) => {
  const response = await axiosClient.post(`/bids/place-bid`, body);

  if (response.status !== 200) {
    console.error("Place bid failed:", response.data);
    throw new Error(response.data.message || "Place bid failed");
  }

  return response.data.data;
};

export const placeLockBid = async (body: IPlaceBidRequest) => {
  const response = await axiosClient.post(`/bids/place-bid-lock`, body);

  if (response.status !== 200) {
    console.error("Place bid lock failed:", response.data);
    throw new Error(response.data.message || "Place bid lock failed");
  }

  return response.data.data;
};
