import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ICarResponse } from "@/types/car";
import { formatCurrency } from "@/utils/format/number";
import usePlaceBid from "@/utils/hooks/usePlaceBid";
import Image from "next/image";
import { useState } from "react";

export function ModalConfirmationBid({
  car,
  amount,
  createdPrice,
  className,
  disabledTriggerButton = false,
}: {
  car: ICarResponse;
  amount: number;
  createdPrice: number;
  className?: string;
  disabledTriggerButton?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { mutationPlaceBid, handlePlaceBid } = usePlaceBid();
  const totalPrice = (createdPrice || 0) + amount;

  const handleSubmit = async () => {
    await handlePlaceBid({ car_id: car?.id, amount });
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={`${className} w-full cursor-pointer text-sm font-bold text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg hover:bg-auc-secondary disabled:cursor-not-allowed`}
        disabled={disabledTriggerButton}
      >
        + {formatCurrency(amount)}
      </Button>

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
              <div className="grid grid-cols-2 gap-2.5">
                <div className="text-start">Penawaran Anda</div>
                <div className="text-end">{formatCurrency(amount)}</div>
              </div>
              <div className="h-[2px] bg-black my-1"></div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="text-start">Tawaran Baru Anda</div>
                <div className="text-end">{formatCurrency(totalPrice)}</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-row gap-2.5">
                <Button
                  className="bg-blue-400"
                  onClick={handleSubmit}
                  disabled={mutationPlaceBid?.isPending}
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
