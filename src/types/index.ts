export type Booth = {
  yatai_id: string;
  area: string;
  booth_no?: number;
  booth_name: string;
  org_name?: string;
  sponsor_flag?: boolean;
};

export type BoothStatus = {
  yatai_id: string;
  warn_count: number;
  kenshoku: boolean;
  gas_check: boolean;
  sales_allowed: boolean;
};
