import Countdown from "react-countdown";
import moment from "moment";
import { useEffect, useState } from "react";
import { playSound } from "@/utils/function/sound";

interface AuctionCountdownProps {
  label: string;
  serverTime: string;
  endTime: string;
}

export const AuctionCountdown = ({
  label,
  serverTime,
  endTime,
}: AuctionCountdownProps) => {
  const [countdownTarget, setCountdownTarget] = useState<Date | null>(null);

  useEffect(() => {
    const clientNow = moment();
    const serverNow = moment(serverTime);
    const offset = clientNow.diff(serverNow); // difference in ms

    // Adjust endTime by offset to simulate synced time
    setCountdownTarget(moment(endTime).add(offset).toDate());
  }, [serverTime, endTime]); // Recalculate only when serverTime or endTime changes

  if (!countdownTarget) return <span>Loading...</span>;

  return (
    <>
      <Countdown
        date={countdownTarget}
        renderer={({ hours, minutes, seconds, completed }) => {
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;

          if (totalSeconds === 60) {
            playSound("audio-alert-1-minute");
          }

          if (completed) {
            window.location.reload();
            playSound("audio-bid-over");
            return (
              <div className="bg-red-900 text-center text-white font-bold py-1">
                {label === "Lelang selanjutnya dimulai dalam: "
                  ? ""
                  : "Lelang Telah Berakhir"}
              </div>
            );
          }

          return (
            <p className="text-center text-red-900 font-bold underline">
              {label}
              {String(hours).padStart(2, "0")}:
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>
          );
        }}
      />
    </>
  );
};
