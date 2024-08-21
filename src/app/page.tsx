import CoinCard from "@/components/CoinCard";
import Dropdown from "@/components/Dropdown";
import HeroSearchBar from "@/components/HeroSearchBar";
import CoinCardKing from "@/components/CoinCardKing";
import Image from "next/image";
import Sticker from "@/images/sticker.png";
import { getCoins } from "@/actions/coin";

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
        <div className="flex items-center gap-4 mb-4">
          <div className="text-lg font-bold">
            All coins
            <div className="border-b-2 border-l-2 border-purple-300 h-1"></div>
          </div>
          <div className="text-lg font-bold">For you</div>
        </div>

        <div className="">
          <div className="flex items-center mb-12">
            <span className="">
              <label htmlFor="">
                Include NSFW
                <input type="checkbox" className="ml-2" />
              </label>
            </span>
            <Dropdown
              label={"Sort"}
              options={["Bump order", "Last reply", "Reply count"]}
              selected={"Bump order"}
              // onSelect={() => {}}
            />
            <Dropdown
              label={"Order"}
              options={["Desc", "Asc"]}
              selected={"Desc"}
              // onSelect={() => {}}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {coins.map((coin, index) => (
              <CoinCard key={index} coin={coin} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
