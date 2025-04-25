import React, { useState } from "react";
import { Form, Formik } from "formik";
import { IResetPasswordRequest } from "@/types/auth";
import { ResetPasswordSchema } from "@/utils/schemas/auth";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/service/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      token: context.query.token,
      email: context.query.email,
    },
  };
};

export default function ResetPasswordPage({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: IResetPasswordRequest = {
    email,
    password: "",
    password_confirmation: "",
  };

  const mutation = useMutation({ mutationFn: resetPassword });

  const handleSubmit = (body: IResetPasswordRequest) => {
    mutation.mutate(body, {
      onSuccess() {
        toast.success("Success", {
          description:
            "Berhasil reset password, silahkan akses halaman login kembali",
          position: "top-right",
        });
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
              validationSchema={ResetPasswordSchema}
              enableReinitialize
              onSubmit={(e) => {
                const value = {
                  ...e,
                  token,
                };

                handleSubmit(value);
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
                      className="self-center object-contain"
                    />
                    <p className="font-semibold">Reset Password</p>
                    <InputField
                      label="Email"
                      placeholder="Email"
                      name="email"
                      error={errors?.email}
                      touched={touched?.email}
                      type="email"
                      required
                    />
                    <div className="flex flex-col gap-5">
                      <InputField
                        label="Password"
                        placeholder="Password"
                        name="password"
                        error={errors?.password}
                        touched={touched?.password}
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <InputField
                        label="Konfirmasi Password"
                        placeholder="Konfirmasi Password"
                        name="password_confirmation"
                        error={errors?.password_confirmation}
                        touched={touched?.password_confirmation}
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
                    <Link href="/login">
                      <p className="text-sm text-red-500 underline">Login</p>
                    </Link>
                    <Button
                      type="submit"
                      className="bg-red-500 hover:bg-red-700 font-bold"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="animate-spin" />}
                      Simpan
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
