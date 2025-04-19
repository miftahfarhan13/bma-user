import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

export default function useEcho(token?: string) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Pusher = Pusher;

      window.Echo = new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
        forceTLS:
          (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
        enabledTransports: ["ws", "wss"],
        authEndpoint: "/broadcasting/auth", // default Laravel endpoint
        auth: {
          headers: {
            Authorization: `Bearer ${token ?? Cookies.get("auth_token") ?? ""}`,
          },
        },
      });
    }
  }, [token]);
}
