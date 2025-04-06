import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "@/service/favorite";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useToggleFavorite({ id }: { id: string }) {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: { id: string }) => toggleFavorite(input.id),
  });

  const handleToggleFavorite = async () => {
    mutation.mutate(
      { id },
      {
        onSuccess() {
          query.invalidateQueries({ queryKey: ["available-cars"] });
          query.invalidateQueries({ queryKey: ["car"] });
        },
        onError(error) {
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

  const isLoading = mutation.isPending;

  return { handleToggleFavorite, isLoading };
}
