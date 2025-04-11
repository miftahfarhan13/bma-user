import React from "react";
import moment from "moment";
import { IBid } from "@/types/bid";

interface BidCountdownProps {
  bid?: IBid;
}

const HideCarListCountdown: React.FC<BidCountdownProps> = ({ bid }) => {
  if (!bid) return null;

  const createdAt = moment(bid.created_at);
  const hideIn = createdAt.clone().add(30, "days");
  const now = moment();

  const days = hideIn.diff(now, "days");
  const remainingDays = days >= 0 ? days : 0;

  return (
    <div className="absolute left-1/2 top-1/2 flex h-[3.5rem] w-[3.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white/20 text-red-800/40">
      <div className="text-[1.5rem] font-black leading-none lg:text-[2.5rem]">
        {remainingDays}
      </div>
      <div className="leading-none">
        <span className="text-xs font-semibold">Hari Lagi</span>
      </div>
    </div>
  );
};

export default HideCarListCountdown;
