// In a .d.ts file (e.g., src/global.d.ts), add the following declaration:

interface Window {
  ethereum?: import("ethers").Eip1193Provider & {
    isMetaMask?: boolean;
  };
}

interface CoinInput {
  name: string;
  symbol: string;
  description: string;
  twitterUrl?: string;
  discordUrl?: string;
  telegramUrl?: string;
  websiteUrl?: string;
  creator: {
    avatarUrl: string;
    username: string;
    address: string;
  };
  marketCap: number;
  replies_count: number;
  imageUrl: string;
}

type Creator = {
  id: string;
  address: string;
  username: string;
};

interface Coin {
  id: string;
  address: string;
  name: string;
  symbol: string;
  description: string;
  imageIpfsHash: string;
  twitterUrl?: string;
  discordUrl?: string;
  telegramUrl?: string;
  websiteUrl?: string;
  creator: Creator;
  price: number;
  liquidity: number;
  marketCap: number;
  marketCapInUsd: number;
  replies_count: number;
  imageUrl: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

type Reply = {
  creator: Creator;
  message: string;
  likes: number;
  parentId: string;
};

type Address = {
  ens_domain_name: string | null;
  hash: string;
  implementation_address: string | null;
  implementation_name: string | null;
  implementations: any[];
  is_contract: boolean;
  is_verified: boolean;
  metadata: any | null;
  name: string;
  private_tags: any[];
  public_tags: any[];
  watchlist_names: any[];
};

type Token = {
  address: string;
  circulating_market_cap: number | null;
  decimals: string;
  exchange_rate: number | null;
  holders: string;
  icon_url: string | null;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
  volume_24h: number | null;
};

type CoinData = {
  address: Address;
  token: Token;
  token_id: string | null;
  value: string;
};

interface Trade {
  amount: string;
  block_number: string;
  contractId_: string;
  id: string;
  tokenAmount: string;
  trxAmount: string;
  timestamp_: string;
  token: string;
  transactionHash_: string;
  seller?: string;
  buyer?: string;
  __typename: "TokenPurchased" | "TokenSold";
}

type TokenCreate = {
  id: string;
  block_number: number;
  timestamp_: number;
  transactionHash_: string;
  contractId_: string;
  tokenAddress: string;
  tokenIndex: number;
  creator: string;
};

type TokenPurchased = {
  id: string;
  block_number: number;
  timestamp_: number;
  transactionHash_: string;
  contractId_: string;
  token: string;
  buyer: string;
  trxAmount: number;
  fee: number;
  tokenAmount: number;
  tokenReserve: number;
};

type TokenSold = {
  id: string;
  block_number: number;
  timestamp_: number;
  transactionHash_: string;
  contractId_: string;
  token: string;
  seller: string;
  trxAmount: number;
  fee: number;
  tokenAmount: number;
};

type TokenEvent = {
  id: string;
  action: "created" | "purchased" | "sold";
  account: string;
  amount: number;
  token: string;
  timestamp: number;
};

type TokenEventsContextType = {
  tokenCreates: TokenCreate[];
  tokenPurchaseds: TokenPurchased[];
  tokenSolds: TokenSold[];
  tokenEvents: TokenEvent[];
  loading: boolean;
  error?: unknown;
};
interface CoinMarketCapResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
  };
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      slug: string;
      quote: {
        USD: {
          price: number;
          volume_24h: number;
          market_cap: number;
          percent_change_24h: number;
          percent_change_7d: number;
          last_updated: string;
        };
      };
    };
  };
}
