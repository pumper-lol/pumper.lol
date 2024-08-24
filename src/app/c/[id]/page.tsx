import { getCoin, getCoinMetadata } from "@/actions/coin";
import { ContractActions } from "@/components/ContractActions";
import { CoinTrade } from "@/components/coin/CoinTrade";
import { CoinIcon } from "@/components/CoinIcon";
import { CoinReplies } from "@/components/coin/CoinReplies";
import { IoLogoChrome, IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa6";
import { env } from "process";
import { CoinChart } from "@/components/CoinChart";

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
  const coin = (await getCoin(id)) as Coin;
  if (!coin) return <div>Not found</div>;

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
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5">
        <div className="md:col-span-1 flex flex-col gap-4">
          <CoinTrade coin={coin} baseUrl={env.NEXT_PUBLIC_PINATA_GATEWAY_URL} />

          <div className="px-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="text-gray-200">Top meme</div>
                <div className="text-yellow-500">0%</div>
              </div>
              <div className="bg-gray-500 rounded-md h-1 w-full overflow-hidden">
                <div className="bg-yellow-500 h-full w-[1%]"></div>
              </div>
              <div className="text-xs text-green-500">
                dethrone the current king at a $28,716 mcap
              </div>
            </div>

            <div className="">
              <div className="flex justify-between mb-1">
                <div className="text-gray-200">Bonding curve progress</div>
                <div className="text-yellow-500">0%</div>
              </div>
              <div className="bg-gray-500 rounded-md h-1 w-full overflow-hidden">
                <div className="bg-yellow-500 h-full w-[1%]"></div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p className="mb-2">
                when the{" "}
                <span className="text-green-500">
                  market cap reaches $39,173
                </span>{" "}
                all the liquidity from the bonding curve will be deposited into
                <span className="text-gray-500">SailFish veDex</span> and
                burned. progression increases as the price goes up.
              </p>
              <p className="">
                there are 791,421,697 tokens still available for sale in the
                bonding curve and there is{" "}
                <span className="text-green-500">10,000 EDU</span> in the
                bonding curve.
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="px-4 text-gray-200">Holding distribution</div>
            <div className="rounded-md bg-green-900 bg-opacity-60 divide-y divide-gray-600 px-4">
              <div className="flex justify-between py-3 text-gray-300">
                <span className="">Holder</span>
                <span className="">Percentage</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-yellow-500">1asf...adsd</span>
                <span className="text-gray-300">98%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-4 py-4">
          <CoinChart coin={coin} />
          <CoinReplies />
        </div>
      </div>
    </div>
  );
}
