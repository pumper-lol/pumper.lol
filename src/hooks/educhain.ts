import { BrowserProvider, Contract } from "ethers";
import { useEffect, useMemo, useRef, useState } from "react";
import PumperFactory from "@/artifacts/PumperFactory.json";

interface Network {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}

export function useEduchain() {
  const provider = useRef<BrowserProvider | undefined>();

  const [address, setAddress] = useState<string>();
  const formattedAddress = useMemo(() => {
    if (!address) return;
    const start = address?.slice(0, 6);
    const end = address?.slice(-4);

    return `${start}...${end}`;
  }, [address]);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask is not installed");
    }
    if (provider.current) {
      return;
    }

    provider.current = new BrowserProvider(window.ethereum);
  }, []);

  async function connectWallet() {
    if (!provider.current) {
      throw new Error("No Ethereum provider found. Please install MetaMask.");
    }

    try {
      const [address] = await provider.current?.send("eth_requestAccounts", []);
      setAddress(address);
      return address;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to connect to MetaMask");
    }
  }

  async function switchNetwork() {
    const network: Network = {
      chainId: "0xa045c",
      chainName: "Open Campus Codex Sepolia by dRPC",
      nativeCurrency: { decimals: 18, name: "EDU Token", symbol: "EDU" },
      rpcUrls: ["https://open-campus-codex-sepolia.drpc.org"],
      blockExplorerUrls: ["https://opencampus-codex.blockscout.com"],
    };
    if (!provider.current) {
      throw new Error("No Ethereum provider found. Please install MetaMask.");
    }

    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainId }],
      });
    } catch (e: any) {
      if (e.code !== 4902) {
        throw new Error("Failed to switch network");
      }

      try {
        await window.ethereum?.request({
          method: "wallet_addEthereumChain",
          params: [network],
        });
      } catch (addError) {
        console.log(addError);
        throw new Error("Failed to add network");
      }
    }
  }

  async function deployCoin(name: string, symbol: string) {
    if (!provider.current) {
      throw new Error("No Ethereum provider found. Please install MetaMask.");
    }
    if (!address) {
      await switchNetwork();
      await connectWallet();
      return;
    }

    try {
      const runner = await provider.current?.getSigner();
      const contract = new Contract(
        "0xA96114F789F460e5d3ce6Fd746EC8fbeca1f3FBd",
        PumperFactory.abi,
        runner,
      ) as unknown as PumperFactoryContract;

      const salt = await contract.getDeployedPumpTokensLen(address);
      const byteCode = await contract.getBytecode(name, symbol);
      const contractAddress = await contract.getAddressBeforeDeployment(
        byteCode,
        salt,
      );

      const tx = await contract.createPumpToken(name, symbol);
      await tx.wait();

      return contractAddress;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to deploy coin");
    }
  }

  return {
    formattedAddress,
    connectWallet,
    switchNetwork,
    deployCoin,
  };
}

interface PumperFactoryContract extends Contract {
  createPumpToken(name: string, symbol: string): Promise<{ wait: () => any }>;

  getDeployedPumpTokensLen(address: string): Promise<number>;

  getAddressBeforeDeployment(byteCode: string, salt: number): Promise<string>;

  getBytecode(name: string, symbol: string): Promise<string>;
}
