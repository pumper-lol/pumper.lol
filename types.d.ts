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
}

type Reply = {
  creator: Creator;
  message: string;
  likes: number;
  parentId: string;
};
