import {
  useAccount,
  useConfig,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import PumperFactory from "@/artifacts/PumperFactory.json";
import { Address, Hash, parseEther } from "viem";
import PumperToken from "@/artifacts/PumperToken.json";
import { testnet } from "@/helpers/wagmi";

export function usePumperFactory() {
  const account = useAccount();
  const config = useConfig();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  function pumperFactoryRead(functionName: string, ...args: any[]) {
    return readContract(config, {
      abi: PumperFactory.abi,
      address: PumperFactory.testnetAddress as Address,
      functionName: functionName,
      args: args,
    });
  }

  function pumperFactoryWrite(
    functionName: string,
    ...args: any[]
  ): Promise<Hash> {
    return writeContractAsync({
      abi: PumperFactory.abi,
      address: PumperFactory.testnetAddress as Address,
      functionName: functionName,
      args: args,
    });
  }

  async function deployCoin(name: string, symbol: string) {
    if (account.chainId !== testnet.id) {
      switchChain({ chainId: testnet.id });
    }

    try {
      if (!account.address) return;
      const salt = await pumperFactoryRead(
        "getDeployedPumpTokensLen",
        account.address,
      );
      const byteCode = await pumperFactoryRead("getBytecode", name, symbol);
      const contractAddress = await pumperFactoryRead(
        "getAddressBeforeDeployment",
        byteCode,
        salt,
      );

      const hash = await pumperFactoryWrite("createPumpToken", name, symbol);
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

export function usePumperToken(coinAddress: Address) {
  const account = useAccount();
  const config = useConfig();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const { data: k } = useReadContract({
    abi: PumperToken.abi,
    address: coinAddress,
    functionName: "k",
  });
  const { data: y } = useReadContract({
    abi: PumperToken.abi,
    address: coinAddress,
    functionName: "y",
  });
  const { data: x } = useReadContract({
    abi: PumperToken.abi,
    address: coinAddress,
    functionName: "x",
  });
  const { data: circulatingSupply } = useReadContract({
    abi: PumperToken.abi,
    address: coinAddress,
    functionName: "circulatingSupply",
  });

  // const convertEdu = useCallback(
  //   (amount: string) => {
  //     if (!price) return 0;
  //     return price.mul(parseEther(amount));
  //   },
  //   [price],
  // );

  function pumperTokenWrite(
    functionName: string,
    address: Address,
    ...args: any[]
  ): Promise<Hash> {
    return writeContractAsync({
      abi: PumperToken.abi,
      address: address as Address,
      functionName: functionName,
      args: args,
    });
  }

  async function buyCoin(amount: string) {
    if (account.chainId !== testnet.id) {
      switchChain({ chainId: testnet.id });
    }

    try {
      if (!account.address) return;
      const hash = (await writeContractAsync({
        abi: PumperToken.abi,
        address: coinAddress as Address,
        functionName: "buyX",
        value: parseEther(amount),
      })) as Hash;
      const receipt = await waitForTransactionReceipt(config, { hash: hash });
      console.log(receipt);
    } catch (e) {
      console.log(e);
      throw new Error("Failed to buy coin");
    }
  }

  async function sellCoin(amount: string) {
    if (account.chainId !== testnet.id) {
      switchChain({ chainId: testnet.id });
    }

    try {
      if (!account.address) return;
      const hash = await pumperTokenWrite(
        "sellY",
        coinAddress,
        parseEther(amount),
      );
      await waitForTransactionReceipt(config, { hash });
      return;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to sell coin");
    }
  }

  async function fromEduCalculatePrice(eduAmount: string) {
    if (!eduAmount || parseInt(eduAmount) <= 0) return BigInt(0);
    return (await readContract(config, {
      abi: PumperToken.abi,
      address: coinAddress,
      functionName: "getTokenOutputX",
      args: [parseEther(eduAmount)],
    })) as BigInt;
  }

  async function fromTokenCalculatePrice(tokenAmount: string) {
    if (!tokenAmount || parseInt(tokenAmount) <= 0) return BigInt(0);
    return (await readContract(config, {
      abi: PumperToken.abi,
      address: coinAddress,
      functionName: "getTokenOutputX",
      args: [parseEther(tokenAmount)],
    })) as BigInt;
  }

  return {
    circulatingSupply,
    fromEduCalculatePrice,
    fromTokenCalculatePrice,
    buyCoin,
    sellCoin,
  };
}
