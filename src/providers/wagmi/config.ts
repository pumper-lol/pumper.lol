import {
  Chain,
  getDefaultConfig,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  binanceWallet,
  coinbaseWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { cookieStorage, createStorage, http } from "wagmi";

const { wallets } = getDefaultWallets();

export const testnet = {
  id: 656476,
  name: "EDUCHAIN",
  iconUrl: "/edu.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "EDUCHAIN", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://opencampus-codex.blockscout.com",
    },
  },
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: "Pumper",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains: [testnet],
  transports: {
    [testnet.id]: http("https://rpc.open-campus-codex.gelato.digital"),
  },
  wallets: [
    ...wallets,
    {
      groupName: "Others",
      wallets: [
        argentWallet,
        trustWallet,
        ledgerWallet,
        binanceWallet,
        coinbaseWallet,
      ],
    },
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
