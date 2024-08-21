"use client";

import {
  darkTheme,
  DisclaimerComponent,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { config } from "./config";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
  cookie: string | null;
};

export function AppRainbowKitProvider({ children, cookie }: Props) {
  const Disclaimer: DisclaimerComponent = ({ Text, Link }) => <Text> </Text>;
  return (
    <WagmiProvider
      config={config}
      initialState={cookieToInitialState(config, cookie)}
    >
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          showRecentTransactions={false}
          appInfo={{
            appName: "PumpeR",
            disclaimer: Disclaimer,
          }}
          modalSize="compact"
          theme={darkTheme()}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
