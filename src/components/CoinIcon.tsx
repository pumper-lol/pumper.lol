import Image from "next/image";
import { env } from "process";

export function CoinIcon(props: {
  coin: { symbol: string; imageUrl: string };
  size?: number;
  baseUrl?: string;
}) {
  const size = props.size || 16;
  return (
    <div
      className={`relative shrink-0`}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <Image
        src={`${props.coin.imageUrl}`}
        alt={props.coin.symbol}
        className={`rounded-sm object-cover object-center`}
        fill
      />
    </div>
  );
}
