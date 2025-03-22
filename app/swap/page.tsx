import React from "react";
import SwapInterface from "@/components/swap-interface";
import { LogBar } from "@/components/log-bar";
const page = () => {
  return (
    <div className="flex flex-row justify-between items-center h-screen p-14">
      <SwapInterface />
      <LogBar />
    </div>
  );
};

export default page;
