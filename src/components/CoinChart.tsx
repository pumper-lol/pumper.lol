"use client";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import Chart from "react-apexcharts";
import { GET_TRADES } from "@/helpers/graphqlQueries";

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

    const reduce = Object?.values(data)
      ?.flat()
      .sort((a, b) => a.timestamp_ - b.timestamp_)
      .map((transaction) => ({
        timestamp: parseInt(transaction.timestamp_) * 1000, // Convert to milliseconds
        price:
          weiToEther(transaction.trxAmount) /
          weiToEther(transaction.tokenAmount),
      }))
      .reduce((acc, { timestamp, price }) => {
        if (acc.length === 0 || timestamp !== acc[acc.length - 1][0]) {
          // New candle
          acc.push([timestamp, [price, price, price, price]]); // [timestamp, [Open, High, Low, Close]]
        } else {
          // Update existing candle
          const candle = acc[acc.length - 1][1];
          candle[1] = Math.max(candle[1], price); // High
          candle[2] = Math.min(candle[2], price); // Low
          candle[3] = price; // Close
        }
        return acc;
      }, []);
    return reduce;
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
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
