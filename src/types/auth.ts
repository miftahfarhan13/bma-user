export interface ILoginRequest {
  phone_number: string;
  password: string;
  role: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  email: string;
  password: string;
  password_confirmation: string;
}
