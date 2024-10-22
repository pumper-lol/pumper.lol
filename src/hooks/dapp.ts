import {
  useAccount,
  useConfig,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import LaunchpadContract from "@/artifacts/LaunchpadContract.json";
import { Address, formatEther, Hash, parseEther } from "viem";
import { testnet } from "@/helpers/wagmi";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { TOKEN_DATA_AT_TIME_QUERY } from "@/helpers/graphql";

import { tokenInCirculationHolders } from "@/actions/token-holders";

export function useLaunchpadDeployer() {
  const account = useAccount();
  const config = useConfig();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  function pumperFactoryRead(functionName: string, ...args: any[]) {
    return readContract(config, {
      abi: LaunchpadContract.abi,
      address: LaunchpadContract.testnetAddress as Address,
      functionName: functionName,
      args: args,
    }) as Promise<any>;
  }

  async function deployCoin(
    name: string,
    symbol: string,
  ): Promise<Address | undefined> {
    if (account.chainId !== testnet.id) {
      switchChain({ chainId: testnet.id });
    }

    try {
      if (!account.address) return;

      const contractAddress = await pumperFactoryRead("guessNewTokenAddress");
      const launchFee = await pumperFactoryRead("launchFee");

      const hash = await writeContractAsync({
        abi: LaunchpadContract.abi,
        address: LaunchpadContract.testnetAddress as Address,
        functionName: "createAndInitPurchase",
        args: [name, symbol],
        value: launchFee,
      });
      await waitForTransactionReceipt(config, { hash: hash });

      return contractAddress;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to deploy coin");
    }
  }

  return {
    deployCoin,
  };
}

export function useLaunchpadToken(tokenAddress: Address) {
  const account = useAccount();
  const config = useConfig();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  function pumperLaunchpadRead(functionName: string, ...args: any[]) {
    return readContract(config, {
      abi: LaunchpadContract.abi,
      address: LaunchpadContract.testnetAddress as Address,
      functionName: functionName,
      args: args,
    }) as Promise<any>;
  }

  function pumperFactoryWrite(
    functionName: string,
    ...args: any[]
  ): Promise<Hash> {
    return writeContractAsync({
      abi: LaunchpadContract.abi,
      address: LaunchpadContract.testnetAddress as Address,
      functionName: functionName,
      args: args,
    });
  }

  async function fromTokenAmountGetEduPrice(tokenAmount: string) {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0) return BigInt(0);
    return (await pumperLaunchpadRead(
      "getTrxAmountBySale",
      tokenAddress,
      parseEther(tokenAmount),
    )) as bigint;
  }

  async function fromEduAmountGetTokenPrice(eduAmount: string) {
    if (!eduAmount || parseFloat(eduAmount) <= 0) return BigInt(0);
    return (await pumperLaunchpadRead(
      "getTokenAmountByPurchase",
      tokenAddress,
      parseEther(eduAmount),
    )) as bigint;
  }

  async function buyToken(eduAmount: string) {
    if (!eduAmount || parseFloat(eduAmount) <= 0)
      throw new Error("Invalid amount");
    if (account.chainId !== testnet.id) {
      switchChain({ chainId: testnet.id });
    }

    try {
      if (!account.address) return;
      const hash = (await writeContractAsync({
        abi: LaunchpadContract.abi,
        address: LaunchpadContract.testnetAddress as Address,
        functionName: "purchaseToken",
        args: [tokenAddress, parseEther(eduAmount)],
        value: parseEther(eduAmount),
      })) as Hash;
      await waitForTransactionReceipt(config, { hash: hash });
    } catch (e) {
      console.log(e);
      throw new Error("Failed to buy token");
    }
  }

  async function sellToken(tokenAmount: string) {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0)
      throw new Error("Invalid amount");
    if (account.chainId !== testnet.id) {
      switchChain({ chainId: testnet.id });
    }

    try {
      if (!account.address) return;
      const hash = (await pumperFactoryWrite(
        "saleToken",
        tokenAddress,
        parseEther(tokenAmount),
        parseEther(tokenAmount),
      )) as Hash;
      await waitForTransactionReceipt(config, { hash: hash });
    } catch (e) {
      console.log(e);
      throw new Error("Failed to sell token");
    }
  }

  return {
    fromEduAmountGetTokenPrice,
    fromTokenAmountGetEduPrice,
    buyToken,
    sellToken,
  };
}

export function useTokenMetrics(tokenAddress: Address) {
  const [timestamp24hoursAgo] = useState(Date.now() - 24 * 60 * 60 * 1000);
  const [marketCap, setMarketCap] = useState(0);

  const { data: trades24HoursAgo } = useQuery(TOKEN_DATA_AT_TIME_QUERY, {
    variables: {
      token: tokenAddress?.toLowerCase(),
      timestamp: timestamp24hoursAgo?.toString(),
    },
  });

  const { data: _price } = useReadContract({
    abi: LaunchpadContract.abi,
    address: LaunchpadContract.testnetAddress as Address,
    functionName: "getPrice",
    args: [tokenAddress],
  });

  const price = useMemo(() => {
    return Number(formatEther((_price as bigint) || BigInt(0)));
  }, [_price]);

  useEffect(() => {
    tokenInCirculationHolders(tokenAddress)
      .then((holders) => {
        const _totalSupply = holders.reduce(
          (
            acc: number,
            item: { address: string; value: string; percentage: string },
          ) => {
            return acc + Number(item.value);
          },
          0,
        );

        const marketCapValue = formatEther(
          BigInt(_totalSupply) * BigInt(price),
        );
        setMarketCap(Number(marketCapValue));
      })
      .catch((e) => {
        setMarketCap(0);
        console.log("market cap", e);
      });
  }, [marketCap, price, tokenAddress]);

  const percentageChangeIn24Hour = useMemo(() => {
    const trade = (
      Object.values(trades24HoursAgo ?? {}).flat() as Trade[]
    ).sort((a, b) => parseInt(b.timestamp_) - parseInt(a.timestamp_))[0];

    return (
      Math.abs(
        (Number(trade?.trxAmount) / Number(trade?.tokenAmount) - price) / price,
      ) * 100
    );
  }, [trades24HoursAgo, price]);
  return {
    price,
    marketCap,
    percentageChangeIn24Hour,
  };
}
