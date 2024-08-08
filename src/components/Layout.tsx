"use client";
import { ReactNode, useState } from "react";
import MobileNav from "@/components/MobileNav";
import ModalHowItWorks from "@/components/ModalHowItWorks";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [modalHowItWorksIsOpen, setModalHowItWorksIsOpen] = useState(true);
  return (
    <div className="min-h-screen overflow-y-auto bg-black text-white">
      <header className="p-4 flex justify-between items-center">
        <div className="flex justify-between items-center relative h-14 w-full">
          <div className="text-2xl font-bold font-dokdo absolute ml-4">
            PumpeR
          </div>
          <nav className="w-full hidden md:block">
            <ul className="flex justify-center gap-3 mx-auto w-full">
              <li>
                <button
                  onClick={() => setModalHowItWorksIsOpen(true)}
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
                <a href="#" className="hover:underline font-medium">
                  Community
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 absolute right-0 mr-4">
            <button className="bg-transparent border-2 border-white border-opacity-40 text-sm font-medium px-4 py-2 rounded-full">
              Start a new coin
            </button>
            <button className="hidden md:block bg-yellow-500 border-2 border-yellow-500 border-opacity-10 text-gray-900 text-sm font-medium px-4 py-2 rounded-full">
              Connect wallet
            </button>
          </div>
        </div>
        <MobileNav />
      </header>
      <main>{children}</main>
      <ModalHowItWorks
        isOpen={modalHowItWorksIsOpen}
        close={() => setModalHowItWorksIsOpen(false)}
      />
    </div>
  );
};

export default Layout;
