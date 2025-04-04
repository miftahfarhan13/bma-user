import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/service/auth";
import useLogout from "../hooks/useLogout";
import useSetHeaderToken from "../hooks/useSetHeaderToken";
import { IUserResponse } from "@/types/user";

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
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["profile", token],
    queryFn: getMe,
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    if (!isPending && !isFetching && error && !hasLoggedOut) {
      setHasLoggedOut(true);
      logout();
    }
  }, [error, isPending, isFetching, logout, hasLoggedOut]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isPending || isFetching,
        logout,
        token: token || "",
      }}
    >
      {children}
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
