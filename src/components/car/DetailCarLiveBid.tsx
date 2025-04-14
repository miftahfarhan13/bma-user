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
import FormMaxBid from "./Bid/FormMaxBid";

export default function DetailCarLiveBid({ car }: { car: ICarResponse }) {
  const { user, token } = useAuth();
  const {
    createdPrice,
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
    queryKey: ["bids-by-car", token, car],
    queryFn: () => getBidsByCarId(car?.id),
    enabled: !!token,
    refetchOnWindowFocus: true,
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
    const channelName = "bid.place";
    const channel = window.Echo.channel(channelName);

    const handleBidEvent = async (e: BidEventPayload) => {
      const liveCar: IBidLiveResponse | undefined = e.data[car?.id ?? -1];
      if (!liveCar) return;

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
    };

    channel.listen("BidEvent", handleBidEvent);

    return () => {
      window.Echo.leave(channelName);
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
        <ModalConfirmationBid
          car={car}
          amount={500000}
          createdPrice={createdPrice || 0}
          className="sm:text-lg md:px-5 md:text-xl h-[44px]"
        />
        <ModalConfirmationBid
          car={car}
          amount={1000000}
          createdPrice={createdPrice || 0}
          className="sm:text-lg md:px-5 md:text-xl h-[44px]"
        />
      </div>

      <div className="flex flex-col gap-2.5 mt-4">
        <div className="text-sm font-bold text-gray-800 sm:text-lg md:text-2xl">
          Penawaran Maksimum
        </div>
        <FormMaxBid car={car} createdPrice={createdPrice || 0} type="detail" />
      </div>
    </>
  );
}
