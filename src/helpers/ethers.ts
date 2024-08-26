import { Config, getConnectorClient } from "@wagmi/core";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import type { Account, Chain, Client, Transport } from "viem";

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  return new JsonRpcSigner(provider, account.address);
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(
  config: Config,
  { chainId }: { chainId?: number } = {},
) {
  return clientToSigner(await getConnectorClient(config, { chainId }));
}

export function formatAddress(address: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatHash(hash: string) {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-4)}`;
}
