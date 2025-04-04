import { IPaginationResponse } from "./pagination";

export interface IBrandResponse {
  id: number;
  brand_name: string;
}

export type IBrandPaginationResponse = {
  data: IPaginationResponse & {
    data: Array<IBrandResponse>;
  };
};
