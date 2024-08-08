interface ModalHowItWorksProps {
  isOpen: boolean;
  close: () => void;
}

export default function ModalHowItWorks({
  isOpen,
  close,
}: ModalHowItWorksProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold font-dokdo mb-4 text-center">
          How it works
        </h2>
        <p className="mb-4">
          Pumper stops rugs by ensuring the security of each and every token
          that is created. Every coin on pumper is released fairly, without a
          team allocation or presale.
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Choose a coin you like</li>
          <li>Purchase it on the bonding curve</li>
          <li>To lock up your gains or losses, sell whenever you choose</li>
          <li>
            The market valuation of the company hits $69k when enough investors
            purchase it on the bonding curve
          </li>
          <li>
            After that, $12k of liquidity is burned and deposited in raydium
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
