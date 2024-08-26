import HeroSearchBar from "@/components/HeroSearchBar";
import CoinCardKing from "@/components/CoinCardKing";
import Image from "next/image";
import Sticker from "@/images/sticker.png";
import { getCoins } from "@/actions/coin";
import { CoinList } from "@/components/CoinList";
import { env } from "process";

async function Home() {
  const coins: Coin[] = await getCoins({});

  return (
    <div>
      <section className="flex flex-col-reverse md:flex-row items-stretch container mx-auto px-4 py-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold font-dokdo">
            Join the Meme Revolution
          </h1>
          <div className="mt-8">
            <HeroSearchBar />
          </div>
          <div className="mt-8">
            <div className="bg-white bg-opacity-5 border border-white border-opacity-30 rounded-md py-6 px-5">
              <div className="text-2xl mb-6 text-center font-bold font-dokdo">
                King of the Hill
              </div>
              <CoinCardKing coin={coins[0]} />
            </div>
          </div>
        </div>
        <div className="relative md:w-96 w-40 min-h-40 md:mx-auto ">
          <Image
            src={Sticker}
            alt={"pumper.lol sticker"}
            fill
            className="object-contain object-center"
          />
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <CoinList
          coins={coins}
          baseUrl={env.NEXT_PUBLIC_PINATA_GATEWAY_URL as string}
          getCoins={getCoins}
        />
      </section>
    </div>
  );
}

export default Home;
