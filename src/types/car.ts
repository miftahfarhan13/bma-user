import { IPaginationResponse } from "./pagination";

export interface ICarResponse {
  id: number;
  car_name: string;
  brand_id: number;
  winner_id: number;
  is_buy_now: number;
  status: string;
  bidding_status: string;
  price: number;
  car_availability: string;
  current_price: number;
  created_price: number;
  license_plate: string;
  car_tax: string;
  manufacture_year: string;
  odometer: number;
  fuel_type: string;
  transmission_type: string;
  defect_status: string;
  is_flooded: number;
  is_jmm_car: number;
  customer_name: string;
  customer_email: string;
  session_date: string;
  session_time_start: string;
  session_time_end: string;
  auction_time: string;
  inspection_detail: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  edited_by: string;
  bids_count: number;
  unique_user_bids_count: number;
  is_favorite: boolean;
  brand: {
    id: number;
    brand_name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  bid: [
    {
      id: number;
      car_id: number;
      amount: number;
      user_id: number;
      user: {
        id: number;
        name: string;
      };
    }
  ];
  car_images: [{ id: number; img_path: string }];
}

export type ICarPaginationResponse = {
  data: IPaginationResponse & {
    data: Array<ICarResponse>;
  };
};
