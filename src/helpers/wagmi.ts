import { getDefaultConfig, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import {
  argentWallet,
  binanceWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const testnet = defineChain({
  id: 656476,
  name: "Open Campus Codex Sepolia by dRPC",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
  },
  blockExplorers: {
    default: {
      name: "Open Campus Codex explorer",
      url: "https://opencampus-codex.blockscout.com",
    },
  },
  testnet: true,
});
const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
  projectId: "bb699fd5fdd84faea112b0144b9442ca",
  appName: "Pumper.lol",
  wallets: wallets.concat({
    groupName: "Other",
    wallets: [
      argentWallet,
      trustWallet,
      ledgerWallet,
      binanceWallet,
      coinbaseWallet,
      metaMaskWallet,
    ],
  }),
  chains: [testnet],
  ssr: true,
});
