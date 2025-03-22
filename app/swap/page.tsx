import React from "react";
import SwapInterface from "@/components/swap-interface";
import { LogBar } from "@/components/log-bar";
const page = () => {
  return (
    <div className="flex flex-row justify-around items-center p-20 pt-4">
      <SwapInterface />
      <LogBar />
    </div>
  );
};

export default page;
