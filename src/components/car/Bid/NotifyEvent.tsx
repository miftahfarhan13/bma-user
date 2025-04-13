import { useAuth } from "@/utils/context/AuthProvider";
import useEcho from "@/utils/hooks/useEcho";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function NotifyEvent() {
  useEcho();

  const { user } = useAuth();

  useEffect(() => {
    window.Echo.channel(`noty.${user?.id}`).listen(
      "NotyEvent",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (data: any) => {
        try {
          const d = data.data;

          console.log(data);

          const active = d.active;
          const users = d.users;

          if (users.includes(user?.id)) {
            if (active.user == user?.id) {
              toast.success(
                `Anda sedang memenangkan bidding pada mobil (${active.car_id}) ${active.car_name}.`,
                {
                  position: "top-center",
                }
              );
            } else {
              toast.error(
                `Anda sedang kalah bidding pada mobil (${active.car_id}) ${active.car_name}.`,
                {
                  position: "top-center",
                }
              );
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    );

    return () => {
      window.Echo.channel(`noty.${user?.id}`).stopListening("NotyEvent");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
