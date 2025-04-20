import { BidEventPayload, IBid, IBidLiveResponse } from "@/types/bid";
import { ICarResponse } from "@/types/car";
import React, { useEffect, useState } from "react";
import CarItemBid from "./CarItemBid";
import CarItemBidList from "./CarItemBidList";
import { IBiddingTimeResponse } from "@/types/biddingTime";

export default function CarBidList({
  userId,
  car,
  bid,
  listType,
  biddingTime,
}: {
  userId: number;
  car: ICarResponse;
  bid?: IBid;
  listType: string;
  biddingTime: IBiddingTimeResponse;
}) {
  const [sessionTimeEnd, setSessionTimeEnd] = useState<string | undefined>("");
  const [createdPrice, setCreatedPrice] = useState<number | undefined>(
    undefined
  );
  const [bidCount, setBidCount] = useState<number | undefined>(undefined);
  const [bidUserCount, setBidUserCount] = useState<number | undefined>(
    undefined
  );
  const [isCurrentlyWin, setIsCurrentlyWin] = useState(false);
  const [serverTimeStart, setServerTimeStart] = useState<string>("");

  useEffect(() => {
    setCreatedPrice(car?.created_price || car?.price);
    setBidCount(car?.bids_count);
    setBidUserCount(car?.unique_user_bids_count);
    setSessionTimeEnd(car?.session_time_end);
    if (car?.bids && car?.bids?.length > 0) {
      const isWin = car?.bids[0]?.user_id === userId;
      setIsCurrentlyWin(isWin);
    } else {
      setIsCurrentlyWin(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car, car?.id]);

  useEffect(() => {
    setServerTimeStart(biddingTime?.server_time);
  }, [biddingTime?.server_time]);

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
      setServerTimeStart(liveCar?.datetime);

      const bid = liveCar[`bid-place-1`];

      setIsCurrentlyWin(bid.user === userId);
    };

    channel.listen("BidEvent", handleBidEvent);

    return () => {
      window.Echo.leave(channelName);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {listType === "grid" ? (
        <>
          <CarItemBid
            car={car}
            isCurrentlyWin={isCurrentlyWin}
            createdPrice={createdPrice || 0}
            bidCount={bidCount || 0}
            bidUserCount={bidUserCount || 0}
            serverTimeStart={serverTimeStart}
            sessionTimeEnd={sessionTimeEnd || ""}
            biddingTime={biddingTime}
          />
        </>
      ) : (
        <>
          <CarItemBidList
            car={car}
            bid={bid}
            isCurrentlyWin={isCurrentlyWin}
            createdPrice={createdPrice || 0}
            bidCount={bidCount || 0}
            bidUserCount={bidUserCount || 0}
          />
        </>
      )}
    </>
  );
}
