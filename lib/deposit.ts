// deposit.ts
import { writeContract } from "wagmi/actions"
import { parseUnits } from "viem"
import ERC20_ABI from "@/abi/erc20.json"
import SOLOPATTY_ABI from "@/abi/solopatty.json"
import { config } from "@/wagmi" // ✅ FIX: use actual config value

type DepositParams = {
  userAddress: `0x${string}`
  tokenAddress: `0x${string}`
  amount: string
  decimals?: number
  contractAddress: `0x${string}`
}

export async function deposit({
  userAddress,
  tokenAddress,
  amount,
  decimals = 18,
  contractAddress,
}: DepositParams): Promise<`0x${string}`> {
  const parsedAmount = parseUnits(amount, decimals)

  // 1. Approve token allowance
  await writeContract(config, {
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [contractAddress, parsedAmount],
    account: userAddress,
  })

  // 2. Call depositTokens on SoloPatty contract
  const txHash = await writeContract(config, {
    address: contractAddress,
    abi: SOLOPATTY_ABI,
    functionName: "depositTokens",
    args: [tokenAddress, parsedAmount],
    account: userAddress,
  })

  return txHash
}
