import IconBid from "@/icons/IconBid";
import IconUsers from "@/icons/IconUsers";
import { formatCurrency } from "@/utils/format/number";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { ICarResponse } from "@/types/car";
import { useBid } from "@/utils/context/BidProvider";
import { useAuth } from "@/utils/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getBidsByCarId } from "@/service/bid";
import { BidEventPayload, IBid, IBidLiveResponse } from "@/types/bid";
import { ModalConfirmationBid } from "./Bid/ModalConfirmationBid";
import useEcho from "@/utils/hooks/useEcho";
import FormMaxBid from "./Bid/FormMaxBid";

export default function DetailCarLiveBid({ car }: { car: ICarResponse }) {
  useEcho();
  const { user, token } = useAuth();
  const {
    bidCount,
    bidUserCount,
    bids,
    setBids,
    setCreatedPrice,
    setBidCount,
    setBidUserCount,
    setSessionTimeEnd,
  } = useBid();
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["bids-by-car", token],
    queryFn: () => getBidsByCarId(car?.id),
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && !isPending) {
      const currentBids: IBid[] = [];
      for (let i = 0; i < 3; i++) {
        const bid = data ? data[i] : undefined;
        currentBids.push({
          amount: bid?.amount || undefined,
          user_id: bid?.user_id || undefined,
        });
      }
      setBids(currentBids);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isPending]);

  useEffect(() => {
    window.Echo.channel("bid.place").listen(
      "BidEvent",
      async (e: BidEventPayload) => {
        const liveCar: IBidLiveResponse | undefined = e.data[car?.id ?? -1];
        if (!liveCar) return;

        console.log(liveCar)

        setCreatedPrice(liveCar.price);
        setBidCount(liveCar["bid-count"]);
        setBidUserCount(liveCar["bid-user-count"]);
        setSessionTimeEnd(liveCar.session_time_end);

        const currentBids: IBid[] = [];
        for (let i = 1; i <= 3; i++) {
          const bid = liveCar[`bid-place-${i}`];
          currentBids.push({
            amount: bid?.amount ?? undefined,
            user_id: bid?.user ?? undefined,
          });
        }

        setBids(currentBids);
      }
    );

    return () => {
      window.Echo.channel("bid.place").stopListening("BidEvent");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="px-5 pt-3 pb-4 mt-3 border border-gray-300 rounded-lg md:mt-5 md:pb-6 md:pt-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-gray-800 sm:text-lg md:text-2xl">
            Penawaran
          </div>

          <div className="flex justify-end gap-5">
            <div className="flex items-center gap-2 text-gray-800">
              <IconBid style={{ width: "24px" }} />
              <span
                id="bid-count"
                className="text-lg font-semibold"
                data-bid-count="{{ $count = $car->bid()->count() }}"
              >
                {bidCount}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <IconUsers style={{ width: "24px" }} />
              <span
                id="bid-user-count"
                className="text-lg font-semibold"
                data-bid-user-count="{{ $count = $car->bid()->distinct('user_id')->count('user_id') }}"
              >
                {bidUserCount}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4 border border-gray-300 rounded-lg overflow-hidden">
          {bids?.map((bid, index) => {
            const isCurrentUser = bid?.user_id === user?.id;
            return (
              <div
                key={index}
                className={`flex items-center gap-5 px-6 text-lg py-2 ${
                  isCurrentUser
                    ? "font-bold bg-red-900 text-white"
                    : "font-semibold text-gray-800"
                } `}
              >
                {bid?.amount ? formatCurrency(bid?.amount) : "-"}{" "}
                {isCurrentUser && <Icon icon="fa6-solid:hand-point-left" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-6">
        <ModalConfirmationBid car={car} amount={500000} />
        <ModalConfirmationBid car={car} amount={1000000} />
      </div>

      <div className="flex flex-col gap-2.5 mt-4">
        <div className="text-sm font-bold text-gray-800 sm:text-lg md:text-2xl">
          Penawaran Maksimum
        </div>
        <FormMaxBid car={car} />

        {/* <form
          id="form-lock-bid"
          className="flex items-center justify-between gap-2 mt-2 mb-5"
        >
          <input
            type="text"
            inputMode="numeric"
            placeholder="Masukkan Penawaran..."
            className="py-2 px-2 border-2 rounded-md shadow-sm border-red-800 focus:border-red-800 w-[60%]"
            // value=""
          />

          <Button
            type="submit"
            className="py-5 border-2 border-red-800 text-[1rem] bg-red-800 hover:bg-red-900 text-white w-[40%]"
          >
            <Icon icon="fa6-solid:money-bill" className="text-[1rem]" />
            <span className="hidden sm:block">Masukkan</span>
          </Button>
        </form> */}
      </div>
    </>
  );
}
