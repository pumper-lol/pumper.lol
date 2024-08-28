import axios from "axios";
import { formatAddress } from "@/helpers/ethers";
import { formatEther } from "viem";

export async function CoinHolder({ address }: { address: string }) {
  const response = await axios.get<{ items: CoinData[] }>(
    `https://opencampus-codex.blockscout.com/api/v2/tokens/${address}/holders`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!(response?.status === 200)) return <></>;
  let circulating = 0;
  const holders = response?.data?.items
    ?.map((item: CoinData) => {
      circulating += +item.value;
      return {
        address: formatAddress(item.address.hash),
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

  return (
    <div className="rounded-md bg-green-900 bg-opacity-60 divide-y divide-gray-600 px-4">
      <div className="flex justify-between py-4 text-gray-300">
        <span className="">Holder</span>
        <span className="">Percentage</span>
      </div>
      {holders.map((item, index) => (
        <div key={index} className="flex justify-between py-2 text-gray-300">
          <a
            href={`https://opencampus-codex.blockscout.com/address/${item.address}`}
          >
            {formatAddress(item.address)}
          </a>
          <span className="">{item.percentage}%</span>
        </div>
      ))}
    </div>
  );
}
