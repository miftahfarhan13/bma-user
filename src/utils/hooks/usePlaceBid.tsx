import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { placeBid, placeLockBid } from "@/service/bid";
import { IPlaceBidRequest } from "@/types/bid";
import { playSound } from "../function/sound";

export default function usePlaceBid() {
  const mutationPlaceBid = useMutation({ mutationFn: placeBid });
  const mutationPlaceLockBid = useMutation({ mutationFn: placeLockBid });

  const handlePlaceBid = async (body: IPlaceBidRequest) => {
    mutationPlaceBid.mutate(body, {
      onSuccess() {
        playSound("audio-bid-2");
      },
      onError(error: Error) {
        if (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          const message = axiosError?.response?.data?.message
            ? axiosError?.response?.data?.message
            : error?.message;
          toast.warning("Failed", {
            description: message,
            position: "top-center",
          });
        }
      },
    });
  };

  const handlePlaceLockBid = async (body: IPlaceBidRequest) => {
    mutationPlaceLockBid.mutate(body, {
      onSuccess() {
        playSound("audio-bid-1");
      },
      onError(error: Error) {
        if (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          const message = axiosError?.response?.data?.message
            ? axiosError?.response?.data?.message
            : error?.message;
          toast.warning("Failed", {
            description: message,
            position: "top-center",
          });
        }
      },
    });
  };

  return {
    handlePlaceBid,
    handlePlaceLockBid,
    mutationPlaceBid,
    mutationPlaceLockBid,
  };
}
