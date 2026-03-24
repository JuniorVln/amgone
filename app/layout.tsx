import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mercedes-AMG ONE — The One and Only",
  description:
    "Born from Formula 1. Built for the road. 1,063 HP. 352 KM/H. 275 Units. All Sold.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable}`}
      style={{ scrollbarWidth: "none" } as React.CSSProperties}
    >
      <body className="bg-amg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
