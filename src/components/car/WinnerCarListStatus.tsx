import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function WinnerCarListStatus({
  isWinner,
  isSold,
}: {
  isWinner: boolean;
  isSold: boolean;
}) {
  return (
    <>
      {isWinner ? (
        <>
          <div className="absolute right-0 top-0 z-30 flex items-center justify-center gap-2 rounded-bl-xl bg-green-300/90 px-5 py-1 text-sm text-gray-800">
            <Icon
              icon={isSold ? "fa6-solid:flag-checkered" : "fa6-solid:award"}
            />
            {isSold ? "Terjual" : "Anda Menang"}
          </div>
        </>
      ) : (
        <>
          <div className="absolute right-0 top-0 z-30 flex items-center justify-center gap-2 rounded-bl-xl bg-red-300/90 px-5 py-1 text-sm text-gray-800">
            <Icon icon="fa-solid:ban" />
            Anda Kalah
          </div>
        </>
      )}
    </>
  );
}
