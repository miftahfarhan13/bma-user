export interface IBid {
  id?: number;
  amount?: number;
  car_id?: number;
  created_at?: string;
  deleted_at?: string;
  is_buy_now?: number;
  updated_at?: string;
  user_id?: number;
}

export interface IPlaceBidRequest {
  car_id?: number;
  amount?: number;
}

type BidPlace = {
  amount: number;
  user: number;
};

export interface IBidLiveResponse {
  id: number;
  "bid-count": number;
  "bid-place-1": BidPlace;
  "bid-place-2": BidPlace;
  "bid-place-3": BidPlace;
  "bid-user-count": number;
  bid_users: number[];
  buy_now: number;
  buy_now_price: number;
  datetime: string;
  price: number;
  session_time_end: string;
  top: number;
  winner_id: number;
  [key: `bid-place-${number}`]: BidPlace;
}

export type BidEventPayload = {
  data: Record<number, IBidLiveResponse>;
};
