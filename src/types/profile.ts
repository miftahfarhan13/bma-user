export interface IProfileRequest {
  name?: string;
  email?: string;
  phone_number?: string;
  avatar?: File | null;
}

export interface IPasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}
