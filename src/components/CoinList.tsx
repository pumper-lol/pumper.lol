"use client";
import Dropdown from "@/components/Dropdown";
import CoinCard from "@/components/CoinCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CoinList({
  coins,
  getCoins,
  length,
  baseUrl,
}: {
  coins: Coin[];
  baseUrl: string;
  length: number;
  getCoins(props: {
    page?: number;
    search?: string;
  }): Promise<{ data: Coin[]; length: number }>;
}) {
  const params = useSearchParams();
  const [_coins, setCoins] = useState(coins);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(length);

  useEffect(() => {
    const search = params.get("search");
    const page = params.get("page");

    if (!search) {
      setCoins(coins);
      setCurrentPage(1);
      setTotalItems(length);
      setHasMore(coins.length < length);
      return;
    }

    setIsLoading(true);
    getCoins({ search: search, page: page ? +page : undefined }).then(
      (response) => {
        setCoins(response.data);
        setTotalItems(response.length);
        setHasMore(response.data.length < response.length);
        setIsLoading(false);
      },
    );
  }, [params, getCoins, coins, length]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const search = params.get("search");

    try {
      const response = await getCoins({
        page: nextPage,
        search: search || undefined,
      });

      setCoins((prev) => [...prev, ...response.data]);
      setCurrentPage(nextPage);
      setHasMore(_coins.length + response.data.length < totalItems);
    } catch (error) {
      console.error("Error loading more coins:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/*<div className="flex items-center mb-12">
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
      </div>*/}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {_coins.map((coin, index) => (
          <CoinCard key={`${coin.id}-${index}`} coin={coin} baseUrl={baseUrl} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
