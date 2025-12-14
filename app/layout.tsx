import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BUSINESS } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BUSINESS.name} | Long-Term Car Rental Perth`,
  description: `Affordable long-term car rentals in Perth, Australia. Minimum 6 weeks. From $229/week. Reliable vehicles, transparent pricing.`,
  keywords: ["car rental", "Perth", "long-term", "6 weeks", "affordable"],
  openGraph: {
    title: `${BUSINESS.name}`,
    description: "Long-term car rentals in Perth, Australia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
