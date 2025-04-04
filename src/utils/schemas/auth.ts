import * as Yup from "yup";
import { REQUIRED } from "../constant/constant";

export const AuthSchema = Yup.object().shape({
  phone_number: Yup.string().required(REQUIRED),
  password: Yup.string().required(REQUIRED),
});
