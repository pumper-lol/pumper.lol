import type { Metadata } from "next";
import { DM_Sans, Dokdo } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

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
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${dokdo.variable}`}>
        {children}
      </body>
    </html>
  );
}
