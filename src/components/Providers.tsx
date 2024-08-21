"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import {
  argentWallet,
  binanceWallet,
  coinbaseWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

const { wallets } = getDefaultWallets();
const queryClient = new QueryClient();

const testnet = defineChain({
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
    ],
  }),
  chains: [testnet],
  ssr: true,
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
