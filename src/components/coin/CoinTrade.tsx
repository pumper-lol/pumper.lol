import { CoinIcon } from "@/components/CoinIcon";

type CoinTradeParams = { coin: Coin };

export function CoinTrade({ coin }: CoinTradeParams) {
  return (
    <div className="bg-[#201F1F] p-4 flex flex-col gap-2 md:gap-3">
      <div className="flex rounded-md bg-gray-600 text-gray-900 font-medium">
        <button className="w-full py-1 bg-green-500 rounded-md">BUY</button>
        <button className="w-full py-1">SELL</button>
      </div>

      <div className="flex gap-2 rounded-md bg-gray-400 px-3">
        <input
          type="number"
          className="bg-transparent py-2 w-full outline-0 text-gray-900 font-medium"
          placeholder="Amount"
        />
        <span className="inline-flex items-center justify-center gap-1 w-fit text-gray-800 uppercase py-2">
          {coin.symbol}
          <CoinIcon coin={coin} size={20} />
        </span>
      </div>

      <p className="text-gray-400 text-sm">0.00001 EDU</p>

      <button className="w-full py-2 bg-green-500 text-gray-900 font-medium rounded-md">
        place order
      </button>
    </div>
  );
}
