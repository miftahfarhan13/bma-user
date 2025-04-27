import Countdown from "react-countdown";
import moment from "moment";
import { useEffect, useState } from "react";
import { playSound } from "@/utils/function/sound";
import CircularProgress from "../ui/circular-progress";

interface AuctionCountdownProps {
  serverTime: string;
  endTime: string;
  size: number;
  onAuctionEnd: () => void;
}

export const AuctionCountdownCircular = ({
  serverTime,
  endTime,
  size,
  onAuctionEnd,
}: AuctionCountdownProps) => {
  const [countdownTarget, setCountdownTarget] = useState<Date | null>(null);

  useEffect(() => {
    const clientNow = moment();
    const serverNow = moment(serverTime);
    const offset = clientNow.diff(serverNow); // difference in ms

    // Adjust endTime by offset to simulate synced time
    setCountdownTarget(moment(endTime).add(offset).toDate());
  }, [serverTime, endTime]); // Recalculate only when serverTime or endTime changes

  const countdownKey = countdownTarget?.getTime() || 0;

  if (!countdownTarget) return <span>Loading...</span>;

  return (
    <>
      <Countdown
        key={countdownKey}
        date={countdownTarget}
        renderer={({ hours, minutes, seconds, completed }) => {
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;

          if (completed) {
            playSound("audio-bid-over");
            onAuctionEnd();
            return null;
          }

          if (totalSeconds === 60) {
            playSound("audio-alert-1-minute");
          }

          if (totalSeconds < 60) {
            return <CircularProgress value={seconds} max={60} size={size} />;
          }

          return null;
        }}
      />
    </>
  );
};
