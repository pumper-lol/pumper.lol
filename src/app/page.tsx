import HeroSearchBar from "@/components/HeroSearchBar";
// import CoinCardKing from "@/components/CoinCardKing";
import Image from "next/image";
import Sticker from "@/images/sticker.png";
import { getCoins } from "@/actions/coin";
import { CoinList } from "@/components/CoinList";
import React from "react";
import { eduUsdPrice } from "@/actions/edu";

async function Home() {
  const coins: { data: Coin[]; length: number } = await getCoins({});
  const _price = await eduUsdPrice();

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
            <a
              href="https://t.me/pumper_lol"
              className="inline-block bg-[#EFCF5A] text-gray-900 px-6 py-2 rounded-full font-medium"
            >
              Join Our Community
            </a>
            {/*<div className="bg-white bg-opacity-5 border border-white border-opacity-30 rounded-md py-6 px-5">*/}
            {/*  <div className="text-2xl mb-6 text-center font-bold font-dokdo">*/}
            {/*    King of the Hill*/}
            {/*  </div>*/}
            {/*  <CoinCardKing coin={coins[0]} />*/}
            {/*</div>*/}
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
          coins={coins.data}
          length={coins.length}
          getCoins={getCoins}
          price={_price}
        />
      </section>
    </div>
  );
}

export default Home;
