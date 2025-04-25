import * as Yup from "yup";
import { REQUIRED } from "../constant/constant";

export const AuthSchema = Yup.object().shape({
  phone_number: Yup.string().required(REQUIRED),
  password: Yup.string().required(REQUIRED),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Format email tidak valid").required(REQUIRED),
});

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});
