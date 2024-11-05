import type { Metadata } from "next";
import { DM_Sans, Dokdo } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Layout from "@/components/Layout";
import { AppRainbowKitProvider } from "@/providers/wagmi";
import { headers } from "next/headers";
import { AppApolloProvider } from "@/providers/AppApolloProvider";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import { EnvProvider } from "@/contexts/Env";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
const dokdo = Dokdo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dokdo",
});

export const metadata: Metadata = {
  title: "Pumper.lol",
  description:
    "An innovative platform designed to empower users by allowing them to create and trade meme coins on the EduChain network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookie = headers().get("cookie");
  return (
    <html lang="en">
      <GoogleTagManager />
      <body className={`${dmSans.className} ${dokdo.variable} bg-[#000c05]`}>
        <EnvProvider
          env={{
            NEXT_PUBLIC_PINATA_GATEWAY_URL: process.env
              .NEXT_PUBLIC_PINATA_GATEWAY_URL as string,
            NEXT_PUBLIC_PROJECT_ID: process.env
              .NEXT_PUBLIC_PROJECT_ID as string,
            NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env
              .NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
          }}
        >
          <AppApolloProvider>
            <AppRainbowKitProvider cookie={cookie}>
              <Layout>{children}</Layout>
            </AppRainbowKitProvider>
          </AppApolloProvider>
        </EnvProvider>
      </body>
    </html>
  );
}
