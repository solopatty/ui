import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Kanit } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { cn } from "@/lib/utils";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const fontKanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoloPatty",
  description: "Fair Trade, Dont get sandwiched!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontKanit.variable}>
      <body className={cn("min-h-screen bg-background font-kanit antialiased")}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
