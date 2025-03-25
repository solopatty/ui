import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits } from "viem";
import SOLOPATTY_ABI from "@/abi/solopatty.json";

export const useDeposit = ({
  tokenAddress,
  amount,
  decimals = 18,
  onDepositSuccess,
}: {
  tokenAddress?: `0x${string}`;
  amount?: string;
  decimals?: number;
  onDepositSuccess?: () => void;
}) => {
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();

  const depositTokens = async (): Promise<`0x${string}`> => {
    if (!tokenAddress || !amount || !address) throw new Error("Missing params");

    const txHash = await writeContractAsync({
      address: "0x5De6e7cAE4b30d4CbF744B6Dd78c6418F5750570" as `0x${string}`,
      abi: SOLOPATTY_ABI,
      functionName: "depositTokens",
      args: [tokenAddress, parseUnits(amount, decimals)],
      account: address,
    });

    return txHash;
  };

  return {
    depositTokens,
  };
};
