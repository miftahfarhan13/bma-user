import { setBearerToken } from "@/service/apiClient";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useSetHeaderToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("auth_token");
    if (storedToken) {
      setBearerToken(storedToken);
      setToken(storedToken);
    }
  }, []);

  return token;
}
