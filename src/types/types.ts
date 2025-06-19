interface ItemCount {
  count: number;
  percentage: number;
}

interface TopItems extends ItemCount {
  items: string;
}

interface TopCategory extends ItemCount {
  category: string;
}
interface TopLocation extends ItemCount {
  location: string;
}

interface TopSeason extends ItemCount {
  season: string;
}

interface TopPayment extends ItemCount {
  payment: string;
}

export interface MyDataType {
  cluster_id: number;
  cluster_name: string;
  num_customers: number;
  avg_age: number;
  avg_purchase_amount: number;
  subscription_rate: number;
  dominant_frequency: string;
  marketing_suggestion: string;

  top_items: TopItems[];
  top_category: TopCategory[];
  top_location: TopLocation[];
  top_season: TopSeason[];
  top_payment: TopPayment[];

  discount_usage_rate: number;
  review_rating_score: number;
}
