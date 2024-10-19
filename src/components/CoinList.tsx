"use client";
import Dropdown from "@/components/Dropdown";
import CoinCard from "@/components/CoinCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CoinList({
  coins,
  getCoins,
  baseUrl,
}: {
  coins: Coin[];
  baseUrl: string;
  getCoins(props: { page?: number; search?: string }): Promise<Coin[]>;
}) {
  const params = useSearchParams();
  const [_coins, setCoins] = useState(coins);
  useEffect(() => {
    const search = params.get("search");
    const page = params.get("page");
    if (!search) return;

    getCoins({ search: search, page: page ? +page : undefined }).then(
      (coins) => {
        setCoins(coins);
      },
    );
  }, [params, getCoins]);

  return (
    <div className="">
      <div className="flex items-center mb-12">
        <Dropdown
          label={"Sort"}
          options={[
            "Market Cap",
            "Last Created",
            "Trade Volume",
            "24 Hour Price Change",
          ]}
          selected={"Bump order"}
        />
        <Dropdown
          label={"Order"}
          options={["Desc", "Asc"]}
          selected={"Desc"}
          onSelect={() => {}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {_coins.map((coin, index) => (
          <CoinCard key={index} coin={coin} baseUrl={baseUrl} />
        ))}

        <div className="flex items-center justify-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
