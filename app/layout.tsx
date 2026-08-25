import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Soutenroku — GBF Account Plan",
  description: "A visual roadmap for Granblue Fantasy teams, grids, and investments.",
  openGraph: {
    title: "Soutenroku — GBF Account Plan",
    description: "Visual teams, weapon grids, and investment roadmaps across all six elements.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soutenroku — GBF Account Plan",
    description: "Visual teams, weapon grids, and investment roadmaps across all six elements.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
