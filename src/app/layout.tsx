import type { Metadata } from "next";
import "./globals.css";
import { BalanceProvider } from "@/context/BalanceContext";
import { SeedProvider } from "@/context/SeedContext";

export const metadata: Metadata = {
  title: "Crop Game",
  description: "A fun and engaging crop management game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BalanceProvider>
      <SeedProvider>
        <html lang="en" data-google-analytics-opt-out="">
          <body>{children}</body>
        </html>
      </SeedProvider>
    </BalanceProvider>
  );
}
