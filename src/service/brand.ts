import { IBrandResponse } from "@/types/brand";
import { IPaginationParams } from "@/types/pagination";
import { mapQueryString } from "@/utils/format/string";
import { axiosClient } from "./apiClient";

export const getBrands = async (
  params?: IPaginationParams
): Promise<IBrandResponse[]> => {
  const queryString = mapQueryString(params);
  const response = await axiosClient.get(
    `/brands${queryString ? `?${queryString}` : ""}`
  );

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error get brands");
  }

  return response.data.data;
};
