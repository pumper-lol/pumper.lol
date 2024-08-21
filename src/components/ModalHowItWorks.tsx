interface ModalHowItWorksProps {
  close: () => void;
}

export default function ModalHowItWorks({ close }: ModalHowItWorksProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold font-dokdo mb-4 text-center">
          How it works
        </h2>
        <p className="mb-4">
          <span className="font-bold">Pumper.lol</span> is an innovative
          platform designed to empower users by allowing them to create and
          trade meme coins on the EduChain network. This project ensures fair
          and secure token launches, providing a seamless and entertaining
          trading experience.
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <span className="font-bold">Pick a Coin:</span> Browse the platform
            and choose a meme coin that piques your interest.
          </li>
          <li>
            <span className="font-bold">Buy the Coin:</span> Purchase the
            selected coin using a bonding curve mechanism.
          </li>
          <li>
            <span className="font-bold">Sell Anytime:</span> You have the
            freedom to sell your coins at any moment, securing your profits or
            minimizing your losses.
          </li>
          <li>
            <span className="font-bold">Market Cap Milestone:</span> When the
            coin reaches a market cap of $32k, a significant liquidity event
            occurs.
          </li>
          <li>
            <span className="font-bold">Liquidity Injection:</span> $8k of
            liquidity is deposited into any decentralized exchange (DEX) on the
            EduChain network.
          </li>
        </ol>

        <div className="text-center mt-6">
          <button
            onClick={close}
            className="md:block bg-yellow-500 border-2 border-yellow-500 border-opacity-10 text-gray-900 text-sm font-medium px-4 py-2 mx-auto rounded-full"
          >
            I&apos;m good to go
          </button>
        </div>
      </div>
    </div>
  );
}
