"use client"

import { useEffect } from "react"
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import { parseUnits } from "viem"
import SOLOPATTY_ABI from "@/abi/solopatty.json" // adjust path if needed

const useDeposit = ({
  tokenAddress,
  amount,
  decimals = 18,
  onDepositSuccess,
}: {
  tokenAddress?: `0x${string}`
  amount?: string
  decimals?: number
  onDepositSuccess?: () => void
}): {
  address: `0x${string}` | undefined
  depositTokens: (() => void) | undefined
  depositLoading: boolean
  prepareDepositError: boolean
  depositError: boolean
} => {
  const { address } = useAccount()

  const {
    data: depositTxHash,
    writeContract: deposit,
    isPending: isDepositing,
    isError: depositError,
  } = useWriteContract()

  const { isSuccess: txSuccess, isLoading: txLoading } =
    useWaitForTransactionReceipt({
      hash: depositTxHash,
      query: {
        enabled: Boolean(depositTxHash),
      },
    })

  useEffect(() => {
    if (txSuccess) {
      onDepositSuccess?.()
    }
  }, [txSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    address,
    depositTokens: () =>
      deposit?.({
        address: "0xCB30D0881119bA8837A9e26E298d3b73c4c521EC" as `0x${string}`,
        abi: SOLOPATTY_ABI,
        functionName: "depositTokens",
        args: [
          tokenAddress as `0x${string}`,
          parseUnits(amount || "0", decimals),
        ],
      }),
    depositLoading: isDepositing || txLoading,
    prepareDepositError: !tokenAddress || !amount,
    depositError,
  }
}

export { useDeposit }
