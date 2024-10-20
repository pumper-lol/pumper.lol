import { formatAddress } from "@/helpers/ethers";

import { tokenInCirculationHolders } from "@/actions/token-holders";

export async function CoinHolder({ address }: { address: string }) {
  const holders = await tokenInCirculationHolders(address);

  return (
    <div className="rounded-md bg-green-900 bg-opacity-60 divide-y divide-gray-600 px-4">
      <div className="flex justify-between py-4 text-gray-300">
        <span className="">Holder</span>
        <span className="">Percentage</span>
      </div>
      {holders.map((item, index) => (
        <div key={index} className="flex justify-between py-2 text-gray-300">
          <a
            href={`https://opencampus-codex.blockscout.com/address/${item.address}`}
          >
            {formatAddress(item.address)}
          </a>
          <div className="">
            <span className="block">{item.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
