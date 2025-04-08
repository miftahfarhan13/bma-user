import * as Yup from "yup";
import { REQUIRED } from "../constant/constant";

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED),
  email: Yup.string().email("Email tidak valid").required(REQUIRED),
  phone_number: Yup.string().required(REQUIRED),
});

export const PasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Password lama wajib diisi"),
  password: Yup.string()
    .min(8, "Password baru minimal 8 karakter")
    .required("Password baru wajib diisi"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Konfirmasi password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});
