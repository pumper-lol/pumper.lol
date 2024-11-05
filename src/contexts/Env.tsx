"use client";

import React, { createContext, useContext } from "react";

export type ClientEnv = {
  NEXT_PUBLIC_PINATA_GATEWAY_URL: string;
  NEXT_PUBLIC_PROJECT_ID: string;
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
};

const EnvContext = createContext<ClientEnv | null>(null);

export function EnvProvider({
  env,
  children,
}: {
  env: ClientEnv;
  children: React.ReactNode;
}) {
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
}

export function useEnv(): ClientEnv {
  const context = useContext(EnvContext);
  if (!context) {
    throw new Error("useEnv must be used within an EnvProvider");
  }
  return context;
}
