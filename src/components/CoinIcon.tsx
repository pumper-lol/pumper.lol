import Image from "next/image";
import { env } from "process";

export function CoinIcon(props: {
  coin: { symbol: string; imageIpfsHash: string };
  size?: number;
}) {
  const size = props.size || 16;
  return (
    <div
      className={`relative shrink-0`}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <Image
        src={`${env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${props.coin.imageIpfsHash}`}
        alt={props.coin.symbol}
        className={`rounded-sm object-cover object-center`}
        fill
      />
    </div>
  );
}
