import { formatEther } from "viem";

export function humanShortHandNumber(num: number) {
  if (!num) return "0";

  const format = (value: number, suffix: string) => {
    return value % 1 === 0
      ? value.toFixed(0) + suffix
      : value.toFixed(1) + suffix;
  };

  if (num >= 1e6) {
    return format(num / 1e6, "M");
  }
  if (num >= 1e3) {
    return format(num / 1e3, "K");
  }
  return `${num}`;
}

export function formatNumber(num: number) {
  if (!num) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function coinRate(amount: number, price: number) {
  return formatEther(BigInt(amount / price));
}
