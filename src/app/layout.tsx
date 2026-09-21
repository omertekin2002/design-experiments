import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const basePath = process.env.NODE_ENV === "production" ? "/design-experiments" : "";

export const metadata: Metadata = {
  title: "Litz — Time Tracking & Project Billing",
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico?v=1`, sizes: "any", type: "image/x-icon" },
      { url: `${basePath}/icon.svg?v=1`, sizes: "any", type: "image/svg+xml" },
    ],
    apple: {
      url: `${basePath}/apple-icon.png?v=1`,
      sizes: "180x180",
      type: "image/png",
    },
  },
  description:
    "Track time across apps, files, and websites. Assign time blocks to projects for accurate billing. Runs quietly in the background.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
