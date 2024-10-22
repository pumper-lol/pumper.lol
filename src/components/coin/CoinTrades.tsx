"use client";
import { useQuery } from "@apollo/client";
import { formatAddress, formatHash } from "@/helpers/ethers";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { timestampToHumanDiff } from "@/helpers/date";
import { GET_TRADES } from "@/helpers/graphql";

export function CoinTrades({ coin }: { coin: Coin }) {
  const { loading, error, data } = useQuery<{ sells: Trade[]; buys: Trade[] }>(
    GET_TRADES,
    {
      variables: { token: coin.address?.toLowerCase() },
    },
  );
  const [history, setHistory] = useState<Trade[]>();

  useEffect(() => {
    setHistory(
      Object.values(data ?? [])
        ?.flat()
        .sort((a, b) => {
          return parseInt(b.timestamp_) - parseInt(a.timestamp_);
        }),
    );
  }, [data, setHistory]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="rounded-md bg-green-900 bg-opacity-60 divide-y divide-gray-600 py-4 m-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-300 font-medium text-left border-b-2 border-green-500">
            <th className="py-2 px-4">Tx Hash</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Account</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-500 text-gray-300">
          {history?.map((trade, index) => (
            <tr key={index} className="">
              <td className="py-2 px-4">
                <span className="inline-block">
                  <span className="block text-sm">
                    <a
                      href={`https://opencampus-codex.blockscout.com/tx/${trade.transactionHash_}`}
                    >
                      {formatHash(trade.transactionHash_)}
                    </a>
                  </span>
                  <span className="block text-sm text-green-600">
                    {timestampToHumanDiff(
                      (parseInt(trade.timestamp_) * 1000).toString(),
                    )}
                  </span>
                </span>
              </td>
              <td className="py-2 px-4">
                {trade.__typename === "TokenPurchased" ? "BUY" : "SELL"}
              </td>
              <td className="py-2 px-4">
                <span className="inline-block">
                  <span className="block text-sm">
                    {formatEther(BigInt(trade.tokenAmount))}
                  </span>
                  <span className="block text-sm">
                    {formatEther(BigInt(trade.trxAmount))} EDU
                  </span>
                </span>
              </td>
              <td className="py-2 px-4">
                {Number(trade.trxAmount) / Number(trade.tokenAmount)}
              </td>
              <td className="py-2 px-4">
                {formatAddress(trade.buyer ?? (trade.seller as string))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
