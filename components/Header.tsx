import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wrapper } from "./Wrapper";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-4 border-b mb-2">
      <Wrapper>
        <div className="flex items-center justify-between">
          <Link href="/"className="text-lg md:text-xl font-bold">
            SoloPatty
          </Link>
          <Link href="/swap">Swap</Link>
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
