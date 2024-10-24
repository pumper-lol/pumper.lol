"use server";
import axios from "axios";

export async function eduUsdPrice() {
  const response = await axios.get<CoinMarketCapResponse>(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=open-campus&convert=USD&CMC_PRO_API_KEY=" +
      process.env.CMC_PRO_API_KEY,
  );
  return response.data.data["24613"].quote.USD.price;
}
