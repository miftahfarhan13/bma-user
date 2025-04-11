import { updateProfile } from "@/service/profile";
import { IProfileRequest } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Form, Formik } from "formik";
import { ProfileSchema } from "@/utils/schemas/profile";
import { InputField } from "../input/InputField";
import { AxiosError } from "axios";
import { useAuth } from "@/utils/context/AuthProvider";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function FormUpdateProfile() {
  const query = useQueryClient();

  const { user } = useAuth();
  const fileUpload = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<IProfileRequest>({
    name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (user?.id) {
      setInitialValues({
        name: user?.name,
        email: user?.email,
        phone_number: user?.phone_number,
      });
    }
  }, [user]);

  useEffect(() => {
    if (avatarFile) {
      const objectUrl = URL.createObjectURL(avatarFile);
      setAvatarPreview(objectUrl);

      // Cleanup on unmount or when file changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setAvatarPreview(null);
    }
  }, [avatarFile]);

  const mutation = useMutation({
    mutationFn: updateProfile,
  });

  const handleSubmit = (values: IProfileRequest) => {
    mutation.mutate(
      { ...values, avatar: avatarFile ? avatarFile : undefined },
      {
        onSuccess() {
          toast.success("Berhasil", {
            description: "Profil berhasil diperbarui",
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

  const onSelectFile = () => {
    if (fileUpload.current) {
      fileUpload.current.click();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <p className="text-lg font-bold">Informasi Profil</p>
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col-reverse md:flex-row items-center gap-5">
                <div className="flex flex-col gap-4 flex-1 w-full">
                  <InputField
                    name="name"
                    label="Nama"
                    placeholder="Nama Lengkap"
                    error={errors.name}
                    touched={touched.name}
                    required
                    readOnly
                  />
                  <InputField
                    name="email"
                    label="Email"
                    placeholder="Email"
                    error={errors.email}
                    touched={touched.email}
                    required
                    type="email"
                    readOnly
                  />
                  <InputField
                    name="phone_number"
                    label="Nomor Telepon"
                    placeholder="08xxxxxxxx"
                    error={errors.phone_number}
                    touched={touched.phone_number}
                    required
                    type="text"
                    readOnly
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-center">
                    <div className="flex flex-col items-start">
                      <div className="relative">
                        <div className="p-2 border rounded-full">
                          <Avatar className="bg-white w-40 h-40">
                            <AvatarImage
                              src={
                                avatarPreview
                                  ? avatarPreview
                                  : user?.avatar
                                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/avatars/${user?.avatar}`
                                  : "/images/avatar.png"
                              }
                              className="object-cover"
                            />
                          </Avatar>
                        </div>
                        <div
                          className="absolute bottom-0 right-0 rounded-full bg-gray-200 p-2.5 cursor-pointer"
                          onClick={onSelectFile}
                        >
                          <Icon icon="mdi:edit" className="text-2xl" />
                        </div>
                      </div>
                      <input
                        ref={fileUpload}
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                          setAvatarFile(file || null);
                        }}
                        hidden
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-red-500 hover:bg-red-700"
              >
                {mutation.isPending && (
                  <Loader2 className="animate-spin mr-2" />
                )}
                Simpan Profil
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
