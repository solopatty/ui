"use client";

import { useState } from "react";
import { ChevronDown, ArrowDown, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function SwapInterface() {
  const [limitPrice, setLimitPrice] = useState(false);
  const [totalTrades, setTotalTrades] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("CAKE");
  const [fromAmount, setFromAmount] = useState("0.0");
  const [toAmount, setToAmount] = useState("0.0");
  const [tradeInterval, setTradeInterval] = useState("Min");
  const [maxDuration, setMaxDuration] = useState("Min");
  const [tradeIntervalValue, setTradeIntervalValue] = useState("2");
  const [maxDurationValue, setMaxDurationValue] = useState("4");

  const currencies = ["BNB", "ETH", "USDT", "CAKE", "BTC"];
  const timeUnits = ["Min", "Hour", "Day"];

  return (
    <div className="max-w-md w-full space-y-4">
      {/* Swap Card */}
      <div className="bg-card rounded-3xl p-5 shadow-lg">
        {/* From Section */}
        <div className="mb-4">
          <p className="text-card-foreground/70 mb-2">From</p>
          <div className="bg-input rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full p-2 mr-2">
                <div className="w-6 h-6 flex items-center justify-center text-white">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white font-bold text-lg focus:outline-none">
                  {fromCurrency}
                  <ChevronDown className="ml-1 h-5 w-5 text-white/70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-input text-white border-background">
                  {currencies.map((currency) => (
                    <DropdownMenuItem
                      key={currency}
                      className="focus:bg-background/20 cursor-pointer"
                      onClick={() => setFromCurrency(currency)}
                    >
                      <div className="flex items-center justify-between w-full">
                        {currency}
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
              className="bg-transparent border-none text-white text-2xl font-bold text-right w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-4">
          <div className="bg-card p-1 rounded-full">
            <ArrowDown className="h-6 w-6 text-toggle" />
          </div>
        </div>

        {/* To Section */}
        <div className="mb-4">
          <p className="text-card-foreground/70 mb-2">To</p>
          <div className="bg-input rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-toggle rounded-full p-2 mr-2">
                <div className="w-6 h-6 flex items-center justify-center text-white">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#5CD2C6" />
                    <path
                      d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z"
                      fill="white"
                    />
                    <path
                      d="M16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14Z"
                      fill="white"
                    />
                    <path
                      d="M9 8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8Z"
                      fill="white"
                    />
                    <path
                      d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"
                      fill="white"
                    />
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white font-bold text-lg focus:outline-none">
                  {toCurrency}
                  <ChevronDown className="ml-1 h-5 w-5 text-white/70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-input text-white border-background">
                  {currencies.map((currency) => (
                    <DropdownMenuItem
                      key={currency}
                      className="focus:bg-background/20 cursor-pointer"
                      onClick={() => setToCurrency(currency)}
                    >
                      <div className="flex items-center justify-between w-full">
                        {currency}
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
              className="bg-transparent border-none text-white text-2xl font-bold text-right w-24 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Limit Price Toggle */}
        <div className="flex items-center mb-4">
          <Switch
            checked={limitPrice}
            onCheckedChange={setLimitPrice}
            className="bg-input data-[state=checked]:bg-toggle"
          />
          <span className="ml-2 text-white">Limit Price</span>
        </div>

        {/* Rate Display */}
        <div className="flex justify-between mb-4">
          <span className="text-card-foreground/70">Sell BNB at rate</span>
          <span className="text-toggle cursor-pointer hover:underline">
            Set market rate
          </span>
        </div>

        {/* Rate Card */}
        <div className="flex">
          <div className="bg-input rounded-l-xl p-4 flex-1">
            <span className="text-card-foreground/70 block">CAKE</span>
            <div className="flex items-baseline">
              <span className="text-white text-xl font-bold">237.777</span>
              <span className="text-card-foreground/70 text-sm ml-2">
                ~625.35 USD
              </span>
            </div>
          </div>
          <div className="bg-input rounded-r-xl p-4 flex-1 border-l border-background">
            <span className="text-card-foreground/70 block">Min Amount</span>
            <span className="text-white text-xl font-bold">{(parseFloat(toAmount) - 0.3).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Trade Settings Card */}
      <div className="bg-card rounded-3xl p-5 shadow-lg">
        {/* Total Trades */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-card-foreground/70">Total Trades</span>
            <span className="text-white font-bold">{totalTrades}</span>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z"
                  fill="#5CD2C6"
                />
                <path
                  d="M15 22C16.6569 22 18 20.6569 18 19C18 17.3431 16.6569 16 15 16C13.3431 16 12 17.3431 12 19C12 20.6569 13.3431 22 15 22Z"
                  fill="white"
                />
                <path
                  d="M25 22C26.6569 22 28 20.6569 28 19C28 17.3431 26.6569 16 25 16C23.3431 16 22 17.3431 22 19C22 20.6569 23.3431 22 25 22Z"
                  fill="white"
                />
                <path
                  d="M20 28C21.1046 28 22 27.1046 22 26C22 24.8954 21.1046 24 20 24C18.8954 24 18 24.8954 18 26C18 27.1046 18.8954 28 20 28Z"
                  fill="white"
                />
                <path
                  d="M15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z"
                  fill="white"
                />
                <path
                  d="M25 14C25.5523 14 26 13.5523 26 13C26 12.4477 25.5523 12 25 12C24.4477 12 24 12.4477 24 13C24 13.5523 24.4477 14 25 14Z"
                  fill="white"
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
          <div className="flex justify-between mt-1">
            <span className="text-card-foreground/70">Size Per Trade:</span>
            <span className="text-white">0 BNB</span>
          </div>
        </div>

        {/* Connect Wallet Button */}
        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-xl mt-6 transition-colors">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
