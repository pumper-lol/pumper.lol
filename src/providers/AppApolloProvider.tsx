"use client";
import client from "@/helpers/apollo";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export function AppApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
