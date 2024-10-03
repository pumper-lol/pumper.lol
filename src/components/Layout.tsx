"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import MobileNav from "@/components/MobileNav";
import ModalHowItWorks from "@/components/ModalHowItWorks";
import Link from "next/link";
import { ButtonConnectWallet } from "@/components/ButtonConnectWallet";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { modalHowItWorksIsOpen, openHowItWorksModal, closeHowItWorksModal } =
    useHowItWorksModal();
  return (
    <div className="min-h-screen overflow-y-auto text-white">
      <header className="container mx-auto p-4 flex justify-between items-center gap-2">
        <div className="flex justify-between items-center relative h-14 w-full">
          <div className="text-2xl font-bold font-dokdo absolute">
            <Link href="/">
              <Image src="/logo.svg" alt="Pumper logo" width={74} height={24} />
            </Link>
          </div>
          <nav className="w-full hidden md:block">
            <ul className="flex justify-center gap-3 mx-auto w-full">
              <li>
                <button
                  onClick={openHowItWorksModal}
                  className="hover:underline font-medium"
                >
                  How it Works
                </button>
              </li>
              <li>
                <a href="#" className="hover:underline font-medium">
                  Support
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/pumper_lol"
                  className="hover:underline font-medium"
                >
                  Community
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 absolute right-0">
            <Link
              href="/create"
              className="bg-transparent border-2 border-white border-opacity-40 text-sm font-medium px-4 py-2 rounded-full"
            >
              Start a new coin
            </Link>
            <div className="hidden lg:block">
              <ButtonConnectWallet />
            </div>
          </div>
        </div>
        <MobileNav />
      </header>
      <main>{children}</main>
      {modalHowItWorksIsOpen && (
        <ModalHowItWorks close={closeHowItWorksModal} />
      )}
    </div>
  );
}

const SHOW_HOW_IT_WORKS_KEY = "showHowItWorks";
function useHowItWorksModal() {
  const [modalHowItWorksIsOpen, setModalHowItWorksIsOpen] = useState(false);

  useEffect(
    () =>
      setModalHowItWorksIsOpen(
        localStorage.getItem(SHOW_HOW_IT_WORKS_KEY) !== "false",
      ),
    [],
  );

  const openHowItWorksModal = () => {
    setModalHowItWorksIsOpen(true);
  };

  const closeHowItWorksModal = () => {
    setModalHowItWorksIsOpen(false);
    localStorage.setItem(SHOW_HOW_IT_WORKS_KEY, "false");
  };
  return {
    modalHowItWorksIsOpen,
    openHowItWorksModal,
    closeHowItWorksModal,
  };
}
