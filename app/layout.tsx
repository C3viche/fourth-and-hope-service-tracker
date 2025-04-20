import type { Metadata } from "next";
import "./globals.scss";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--fontPrimary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fourth and Hope Service Tracker",
  description: "A centralized platform for those in need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable}`}>
        {children}
      </body>
    </html>
  );
}
