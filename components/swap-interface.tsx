"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ArrowDown, Check } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeposit } from "@/hooks/deposit";
import { matchingEngine } from "@/lib/matching-engine";

export default function SwapInterface() {
  const [totalTrades, setTotalTrades] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("Patty");
  const [toCurrency, setToCurrency] = useState("Cheese");
  const [fromAmount, setFromAmount] = useState("0.0");
  const [toAmount, setToAmount] = useState("0.0");
  const [maxDuration, setMaxDuration] = useState("Min");
  const [maxDurationValue, setMaxDurationValue] = useState("4");
  const [marketRate, setMarketRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isConnected } = useAccount();
  const [swapStage, setSwapStage] = useState<
    "idle" | "depositing" | "matching" | "match_found" | "claiming"
  >("idle");

  const currencies = ["Patty", "Cheese", "Lettuce"];
  const timeUnits = ["Min", "Hour", "Day"];

  const tokenAddressMap: Record<string, `0x${string}`> = {
    Patty: "0x126F0c11F3e5EafE37AB143D4AA688429ef7DCB3",
    Cheese: "0x5D7714751FAf22a96F7D2eAC15304839242cF8c0",
    Lettuce: "0xF7aE103AacD84641Fa0c43860C23a8Cf7cE5DB5a",
  };

  const handleSwap = () => {
    if (!isConnected) return;

    // Swap currencies and amounts
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const { depositTokens } = useDeposit({
    tokenAddress: tokenAddressMap[fromCurrency],
    amount: fromAmount,
    decimals: 18,
    onDepositSuccess: () => {
      setSwapStage("matching");
      setTimeout(() => {
        setSwapStage("idle");
      }, 2000);
    },
  });

  const handleMainSwap = async () => {
    if (!isConnected) return;
    setSwapStage("depositing");

    try {
      const txHash = await depositTokens?.();
      if (txHash) {
        console.log("✅ Deposit transaction submitted:", txHash);
        await matchingEngine.initiateDeposit(txHash);
        
        // Simulate deposit confirmation with longer delay
        setTimeout(async () => {
          await matchingEngine.depositConfirmed();
          setSwapStage("matching");
          
          // Simulate intent submission with longer delay
          setTimeout(async () => {
            await matchingEngine.intentsSubmitted();
            
            // Simulate finding matches and completing swap with longer delays
            setTimeout(async () => {
              await matchingEngine.matchesFound();
              setSwapStage("match_found");
              
              // Add delay before sending tokens
              setTimeout(async () => {
                await matchingEngine.tokensSent();
                setSwapStage("idle");
              }, 3000);
            }, 4000);
          }, 9500);
        }, 3000);
      } else {
        console.warn("⚠️ depositTokens returned undefined.");
        await matchingEngine.depositFailed("Transaction failed to submit");
        setSwapStage("idle");
      }
    } catch (err) {
      console.error("❌ Deposit failed:", err);
      await matchingEngine.depositFailed(err instanceof Error ? err.message : "Unknown error");
      setSwapStage("idle");
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    switch (swapStage) {
      case "depositing":
        return "Depositing...";
      case "matching":
        return "Matching...";
      case "match_found":
        return "Match Found!";
      case "claiming":
        return "Claiming...";
      default:
        return "Swap";
    }
  };

  const getButtonDisabled = () => {
    return !isConnected || swapStage !== "idle";
  };

  const getButtonClassName = () => {
    const baseClasses =
      "w-full text-white font-bold py-4 px-6 rounded-xl mt-4 transition-colors";
    if (!isConnected) {
      return `${baseClasses} bg-[#F6411B] hover:bg-[#F6411B]/90`;
    }

    switch (swapStage) {
      case "depositing":
      case "matching":
      case "match_found":
      case "claiming":
        return `${baseClasses} bg-[#F6411B] opacity-50 cursor-not-allowed`;
      default:
        return `${baseClasses} bg-[#F6411B] hover:bg-[#F6411B]/90`;
    }
  };

  const getMarketRate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/get-market-rate?fromToken=${fromCurrency}&toToken=${toCurrency}`,
      );
      setMarketRate(response.data.rate);
      // Update toAmount based on current fromAmount and new rate
      if (parseFloat(fromAmount) > 0) {
        const newToAmount = (
          parseFloat(fromAmount) * response.data.rate
        ).toFixed(6);
        setToAmount(newToAmount);
      }
    } catch (error) {
      console.error("Error fetching market rate:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update toAmount whenever fromAmount changes
  useEffect(() => {
    if (parseFloat(fromAmount) > 0 && marketRate > 0) {
      const newToAmount = (parseFloat(fromAmount) * marketRate).toFixed(6);
      setToAmount(newToAmount);
    } else {
      setToAmount("0.0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAmount, marketRate]);

  // Fetch initial market rate
  useEffect(() => {
    getMarketRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  const getTokenLogo = (currency: string) => {
    if (currency === "Patty") {
      return (
        <Image
          src="/patty.png"
          alt="Patty"
          className={`w-6 h-6`}
          width={24}
          height={24}
        />
      );
    } else if (currency === "Cheese") {
      return (
        <Image
          src="/cheese.svg"
          alt="Cheese"
          className={`w-6 h-6`}
          width={24}
          height={24}
        />
      );
    } else {
      return (
        <Image
          src="/lettuce.svg"
          alt="Lettuce"
          className={`w-6 h-6`}
          width={24}
          height={24}
        />
      );
    }
  };

  return (
    <div className="max-w-md w-full space-y-4">
      {/* Swap Card */}
      <div className="bg-gradient-to-br backdrop-blur-sm from-[#F6411B]/5 to-yellow-500/5 rounded-3xl p-5 shadow-lg border border-[#F6411B]/20">
        {/* From Section */}
        <div className="mb-4">
          <p className="text-[#F6411B] mb-2">From</p>
          <div className="bg-gradient-to-r from-[#F6411B]/10 to-yellow-500/10 rounded-2xl p-4 flex items-center justify-between border border-[#F6411B]/20 hover:border-yellow-500/20 transition-colors">
            <div className="flex items-center">
              <div className={`bg-white rounded-full p-2 mr-2`}>
                <div className="w-6 h-6 flex items-center justify-center">
                  {getTokenLogo(fromCurrency)}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-[#F6411B] font-bold text-lg focus:outline-none">
                  {fromCurrency}
                  <ChevronDown className="ml-1 h-5 w-5 text-[#F6411B]/70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/90 text-[#F6411B] border-[#F6411B]/20">
                  {currencies.map((currency) => (
                    <DropdownMenuItem
                      key={currency}
                      className="focus:bg-[#F6411B]/20 cursor-pointer"
                      onClick={() => setFromCurrency(currency)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center">
                            {getTokenLogo(currency)}
                          </div>
                          {currency}
                        </div>
                        {currency === fromCurrency && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="bg-transparent border-none text-[#F6411B] text-2xl font-bold text-right w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleSwap}
            className="bg-gradient-to-r from-[#F6411B]/10 to-yellow-500/10 p-1 rounded-full border border-[#F6411B]/20 hover:border-yellow-500/20 hover:from-[#F6411B]/20 hover:to-yellow-500/20 transition-all"
          >
            <ArrowDown className="h-6 w-6 text-[#F6411B]" />
          </button>
        </div>

        {/* To Section */}
        <div className="mb-4">
          <p className="text-[#F6411B] mb-2">To</p>
          <div className="bg-gradient-to-r from-[#F6411B]/10 to-yellow-500/10 rounded-2xl p-4 flex items-center justify-between border border-[#F6411B]/20 hover:border-yellow-500/20 transition-colors">
            <div className="flex items-center">
              <div className={`bg-white rounded-full p-2 mr-2`}>
                <div className="w-6 h-6 flex items-center justify-center">
                  {getTokenLogo(toCurrency)}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-[#F6411B] font-bold text-lg focus:outline-none">
                  {toCurrency}
                  <ChevronDown className="ml-1 h-5 w-5 text-[#F6411B]/70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/90 text-[#F6411B] border-[#F6411B]/20">
                  {currencies.map((currency) => (
                    <DropdownMenuItem
                      key={currency}
                      className="focus:bg-[#F6411B]/20 cursor-pointer"
                      onClick={() => setToCurrency(currency)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center">
                            {getTokenLogo(currency)}
                          </div>
                          {currency}
                        </div>
                        {currency === toCurrency && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Input
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="bg-transparent border-none text-[#F6411B] text-2xl font-bold text-right w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Rate Display */}
        <div className="flex justify-between mb-4">
          <span className="text-[#F6411B]">Sell {fromCurrency} at rate</span>
          <button
            onClick={getMarketRate}
            disabled={loading}
            className="text-yellow-500 cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Set market rate"}
          </button>
        </div>

        {/* Rate Card */}
        <div className="flex">
          <div className="bg-gradient-to-r from-[#F6411B]/10 to-yellow-500/10 rounded-l-xl p-4 flex-1 border border-[#F6411B]/20">
            <span className="text-[#F6411B] block">{toCurrency}</span>
            <div className="flex items-baseline">
              <span className="text-[#F6411B] text-xl font-bold">
                {marketRate.toFixed(6)}
              </span>
              <span className="text-yellow-500/70 text-sm ml-2">
                ~{(marketRate * 2.63).toFixed(2)} USD
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#F6411B]/10 to-yellow-500/10 rounded-r-xl p-4 flex-1 border border-[#F6411B]/20 border-l-0">
            <span className="text-[#F6411B] block">Min Amount</span>
            <span className="text-[#F6411B] text-xl font-bold">
              {(
                parseFloat(toAmount) *
                (1 - (Math.random() * 0.007 + 0.004))
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Trade Settings Card */}
      <div className="bg-gradient-to-br backdrop-blur-sm from-[#F6411B]/5 to-yellow-500/5 rounded-3xl p-5 shadow-lg border border-[#F6411B]/20">
        {/* Total Trades */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-[#F6411B]">Expiry</span>
            <span className="text-[#F6411B] font-bold">
              {totalTrades} {maxDuration}
            </span>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#F6411B"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Slider
              defaultValue={[totalTrades]}
              max={10}
              step={1}
              onValueChange={(value) => setTotalTrades(value[0])}
              className="flex-1"
            />
          </div>
        </div>

        {/* Connect Wallet Button */}
        <button
          className={getButtonClassName()}
          onClick={handleMainSwap}
          disabled={getButtonDisabled()}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
