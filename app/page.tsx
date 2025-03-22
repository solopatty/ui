import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-white via-orange-50 to-orange-300 h-screen">
      <Wrapper>
        <div className="flex flex-col items-center">
          <div className="relative h-fit w-fit p-16 rounded-full flex flex-col items-center justify-center text-white font-bold">
            <div className="">
              <div className="absolute w-full h-full blur-3xl rounded-full"/>
              <div className="flex flex-col gap-3 justify-center items-center">
                <span className="dark:text-white font-extrabold text-black z-30 text-7xl">SoloPatty</span>
                <span className="dark:text-gray-300 font-medium text-black z-30 text-lg">A TEE-based private order book DEX with CoW completely preventing front-running & MEV.</span>
              </div>
            </div>
            <Link href="/swap"
              className="flex w-36 z-30 cursor-pointer h-10 mt-5 rounded-lg bg-primary justify-center items-center text-center hover:bg-primary transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-primary active:translate-x-0.5 active:translate-y-0.5"
            >
              {"Launch App"}
            </Link>
          </div>
          <div className="w-full mt-8">
            
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default Home;
