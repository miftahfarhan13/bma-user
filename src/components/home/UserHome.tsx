import { useAuth } from "@/utils/context/AuthProvider";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils/format/string";
import moment from "moment";
import { formatCurrency } from "@/utils/format/number";

export default function UserHome() {
  const { user } = useAuth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="flex flex-row items-center gap-2.5 bg-red-900 p-3 md:p-5">
        <Avatar className="bg-white w-15 h-15">
          <AvatarImage
            src={
              user?.avatar
                ? `${process.env.NEXT_PUBLIC_API_URL}/storage/avatars/${user?.avatar}`
                : "/images/avatar.png"
            }
            className="object-cover"
          />
          <AvatarFallback>{getInitials(user?.name || "")}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-white">
          <p className="uppercase font-bold">{user?.name}</p>
          <div className="flex flex-col text-xs">
            <p>
              {user?.is_deposit
                ? `Deposit ${user?.bank_name} (${moment(
                    new Date(user?.deposit_date)
                  ).format("DD-MMMM-YYYY")})`
                : "Belum deposit"}
            </p>
            <p>
              Aktif sejak{" "}
              {moment(new Date(user?.created_at || ""), "YYYYMMDD").fromNow()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-2 md:p-4 text-sm">
        <div className="flex flex-col">
          <p className="font-bold">Total Mobil Terjual</p>
          <p>0</p>
        </div>

        <div className="flex flex-col">
          <p className="font-bold">Total Spend Belanja Mobil</p>
          <p>Rp 0</p>
        </div>

        <div className="flex flex-col">
          <p className="font-bold">Total Deposit</p>
          <p>{formatCurrency(user?.deposit_nominal || 0)}</p>
        </div>
      </div>
    </div>
  );
}
