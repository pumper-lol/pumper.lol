"use server";
import axios from "axios";
import { formatEther } from "viem";
import LaunchpadArtifact from "@/artifacts/LaunchpadContract.json";

export async function tokenInCirculationHolders(address: string) {
  const response = await axios.get<{ items: CoinData[] }>(
    `https://opencampus-codex.blockscout.com/api/v2/tokens/${address}/holders`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!(response?.status === 200)) return [];

  let circulating = 0;
  return response?.data?.items
    ?.filter(
      (item: CoinData) =>
        item.address.hash !== LaunchpadArtifact.testnetAddress,
    )
    ?.map((item: CoinData) => {
      circulating += +item.value;
      return {
        address: item.address.hash,
        value: +item.value,
      };
    })
    ?.map((item: { address: string; value: number }) => {
      return {
        address: item.address,
        value: formatEther(BigInt(item.value)),
        percentage: ((item.value / circulating) * 100).toFixed(2),
      };
    });
}
