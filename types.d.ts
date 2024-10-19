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
  marketCap: number;
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
