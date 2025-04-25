export interface IRoleResponse {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  ktp_url: string;
  phone_number: string;
  email_verified_at: string;
  is_active: number;
  is_deposit: number;
  deposit_nominal: number;
  deposit_date: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  timezone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  last_login_at: string;
  last_login_ip: string;
  avatar: string;
  saving_book_url: string;
  proof_transfer_url: string;
  province: string;
  city: string;
  drp_class: string;
  drp_nominal: number;
  roles: Array<IRoleResponse>;
  won_cars_terjual_count: number;
}
