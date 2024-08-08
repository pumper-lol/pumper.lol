import Image from "next/image";
import { formatNumber, humanShortHandNumber } from "@/helpers/number";

export default function CoinCardKing({ coin }: { coin: Coin }) {
  return (
    <div className="bg-[#201F1F] p-4 rounded">
      <div className="flex items-stretch gap-4">
        <Image
          src={coin.imageUrl}
          alt={coin.name}
          className="rounded h-28 w-28 object-cover"
          width={112}
          height={112}
        />

        <div className="flex flex-col justify-between">
          <div className="">
            <h3 className="text-lg mt-2">
              {coin.name} <span className="text-gray-400">({coin.ticker})</span>
            </h3>
            {coin?.creator && (
              <p className="text-gray-400 text-sm flex items-center gap-1">
                created by
                <span className="text-white inline-flex items-center gap-0.5">
                  <Image
                    src={coin.creator.avatarUrl}
                    alt={coin.creator.name}
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                  {coin.creator.name}
                </span>
              </p>
            )}
          </div>
          <p className="text-sm flex gap-1.5 mt-auto">
            <span className="text-yellow-500">
              Market cap: {humanShortHandNumber(coin.marketCap)}
            </span>
            <span className="text-green-500">
              Replies: {formatNumber(coin.replies_count)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
