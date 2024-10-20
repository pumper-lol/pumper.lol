"use client";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import Chart from "react-apexcharts";

import { GET_TRADES } from "@/helpers/graphql";

export function CoinChart({ coin }: { coin: Coin }) {
  const { loading, error, data } = useQuery<{ sells: Trade[]; buys: Trade[] }>(
    GET_TRADES,
    {
      variables: { token: coin.address?.toLowerCase() },
    },
  );

  const weiToEther = (wei: string) => parseFloat(wei) / 1e18;

  const history = useMemo(() => {
    if (!data) return [];

    return Object?.values(data)
      ?.flat()
      .sort((a, b) => parseInt(a.timestamp_) - parseInt(b.timestamp_))
      .map((transaction) => ({
        timestamp: parseInt(transaction.timestamp_) * 1000, // Convert to milliseconds
        price:
          weiToEther(transaction.trxAmount) /
          weiToEther(transaction.tokenAmount),
      }))
      .reduce(
        (
          acc: [number, [number, number, number, number]][],
          { timestamp, price },
        ) => {
          if (acc.length === 0 || timestamp !== acc[acc.length - 1][0]) {
            acc.push([timestamp, [price, price, price, price]]);
          } else {
            const candle = acc[acc.length - 1][1];
            candle[1] = Math.max(candle[1] as number, price); // High
            candle[2] = Math.min(candle[2] as number, price); // Low
            candle[3] = price;
          }
          return acc;
        },
        [],
      );
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="overflow-x-auto">
      <Chart
        height={350}
        type="candlestick"
        options={{
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: "#3C90EB",
                downward: "#DF7D46",
              },
            },
          },
        }}
        series={[{ data: history }]}
      />
    </div>
  );
}
