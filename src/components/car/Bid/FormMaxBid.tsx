import { Button } from "@/components/ui/button";
import { ICarResponse } from "@/types/car";
import usePlaceBid from "@/utils/hooks/usePlaceBid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatCurrency, formatCurrencyInput } from "@/utils/format/number";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function FormMaxBid({
  car,
  createdPrice,
  type,
}: {
  car: ICarResponse;
  createdPrice: number;
  type: string;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const { handlePlaceLockBid, mutationPlaceLockBid } = usePlaceBid();

  useEffect(() => {
    setAmount(car?.bid_lock?.amount);
  }, [car]);

  const handleSubmit = () => {
    if (!amount) {
      toast.warning("Failed", {
        description: "Silahkan isi penawaran anda",
        position: "top-center",
      });
      return;
    }

    if (amount > (createdPrice || 0)) {
      setAmount(amount || 0);
      setOpen(true);
    } else {
      toast.warning("Failed", {
        description:
          "Penawaran maksimal anda harus lebih besar dari Harga saat ini",
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (type === "detail" || car?.bid_lock?.amount) {
      setIsFormOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      {isFormOpen ? (
        <>
          <div className="flex flex-row gap-2.5 w-full items-start">
            <div className="flex flex-row w-full">
              <div className="flex items-center bg-gray-200 px-2.5 rounded-l-md">
                Rp
              </div>
              <Input
                className="rounded-l-none h-[38px]"
                placeholder="Masukkan Penawaran..."
                name="amount"
                type="text"
                value={formatCurrencyInput(amount || "")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setAmount(Number(raw));
                }}
              />
            </div>

            <Button
              className={`border-2 border-red-800 text-[1rem] bg-red-800 hover:bg-red-900 text-white ${
                type === "detail" && "w-[40%]"
              } h-[38px]`}
              disabled={mutationPlaceLockBid.isPending}
              onClick={handleSubmit}
            >
              {mutationPlaceLockBid.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Icon icon="fa6-solid:money-bill" className="text-[1rem]" />
              )}
              {type === "detail" && (
                <span className="hidden sm:block">Masukkan</span>
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div
            className="text-gray-500 text-sm h-[38px] flex justify-center items-center"
            onClick={() => setIsFormOpen(true)}
          >
            Klik untuk penawaran maksimum
            <Icon
              icon="fa:chevron-down"
              className="ml-2"
              width={10}
              height={10}
            />
          </div>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penawaran</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2.5 border border-gray-200 p-2.5 rounded-lg">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${car?.car_images[0]?.img_path}`}
                alt={`Foto ${car?.car_name}`}
                width={100}
                height={80}
                className="object-cover w-auto h-auto rounded-sm"
              />
              <div className="flex flex-col">
                <p className="text-xs">{car?.id}</p>
                <p className="font-bold">
                  {car?.brand?.brand_name} {car?.car_name}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="text-start">Harga Saat Ini</div>
                <div className="text-end">
                  {formatCurrency(createdPrice || 0)}
                </div>
              </div>
              <div className="h-[2px] bg-black my-1"></div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="text-start">Tawaran Maksimal Anda</div>
                <div className="text-end">{formatCurrency(amount || 0)}</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-row gap-2.5">
                <Button
                  className="bg-blue-400"
                  onClick={() => {
                    handlePlaceLockBid({ car_id: car?.id, amount });
                    setOpen(false);
                  }}
                  disabled={mutationPlaceLockBid?.isPending}
                >
                  Setuju
                </Button>
                <Button
                  variant="outline"
                  className="text-red-800 border-red-800"
                  onClick={() => setOpen(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
