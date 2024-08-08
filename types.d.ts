interface Coin {
  name: string;
  ticker: string;
  description: string;
  twitterUrl?: string;
  telegramUrl?: string;
  websiteUrl?: string;
  creator: {
    avatarUrl: string;
    name: string;
  };
  marketCap: number;
  replies_count: number;
  imageUrl: string;
}
