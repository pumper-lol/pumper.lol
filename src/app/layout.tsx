import type { Metadata } from "next";
import { DM_Sans, Dokdo } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Layout from "@/components/Layout";
import { AppRainbowKitProvider } from "@/providers/wagmi";
import { headers } from "next/headers";
import { AppApolloProvider } from "@/providers/AppApolloProvider";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import Head from "next/head";

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
        <AppApolloProvider>
          <AppRainbowKitProvider cookie={cookie}>
            <Layout>{children}</Layout>
          </AppRainbowKitProvider>
        </AppApolloProvider>
      </body>
    </html>
  );
}
