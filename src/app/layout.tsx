import type { Metadata } from "next";
import "./globals.css";
import { BalanceProvider } from "@/context/BalanceContext";

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
      <html lang="en" data-google-analytics-opt-out="">
        <body>{children}</body>
      </html>
    </BalanceProvider>
  );
}
