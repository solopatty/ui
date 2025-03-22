"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wrapper } from "./Wrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();
  return (
    <header className="py-3 border-b">
      <Wrapper>
        <div className="flex items-center justify-between">
          <Link href="/"className="text-lg md:text-xl font-bold">
            SoloPatty
          </Link>
          <Link href="/swap" className={`${pathname === "/swap" ? "text-primary" : "text-gray-500"}`}>Swap</Link>
          <ConnectButton
            showBalance={false}
            accountStatus="address"
            label="Connect"
          />
        </div>
      </Wrapper>
    </header>
  );
};

export { Header };
