import React, { useEffect, useRef, useState } from "react";
import { useTokenEvents } from "@/contexts/TokenEvents";
import { formatAddress } from "@/helpers/ethers";
import { formatNumber } from "@/helpers/number";
import { formatEther } from "viem";
import { gql, useSubscription } from "@apollo/client";

const TOKEN_CREATE_SUBSCRIPTION = gql`
  subscription TokenCreate {
    tokenCreates {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      tokenAddress
      tokenIndex
      creator
    }
  }
`;

const TokenEventMarquee: React.FC = () => {
  const { data, loading, error } = useSubscription(TOKEN_CREATE_SUBSCRIPTION);
  useEffect(() => {
    console.log(data, loading, error);
  }, [data, error, loading]);

  const { tokenEvents } = useTokenEvents();
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animation = marquee.animate(
      [{ transform: "translateX(100%)" }, { transform: "translateX(-100%)" }],
      {
        duration: 30000,
        iterations: Infinity,
      },
    );

    return () => {
      animation.cancel();
    };
  }, [tokenEvents]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      log
      <div
        ref={marqueeRef}
        className={`flex space-x-6 ${isPaused ? "animate-pause" : ""}`}
      >
        {tokenEvents.map((event) => (
          <div
            key={event.id}
            className="flex-shrink-0 p-4 rounded-lg shadow-md"
          >
            <p className="text-gray-700">
              {formatAddress(event.account)}
              <span
                className={`font-bold ${
                  event.action === "sold"
                    ? "text-red-500"
                    : event.action === "purchased"
                      ? "text-green-500"
                      : "text-blue-500"
                }`}
              >
                {event.action.charAt(0).toUpperCase() + event.action.slice(1)}
              </span>

              {event.action !== "created" && (
                <span className="">
                  {formatNumber(+formatEther(BigInt(event.amount)))}
                </span>
              )}
              {formatAddress(event.token)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenEventMarquee;
