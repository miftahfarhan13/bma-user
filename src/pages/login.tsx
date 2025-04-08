import React, { useState } from "react";
import { Form, Formik } from "formik";
import { ILoginRequest } from "@/types/auth";
import { AuthSchema } from "@/utils/schemas/auth";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/service/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { setBearerToken } from "@/service/apiClient";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const query = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: ILoginRequest = {
    phone_number: "",
    password: "",
    role: "user",
  };

  const mutation = useMutation({ mutationFn: login });

  const handleSubmit = (body: ILoginRequest) => {
    mutation.mutate(body, {
      onSuccess(data) {
        toast.success("Success", {
          description: "Login Success",
          position: "top-right",
        });
        localStorage.setItem("name", data?.user?.name);
        localStorage.setItem("email", data?.user?.email);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("role", data?.role[0]?.name);
        // Save auth token to a cookie
        Cookies.set("auth_token", data?.token, { expires: 7, path: "/" });
        setBearerToken(data?.token);
        query.invalidateQueries({ queryKey: ["profile"] });
        window.location.href = "/";
      },
      onError(error: Error) {
        if (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          const message = axiosError?.response?.data?.message
            ? axiosError?.response?.data?.message
            : error?.message;
          toast.warning("Failed", {
            description: message,
            position: "top-right",
          });
        }
      },
    });
  };

  const isLoading = mutation.isPending;

  return (
    <>
      <Header
        title="Belanja Mobil - Login"
        description="Di Belanja Mobil kamu bisa Wujudkan punya Mobil pertama kamu yang Kualitasnya Terjamin. Beli Mobil Tanpa Khawatir, Keabsahan Dokumen terjamin, Gratis Garansi Full 1 Tahun. Beli Mobil Berkualitas."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 h-[100dvh]">
        <div className="relative w-full h-auto hidden md:block">
          <Image
            src="/images/bg-login.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-5 p-5 max-w-[400px] w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={AuthSchema}
              enableReinitialize
              onSubmit={(e, { resetForm }) => {
                const value = {
                  ...e,
                };

                handleSubmit(value);

                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex flex-col gap-5">
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={230}
                      height={70}
                      className="self-center"
                      objectFit="contain"
                    />
                    <InputField
                      label="Nomor Telepon"
                      placeholder="Nomor Telepon"
                      name="phone_number"
                      error={errors?.phone_number}
                      touched={touched?.phone_number}
                      type="text"
                      required
                    />
                    <div className="flex flex-col gap-2">
                      <InputField
                        label="Password"
                        placeholder="Password"
                        name="password"
                        error={errors?.password}
                        touched={touched?.password}
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="checkbox-show-passowd"
                          checked={showPassword}
                          onCheckedChange={(checked) =>
                            setShowPassword(!!checked)
                          }
                        />
                        <label
                          htmlFor="checkbox-show-passowd"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                        >
                          Tampilkan password
                        </label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="bg-red-500 hover:bg-red-700 font-bold"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="animate-spin" />}
                      Login
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
