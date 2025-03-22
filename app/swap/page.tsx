import React from "react";
import SwapInterface from "@/components/swap-interface";
import { LogBar } from "@/components/log-bar";
const page = () => {
  return (
    <div className="flex flex-row">
      <SwapInterface />
      <LogBar />
    </div>
  );
};

export default page;
