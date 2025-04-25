import React from "react";
import { Form, Formik } from "formik";
import { IForgotPasswordRequest } from "@/types/auth";
import { ForgotPasswordSchema } from "@/utils/schemas/auth";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/service/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const initialValues: IForgotPasswordRequest = {
    email: "",
  };

  const mutation = useMutation({ mutationFn: forgotPassword });

  const handleSubmit = (body: IForgotPasswordRequest) => {
    mutation.mutate(body, {
      onSuccess() {
        toast.success("Success", {
          description: "Berhasil, silahkan cek email anda untuk reset password",
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
              validationSchema={ForgotPasswordSchema}
              enableReinitialize
              onSubmit={(e) => {
                const value = {
                  ...e,
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
                    <p className="font-semibold">Lupa Password</p>
                    <InputField
                      label="Email"
                      placeholder="Email"
                      name="email"
                      error={errors?.email}
                      touched={touched?.email}
                      type="email"
                      required
                    />
                    <Link href="/login">
                      <p className="text-sm text-red-500 underline">
                        Login
                      </p>
                    </Link>
                    <Button
                      type="submit"
                      className="bg-red-500 hover:bg-red-700 font-bold"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="animate-spin" />}
                      Kirim Email
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
