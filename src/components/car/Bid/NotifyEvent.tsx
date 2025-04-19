import { useAuth } from "@/utils/context/AuthProvider";
import { useEffect } from "react";
import { toast } from "sonner";

export default function NotifyEvent() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const channelName = `notification.${user.id}`;
    const channel = window.Echo.channel(channelName);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNotyEvent = async (data: any) => {
      try {
        const d = data.data;
        const active = d.active;
        const users = d.users;

        if (users.includes(user.id)) {
          if (active.user == user.id) {
            toast.success(
              `Anda sedang memenangkan bidding pada mobil (${active.car_id}) ${active.car_name}.`,
              { description: "", position: "top-center" }
            );
          } else {
            toast.error(
              `Anda sedang kalah bidding pada mobil (${active.car_id}) ${active.car_name}.`,
              { description: "", position: "top-center" }
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    channel.listen("NotificationEvent", handleNotyEvent);

    return () => {
      window.Echo.leave(channelName);
    };
  }, [user?.id]);

  return null;
}
