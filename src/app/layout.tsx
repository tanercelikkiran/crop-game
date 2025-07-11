import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" data-google-analytics-opt-out="">
      <body>{children}</body>
    </html>
  );
}
