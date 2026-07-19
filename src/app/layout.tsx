import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velo Studio — We build websites & apps from zero",
  description:
    "Velo Studio designs, builds, and ships websites, mobile apps, and enterprise systems from the ground up.",
  icons: {
    icon: "/assets/images/logo.png",
    apple: "/assets/images/logo.png",
  },
  openGraph: {
    title: "Velo Studio — We build websites & apps from zero",
    description:
      "Landing pages, web apps, mobile experiences, and the systems behind them — designed, built, and shipped.",
    siteName: "Velo Studio",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 512,
        height: 512,
        alt: "Velo Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Velo Studio — We build websites & apps from zero",
    description:
      "Landing pages, web apps, mobile experiences, and the systems behind them — designed, built, and shipped.",
    images: ["/assets/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
