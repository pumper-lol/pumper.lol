"use client";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { formatEther } from "viem";
import Chart from "react-apexcharts";
import { GET_TRADES } from "@/helpers/graphqlQueries";

export function CoinChart({ coin }: { coin: Coin }) {
  const { loading, error, data } = useQuery<{ sells: Trade[]; buys: Trade[] }>(
    GET_TRADES,
    {
      variables: { token: coin.address?.toLowerCase() },
    },
  );

  const history = useMemo(() => {
    const _data = new Map<number, { x: Date; y: string[] }>();

    if (!data) return [];

    Object?.values(data)
      ?.flat()
      .forEach((trade: Trade) => {
        const amount = parseInt(
          formatEther(BigInt(trade.amount) / BigInt(trade.price)),
        )?.toFixed(3) as string;

        const roundedTimestamp =
          Math.floor(parseInt(trade.timestamp_) / 3600) * 3600; // 300 seconds = 5 minutes

        const files = _data.get(roundedTimestamp);
        if (!files) {
          _data.set(roundedTimestamp, {
            x: new Date(roundedTimestamp * 1000),
            y: [amount],
          });
          return;
        }
        files?.y.push(amount);
        _data.set(roundedTimestamp, files);
      });

    return Array.from(_data.values());
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
        }}
        series={[{ data: history }]}
      />
    </div>
  );
}
