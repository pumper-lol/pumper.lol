import { useAccount, useConfig, useSwitchChain, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import LaunchpadContract from "@/artifacts/LaunchpadContract.json";
import {
  Address,
  encodePacked,
  getAddress,
  Hash,
  keccak256,
  parseEther,
} from "viem";
import { testnet } from "@/helpers/wagmi";

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
