export interface IPaginationResponse {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export type IPaginationParams = {
  isPaginate?: string;
  page?: number;
  show?: number;
  search?: string;
  date?: string;
  sort?: string;
  orderBy?: string;
  perPage?: number;
};
