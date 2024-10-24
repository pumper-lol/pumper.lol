export function bondingCurveAndTopMeme(coin: Coin, price: number) {
  const topMeme = (((coin.marketCap * price) / 28000) * 100).toFixed(3);
  const bondingCurve = (((coin.marketCap * price) / 49000) * 100).toFixed(3);
  return { topMeme, bondingCurve };
}
