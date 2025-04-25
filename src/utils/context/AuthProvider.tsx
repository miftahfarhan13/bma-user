import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/service/auth";
import useLogout from "../hooks/useLogout";
import useSetHeaderToken from "../hooks/useSetHeaderToken";
import { IUserResponse } from "@/types/user";
import Image from "next/image";

interface AuthContextType {
  user: IUserResponse | null;
  isLoading: boolean;
  logout: () => void;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useSetHeaderToken();
  const { handleSubmit: logout } = useLogout();
  const [user, setUser] = useState<IUserResponse | null>(null);

  const { data, error, isPending, isFetching, isSuccess, isError } = useQuery({
    queryKey: ["profile", token],
    queryFn: getMe,
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    if (error) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const isLoaded = !token || isSuccess || isError;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isPending || isFetching,
        logout,
        token: token || "",
      }}
    >
      {isLoaded ? (
        children
      ) : (
        <div className="h-[100dvh] flex flex-col items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            className="object-contain w-[140px] h-[40px]"
            width={140}
            height={40}
          />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
