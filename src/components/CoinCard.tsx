import { humanShortHandNumber } from "@/helpers/number";
import { formatAddress } from "@/helpers/ethers";
import { CoinIcon } from "@/components/CoinIcon";
import Link from "next/link";

export default function CoinCard({
  coin,
  baseUrl,
}: {
  coin: Coin;
  baseUrl: string;
}) {
  // const isLive = Math.random() >= 0.5;
  const isLive = false;
  return (
    <div className="bg-[#001708] p-4 rounded">
      <div className="flex items-stretch gap-4">
        <Link href={`/c/${coin.address}`}>
          <div className="h-28 w-28 shrink-0 relative">
            <CoinIcon coin={coin} size={112} baseUrl={baseUrl} />
            {isLive && (
              <span className="text-xs text-lime-400 bg-[#403F3D] rounded-full px-1.5 py-0.5 inline-flex gap-2 items-center absolute left-0.5 -top-1">
                <span className="bg-lime-400 h-1.5 w-1.5 shadow-[#93EF5AE3] shadow-glow-sm rounded-full"></span>
                Streaming Live
              </span>
            )}
          </div>
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
                created by:
                <span className="text-white inline-flex items-center gap-0.5">
                  {formatAddress(coin?.creator?.address as string)}
                </span>
              </p>
            )}
          </div>
          <p className="flex flex-col text-sm gap-1.5 mt-auto">
            <span className="text-yellow-500">
              Market cap: {humanShortHandNumber(coin.marketCap)}
            </span>
            <span className="text-green-500">
              Replies: {humanShortHandNumber(coin.replies_count)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2 mb-1">
        <div className="flex justify-between mb-1 text-sm">
          <div className="text-gray-300">Bonding curve progress</div>
          <div className="text-yellow-500">0%</div>
        </div>
        <div className="bg-gray-500 rounded-md h-1 w-full overflow-hidden">
          <div className="bg-yellow-500 h-full w-[1%]"></div>
        </div>
      </div>
      <p className="text-gray-300 text-sm">{coin.description}</p>
    </div>
  );
}
