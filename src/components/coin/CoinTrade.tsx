"use client";
import { CoinIcon } from "@/components/CoinIcon";
import { FormEvent, useEffect, useState } from "react";
import { usePumperToken } from "@/hooks/dapp";
import { Address, formatEther } from "viem";
import Image from "next/image";

type CoinTradeParams = { coin: Coin; baseUrl: string };

export function CoinTrade({ coin, baseUrl }: CoinTradeParams) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: "BUY",
    amount: "0",
  });
  const { buyCoin, sellCoin, fromTokenCalculatePrice, fromEduCalculatePrice } =
    usePumperToken(coin.address as Address);
  const [amount, setAmount] = useState<bigint>();

  useEffect(() => {
    if (form.type === "BUY")
      fromTokenCalculatePrice(form.amount).then(setAmount);
    else fromEduCalculatePrice(form.amount).then(setAmount);
  }, [form, fromTokenCalculatePrice, fromEduCalculatePrice]);

  async function submit(e: any) {
    e.preventDefault();
    if (loading || !form.amount) return;

    setLoading(true);
    try {
      if (form.type === "BUY") {
        await buyCoin(form.amount);
      } else {
        await sellCoin(form.amount);
      }
      form.amount = "0";
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="bg-[#201F1F] p-4 flex flex-col gap-2 md:gap-3">
        <div className="flex rounded-md bg-gray-600 text-gray-900 font-medium">
          <button
            type="button"
            className={`w-full py-1 rounded-md ${form.type === "BUY" ? "bg-green-500" : "text-gray-100"}`}
            onClick={() => setForm((prev) => ({ ...prev, type: "BUY" }))}
          >
            BUY
          </button>
          <button
            type="button"
            className={`w-full py-1 rounded-md ${form.type === "SELL" ? "bg-green-500" : "text-gray-100"}`}
            onClick={() => setForm((prev) => ({ ...prev, type: "SELL" }))}
          >
            SELL
          </button>
        </div>

        <div className="flex gap-2 rounded-md bg-gray-400 px-3">
          <input
            type="number"
            className="bg-transparent py-2 w-full outline-0 text-gray-900 font-medium"
            placeholder="Amount"
            value={form.amount}
            onInput={(e: FormEvent<HTMLInputElement>) =>
              setForm((prev) => ({
                ...prev,
                amount: (e.target as HTMLInputElement)?.value,
              }))
            }
          />
          {form.type === "SELL" && (
            <span className="inline-flex items-center justify-center gap-1 w-fit text-gray-800 uppercase py-2">
              {coin.symbol}
              <CoinIcon coin={coin} size={20} baseUrl={baseUrl} />
            </span>
          )}
          {form.type === "BUY" && (
            <span className="inline-flex items-center justify-center gap-1 w-fit text-gray-800 uppercase py-2">
              EDU
              <span className="relative shrink-0">
                <Image src={"/edu.svg"} alt="Edu icon" width={20} height={20} />
              </span>
            </span>
          )}
        </div>

        {amount && (
          <p className="text-gray-400 text-sm">
            {formatEther(amount)}

            {form.type === "BUY" && (
              <span className="inline-flex items-center justify-center gap-1 w-fit text-gray-300 uppercase py-2">
                {coin.symbol}
                <CoinIcon coin={coin} size={20} baseUrl={baseUrl} />
              </span>
            )}
            {form.type === "SELL" && (
              <span className="inline-flex items-center justify-center gap-1 w-fit text-gray-800 uppercase py-2">
                EDU
                <span className="relative shrink-0">
                  <Image
                    src={"/edu.svg"}
                    alt="Edu icon"
                    width={20}
                    height={20}
                  />
                </span>
              </span>
            )}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full py-2 bg-green-500 hover:bg-opacity-60 disabled:bg-opacity-50 text-gray-900 font-medium rounded-md"
        >
          {loading ? "Loading..." : "Place order"}
        </button>
      </div>
    </form>
  );
}
