import { IBid } from "./bid";
import { IPaginationResponse } from "./pagination";

export interface ICarVideos {
  id: number;
  car_id: number;
  video_file: string;
}
export interface ICarDefect {
  defect_pict: string;
  defect_title: string;
}

export interface ICarDocument {
  id: number;
  car_id: number;
  bpkb_status: number;
  stnk_status: number;
  invoice_status: number;
  vin_status: number;
  form_a_status: number;
  stnk_fotocopy_status: number;
  manual_book_status: number;
  service_book_status: number;
  backup_key_status: number;
  receipt_form_status: number;
  declaration_right_status: number;
  toolkit_status: number;
  bpkb_pict: string;
  stnk_pict: string;
  invoice_pict: string;
  vin_pict: string;
  form_a_pict: string;
  stnk_fotocopy_pict: string;
  manual_book_pict: string;
  service_book_pict: string;
  backup_key_pict: string;
  receipt_form_pict: string;
  declaration_right_pict: string;
  toolkit_pict: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
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
  car_documents?: ICarDocument[];
  car_defects_interior?: ICarDefect[];
  car_defects_eksterior?: ICarDefect[];
  car_defects_others?: ICarDefect[];
  car_videos?: ICarVideos[];
}

export type ICarPaginationResponse = {
  data: IPaginationResponse & {
    data: Array<ICarResponse>;
  };
};

export type ICarPaginationGarageResponse = {
  data: IPaginationResponse & {
    data: Array<{ car: ICarResponse; bid: IBid }>;
  };
};
