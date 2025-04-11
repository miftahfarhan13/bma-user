import React from "react";
import { AuctionCountdown } from "./AuctionCountdown";
import { IBiddingTimeResponse } from "@/types/biddingTime";

export default function BidTimer({
  biddingTime,
}: {
  biddingTime: IBiddingTimeResponse;
}) {
  return (
    <>
      {biddingTime?.server_time && (
        <AuctionCountdown
          label={
            biddingTime?.current_bidding_time?.end_time
              ? "Lelang berakhir dalam: "
              : "Lelang selanjutnya dimulai dalam: "
          }
          serverTime={biddingTime?.server_time}
          endTime={
            biddingTime?.current_bidding_time?.end_time ||
            biddingTime?.next_bidding_time?.start_time
          }
        />
      )}
    </>
  );
}
