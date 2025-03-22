import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FloatingFood } from "@/components/FloatingFood";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-200 relative">
      <FloatingFood />
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] w-full px-4">
          {/* Hero Section */}
          <div className="text-center w-full max-w-4xl mx-auto space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F6411B]/20 to-orange-500/20 blur-3xl rounded-full" />
              <h1 className="relative text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#F6411B] to-orange-500 bg-clip-text text-transparent">
                SoloPatty
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              A TEE-based private order book DEX with CoW completely preventing
              front-running & MEV.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/swap"
                className="group flex items-center gap-2 px-8 py-4 backdrop-blur-sm bg-[#F6411B] text-white rounded-xl font-semibold hover:bg-[#F6411B]/90 transition-all hover:shadow-lg hover:shadow-[#F6411B]/20"
              >
                Launch App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl mx-auto px-4">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#F6411B]/20 hover:border-[#F6411B]/40 transition-colors">
              <div className="w-12 h-12 bg-[#F6411B]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#F6411B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#F6411B] mb-2">
                Secure Trading
              </h3>
              <p className="text-gray-600">
                Protected by TEE technology ensuring your trades are secure and
                private.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#F6411B]/20 hover:border-[#F6411B]/40 transition-colors">
              <div className="w-12 h-12 bg-[#F6411B]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#F6411B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#F6411B] mb-2">
                No Front-Running
              </h3>
              <p className="text-gray-600">
                CoW protocol ensures your trades are executed at the best
                possible price.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#F6411B]/20 hover:border-[#F6411B]/40 transition-colors">
              <div className="w-12 h-12 bg-[#F6411B]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#F6411B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#F6411B] mb-2">
                Fair Pricing
              </h3>
              <p className="text-gray-600">
                Transparent and fair pricing mechanism for all traders.
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default Home;
