import { logout } from "@/service/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useCallback } from "react";

export default function useLogout() {
  const router = useRouter();
  const mutation = useMutation({ mutationFn: logout });

  const removeCookies = useCallback(() => {
    // Remove from localStorage
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Remove cookie
    Cookies.remove("auth_token");
  }, []);

  const handleSubmit = useCallback(() => {
    mutation.mutate(undefined, {
      onSuccess() {
        removeCookies();
        router.push("/login");
      },
      onError() {
        removeCookies();
        router.push("/login");
      },
    });
  }, [mutation, removeCookies, router]);

  const isLoading = mutation.isPending;

  return { handleSubmit, isLoading };
}
