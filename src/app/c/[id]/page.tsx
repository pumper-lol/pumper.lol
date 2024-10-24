import { getCoin, getCoinMetadata } from "@/actions/coin";
import { ContractActions } from "@/components/ContractActions";
import { CoinTrade } from "@/components/coin/CoinTrade";
import { CoinIcon } from "@/components/CoinIcon";
import { IoLogoChrome, IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa6";
import { env } from "process";
import { CoinChart } from "@/components/CoinChart";
import { CoinHolder } from "@/components/coin/CoinHolder";
import { CoinTrades } from "@/components/coin/CoinTrades";
import { formatNumber } from "@/helpers/number";
import { eduUsdPrice } from "@/actions/edu";
import { bondingCurveAndTopMeme } from "@/helpers/token";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const data = await getCoinMetadata(id);
  return {
    title: `${data.title} - PumpeR`,
    description: data.description,
  };
}

export default async function CoinViewPage({ params: { id } }: PageProps) {
  const _price = await eduUsdPrice();
  const coin = await getCoin(id);

  if (!coin) return <div>Not found</div>;
  const { topMeme, bondingCurve } = bondingCurveAndTopMeme(coin, _price);

  return (
    <div className="container mx-auto">
      <div className="bg-[#201F1F] p-4 md:rounded-t-md">
        <div className="flex items-end gap-2 md:gap-4 relative text-sm text-gray-200">
          <CoinIcon coin={coin} size={100} />
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <div className="">{coin.name}</div>
                <div className="flex items-center gap-1 shrink-0 text-gray-400">
                  <span className="uppercase">($ {coin.symbol})</span>
                </div>
                <div className="text-green-500">
                  Creator:{" "}
                  {coin.creator?.username ?? coin.creator?.address?.slice(-6)}
                </div>
              </div>

              <div className="flex gap-2 text-sm ml-auto">
                {coin.twitterUrl && (
                  <a
                    href={coin.twitterUrl}
                    target="_blank"
                    className="text-green-500 hover:text-green-800 py-2 rounded-md hover:underline underline-offset-2"
                  >
                    <IoLogoTwitter size={20} />
                  </a>
                )}
                {coin.discordUrl && (
                  <a
                    href={coin.discordUrl}
                    target="_blank"
                    className="text-green-500 hover:text-green-800 py-2 rounded-md hover:underline underline-offset-2"
                  >
                    <IoLogoDiscord size={20} />
                  </a>
                )}
                {coin.telegramUrl && (
                  <a
                    href={coin.telegramUrl}
                    target="_blank"
                    className="text-green-500 hover:text-green-800 py-2 rounded-md underline underline-offset-2"
                  >
                    <FaTelegram size={20} />
                  </a>
                )}
                {coin.websiteUrl && (
                  <a
                    href={coin.websiteUrl}
                    target="_blank"
                    className="text-green-500 hover:text-green-800 py-2 rounded-md underline underline-offset-2"
                  >
                    <IoLogoChrome size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <span className="text-gray-400">Contract:</span>{" "}
              <ContractActions text={coin.address} />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex md:hidden flex-col md:items-center md:gap-1 text-gray-500 text-sm">
            Contract: <ContractActions text={coin.address} />
          </div>
          <p className="text-gray-400 text-sm">{coin.description}</p>
        </div>

        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-green-950 my-2 text-gray-300 text-sm">
          <div className="flex justify-between md:flex-col px-2.5 py-1.5">
            <span className="text-gray-400">Price</span>
            <span className="text-gray-200">{formatNumber(coin.price)}</span>
          </div>
          <div className="flex justify-between md:flex-col px-2.5 py-1.5">
            <span className="text-gray-400">Liquidity</span>
            <span className="text-gray-200">
              $ {formatNumber(coin.liquidity * _price)}
            </span>
          </div>
          <div className="flex justify-between md:flex-col px-2.5 py-1.5">
            <span className="text-gray-400">Market cap</span>
            <span className="text-gray-200">
              $ {formatNumber(coin.marketCap * _price)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        <div className="md:col-span-1 flex flex-col gap-4">
          <CoinTrade
            coin={coin}
            baseUrl={env.NEXT_PUBLIC_PINATA_GATEWAY_URL as string}
          />

          <div className="px-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="text-gray-200">Top meme</div>
                <div className="text-yellow-500">${topMeme}%</div>
              </div>
              <div className="bg-gray-500 rounded-md h-1 w-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-full"
                  style={{ width: `${topMeme}%` }}
                ></div>
              </div>
              <div className="text-xs text-green-500">
                dethrone the current top at a $28,000 market cap
              </div>
            </div>

            <div className="">
              <div className="flex justify-between mb-1">
                <div className="text-gray-200">Bonding curve progress</div>
                <div className="text-yellow-500">{bondingCurve}%</div>
              </div>
              <div className="bg-gray-500 rounded-md h-1 w-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-full"
                  style={{ width: `${bondingCurve}%` }}
                ></div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p className="mb-2">
                when the{" "}
                <span className="text-green-500">
                  market cap reaches $49,000
                </span>{" "}
                all the liquidity from the bonding curve will be deposited into
                <span className="text-gray-500">SailFish veDex</span> and
                burned. progression increases as the price goes up.
              </p>
              <p className="">
                <span className="text-green-500">10,000 EDU</span> in the
                bonding curve.
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="px-4 text-gray-200">Holding distribution</div>
            <CoinHolder address={coin.address} />
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-4 py-4">
          <CoinChart coin={coin} />
          <CoinTrades coin={coin} />
          {/*<CoinReplies />*/}
        </div>
      </div>
    </div>
  );
}
