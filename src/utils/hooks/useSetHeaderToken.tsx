import { setBearerToken } from "@/service/apiClient";
import { useEffect, useState } from "react";

export default function useSetHeaderToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setBearerToken(storedToken);
      setToken(storedToken); // Set token state
    }
  }, []);

  return token;
}
