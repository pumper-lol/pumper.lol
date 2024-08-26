"use client";
import { useQuery } from "@apollo/client";
import { GET_TRADES } from "@/helpers/graphqlQueries";
import { formatAddress, formatHash } from "@/helpers/ethers";
import { useEffect, useState } from "react";
import { formatEther } from "viem";

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
        .sort((a, b) => b.timestamp_ - a.timestamp_),
    );
  }, [data, history]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="rounded-md bg-green-900 bg-opacity-60 divide-y divide-gray-600 px-4 m-4">
      <table className="w-full">
        <thead>
          <tr className="text-gray-300 text-left">
            <th className="py-4">Hash</th>
            <th className="py-4">Type</th>
            <th className="py-4">Amount</th>
            <th className="py-4">Price</th>
            <th className="py-4">From/To</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((trade, index) => (
            <tr key={index} className="divide-y divide-green-500 text-gray-300">
              <td className="py-2">{formatHash(trade.transactionHash_)}</td>
              <td className="py-2">{trade.__typename}</td>
              <td className="py-2">{formatEther(BigInt(trade.amount))}</td>
              <td className="py-2">{formatEther(BigInt(trade.price))}</td>
              <td className="py-2">
                {formatAddress(trade.buyer ?? (trade.seller as string))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
