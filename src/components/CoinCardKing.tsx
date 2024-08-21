import { formatNumber, humanShortHandNumber } from "@/helpers/number";
import { CoinIcon } from "@/components/CoinIcon";
import { formatAddress } from "@/helpers/ethers";
import Link from "next/link";

export default function CoinCardKing({ coin }: { coin: Coin }) {
  return (
    <div className="bg-[#001708] p-4 rounded">
      <div className="flex items-stretch gap-4">
        <Link href={`/c/${coin.address}`}>
          <CoinIcon coin={coin} size={112} />
        </Link>

        <div className="flex flex-col justify-between">
          <div className="">
            <h3 className="text-lg mt-2">
              <Link href={`/c/${coin.address}`}>
                {coin.name}{" "}
                <span className="text-gray-400 uppercase">
                  ($ {coin.symbol})
                </span>
              </Link>
            </h3>
            {coin?.creator && (
              <p className="text-gray-400 text-sm flex items-center gap-1">
                created by
                <span className="text-white inline-flex items-center gap-0.5">
                  {formatAddress(coin?.creator?.address)}
                </span>
              </p>
            )}
          </div>
          <p className="text-sm flex gap-1.5 mt-auto">
            <span className="text-yellow-500">
              Market cap: {humanShortHandNumber(coin.marketCap ?? 0)}
            </span>
            <span className="text-green-500">
              Replies: {formatNumber(coin.replies_count ?? 0)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
