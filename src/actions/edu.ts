"use server";
import axios from "axios";

export async function eduUsdPrice() {
  const key = "EduUsdPrice";
  const _cache = await prisma?.cache.findFirst({
    where: {
      key,
      updatedAt: {
        gte: new Date(Date.now() - 5 * 60 * 1000),
      },
    },
  });

  let price = _cache?.value;

  if (!price) {
    try {
      const response = await axios.get<CoinMarketCapResponse>(
        "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=open-campus&convert=USD&CMC_PRO_API_KEY=" +
          process.env.CMC_PRO_API_KEY,
      );
      price = response.data.data["24613"].quote.USD.price;
      prisma?.cache.create({
        data: { key, value: price },
      });
    } catch (error) {
      price = (await prisma?.cache.findFirst({ where: { key } })).value;
    }
  }

  return price;
}
