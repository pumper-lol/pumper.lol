"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";

const TokenEventsContext = createContext<TokenEventsContextType | undefined>(
  undefined,
);

export const TokenEventsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tokenCreates, setTokenCreates] = useState<TokenCreate[]>([]);
  const [tokenPurchaseds, setTokenPurchaseds] = useState<TokenPurchased[]>([]);
  const [tokenSolds, setTokenSolds] = useState<TokenSold[]>([]);
  const [tokenEvents, setTokenEvents] = useState<TokenEvent[]>([]);

  // useEffect(() => {
  //   if (!data) return;
  //   const tokenEvent: TokenEvent = {
  //     id: "",
  //     action: "created",
  //     account: "",
  //     amount: 0,
  //     token: "",
  //     timestamp: 0,
  //   };
  //
  //   if (data.tokenCreate) {
  //     setTokenCreates((prev) => [...prev, data.tokenCreate]);
  //     tokenEvent.id = data.tokenCreate.id;
  //     tokenEvent.action = "created";
  //     tokenEvent.account = data.tokenCreate.creator;
  //     tokenEvent.token = data.tokenCreate.tokenAddress;
  //   }
  //   if (data.tokenPurchased) {
  //     setTokenPurchaseds((prev) => [...prev, data.tokenPurchased]);
  //     tokenEvent.id = data.tokenPurchased.id;
  //     tokenEvent.action = "purchased";
  //     tokenEvent.account = data.tokenPurchased.buyer;
  //     tokenEvent.amount = data.tokenPurchased.tokenAmount;
  //     tokenEvent.token = data.tokenPurchased.token;
  //     tokenEvent.timestamp = data.tokenPurchased.timestamp_;
  //   }
  //   if (data.tokenSold) {
  //     setTokenSolds((prev) => [...prev, data.tokenSold]);
  //     tokenEvent.id = data.tokenSold.id;
  //     tokenEvent.action = "sold";
  //     tokenEvent.account = data.tokenSold.seller;
  //     tokenEvent.amount = data.tokenSold.tokenAmount;
  //     tokenEvent.token = data.tokenSold.token;
  //   }
  //
  //   setTokenEvents((prev) => [...prev, tokenEvent]);
  // }, [data]);
  //
  // useEffect(() => {
  //   console.log(data, loading, error);
  // }, [data, error, loading]);

  return (
    <TokenEventsContext.Provider
      value={{
        tokenCreates,
        tokenPurchaseds,
        tokenSolds,
        tokenEvents,
        loading: false,
        error: "",
      }}
    >
      {children}
    </TokenEventsContext.Provider>
  );
};

export function useTokenEvents(): TokenEventsContextType {
  const context = useContext(TokenEventsContext);
  if (!context) {
    throw new Error("useTokenEvents must be used within a TokenEventsProvider");
  }
  return context;
}
