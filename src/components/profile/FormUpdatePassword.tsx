import { updatePassword } from "@/service/profile";
import { IPasswordRequest } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Form, Formik } from "formik";
import { PasswordSchema } from "@/utils/schemas/profile";
import { InputField } from "../input/InputField";
import { AxiosError } from "axios";

export default function FormUpdatePassword() {
  const query = useQueryClient();

  const initialValues: IPasswordRequest = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const mutation = useMutation({
    mutationFn: updatePassword,
  });

  const handleSubmit = (values: IPasswordRequest) => {
    mutation.mutate(
      { ...values },
      {
        onSuccess() {
          toast.success("Berhasil", {
            description: "Password berhasil diperbarui",
            position: "top-right",
          });
          query.invalidateQueries({ queryKey: ["profile"] });
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
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <p className="text-lg font-bold">Update Password</p>
        <Formik
          initialValues={initialValues}
          validationSchema={PasswordSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-5">
              <InputField
                name="current_password"
                label="Password Lama"
                placeholder="Password Lama"
                error={errors.current_password}
                touched={touched.current_password}
                type="password"
                required
              />
              <InputField
                name="password"
                label="Password Baru"
                placeholder="Password Baru"
                error={errors.password}
                touched={touched.password}
                type="password"
                required
              />
              <InputField
                name="password_confirmation"
                label="Ketik Ulang Password Baru"
                placeholder="Ketik Ulang Password Baru"
                error={errors.password_confirmation}
                touched={touched.password_confirmation}
                type="password"
                required
              />
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-red-500 hover:bg-red-700"
              >
                {mutation.isPending && (
                  <Loader2 className="animate-spin mr-2" />
                )}
                Simpan
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
