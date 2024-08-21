"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoMdInformationCircle } from "react-icons/io";
import Image from "next/image";

export function ButtonConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className={`bg-yellow-500 border-2 border-yellow-500 border-opacity-10 text-gray-900 text-sm font-medium px-4 py-2 rounded-full w-full text-center ${!ready ? "opacity-0 pointer-events-none user-select-none" : ""}`}
            >
              Connect wallet
            </button>
          );
        } else if (chain.unsupported) {
          return (
            <button
              onClick={openChainModal}
              type="button"
              className="flex items-center justify-center gap-1 bg-red-500 text-gray-50 text-sm font-medium px-4 py-2 rounded-full w-full"
            >
              <IoMdInformationCircle size={16} />
              <span>Wrong network</span>
            </button>
          );
        }

        return (
          <button
            onClick={openAccountModal}
            type="button"
            className="flex items-center justify-center gap-1 bg-green-500 text-gray-900 text-sm font-medium px-4 py-2 rounded-full w-full"
          >
            {chain.hasIcon && chain.iconUrl && (
              <Image
                alt={chain.name ?? "Chain icon"}
                src={chain.iconUrl}
                width={26}
                height={26}
              />
            )}
            {account.displayName}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
