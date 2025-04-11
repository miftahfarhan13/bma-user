export interface IBiddingTime {
  id: number;
  day: string;
  day_number: number;
  session: number;
  start_time: string;
  end_time: string;
}

export type IBiddingTimeResponse = {
  current_bidding_time: {
    bidding_time: IBiddingTime;
    start_time: string;
    end_time: string;
  };
  next_bidding_time: {
    bidding_time: IBiddingTime;
    start_time: string;
    end_time: string;
  };
  previous_bidding_time: {
    bidding_time: IBiddingTime;
    start_time: string;
    end_time: string;
  };
  server_time: string;
};
