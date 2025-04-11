import { IPaginationParams } from "@/types/pagination";
import { axiosClient } from "./apiClient";
import { mapQueryString } from "@/utils/format/string";
import {
  ICarPaginationGarageResponse,
  ICarPaginationResponse,
  ICarResponse,
} from "@/types/car";

type ICarParams = IPaginationParams & {
  defectStatus?: string[];
  brandName?: string | string[];
  isFavorite?: string;
};

export const getCars = async (
  params: ICarParams = {}
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
  params: ICarParams = {}
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

export const getCarById = async (carId: string): Promise<ICarResponse> => {
  const response = await axiosClient.get(`/cars/detail/${carId}`);

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error get car");
  }

  return response.data?.result;
};

export const getGarageCars = async (
  params: ICarParams = {}
): Promise<ICarPaginationGarageResponse> => {
  const queryString = mapQueryString(params);
  const response = await axiosClient.get(
    `/cars/garage/car${queryString ? `?${queryString}` : ""}`
  );

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error get cars");
  }

  return response.data;
};

export const getLatestSeenCars = async (
  params: ICarParams = {}
): Promise<Array<ICarResponse>> => {
  const queryString = mapQueryString(params);
  const response = await axiosClient.get(
    `/cars/latest-seen/car${queryString ? `?${queryString}` : ""}`
  );

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error get cars");
  }

  return response.data?.data;
};
