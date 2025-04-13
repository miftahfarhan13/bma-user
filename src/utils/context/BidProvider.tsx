import { IBid } from "@/types/bid";
import React, { createContext, useContext, useState } from "react";

interface BidContextType {
  createdPrice?: number;
  setCreatedPrice: (value?: number) => void;
  bidCount?: number;
  setBidCount: (value?: number) => void;
  bidUserCount?: number;
  setBidUserCount: (value?: number) => void;
  bids?: IBid[];
  setBids: (value?: IBid[]) => void;
  sessionTimeEnd?: string;
  setSessionTimeEnd: (value?: string) => void;
}

const BidContext = createContext<BidContextType | undefined>(undefined);

export const BidProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionTimeEnd, setSessionTimeEnd] = useState<string | undefined>("");
  const [createdPrice, setCreatedPrice] = useState<number | undefined>(
    undefined
  );
  const [bidCount, setBidCount] = useState<number | undefined>(undefined);
  const [bidUserCount, setBidUserCount] = useState<number | undefined>(
    undefined
  );
  const [bids, setBids] = useState<IBid[] | undefined>([]);

  return (
    <BidContext.Provider
      value={{
        createdPrice,
        setCreatedPrice,
        bidCount,
        setBidCount,
        bidUserCount,
        setBidUserCount,
        bids,
        setBids,
        sessionTimeEnd,
        setSessionTimeEnd,
      }}
    >
      {children}
    </BidContext.Provider>
  );
};

export const useBid = () => {
  const context = useContext(BidContext);
  if (!context) {
    throw new Error("useBid must be used within an BidProvider");
  }
  return context;
};
