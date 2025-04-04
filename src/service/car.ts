import { IPaginationParams } from "@/types/pagination";
import { axiosClient } from "./apiClient";
import { mapQueryString } from "@/utils/format/string";
import { ICarPaginationResponse } from "@/types/car";

type ICarParams = IPaginationParams & {
  defectStatus?: string;
  brandName?: string;
};

export const getCars = async (
  params?: ICarParams
): Promise<ICarPaginationResponse> => {
  const queryString = mapQueryString(params);
  const response = await axiosClient.get(
    `/cars${queryString ? `?${queryString}` : ""}`
  );

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error get cars");
  }

  return response.data;
};

export const getAvailableCars = async (
  params?: ICarParams
): Promise<ICarPaginationResponse> => {
  const queryString = mapQueryString(params);
  const response = await axiosClient.get(
    `/cars/available/car${queryString ? `?${queryString}` : ""}`
  );

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error get cars");
  }

  return response.data;
};
