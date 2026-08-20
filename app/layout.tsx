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
  title: "Skylog — GBF Account Plan",
  description: "A visual roadmap for Granblue Fantasy teams, grids, and investments.",
  openGraph: {
    title: "Skylog — GBF Account Plan",
    description: "Visual teams, weapon grids, and investment roadmaps across all six elements.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Skylog GBF account roadmap" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skylog — GBF Account Plan",
    description: "Visual teams, weapon grids, and investment roadmaps across all six elements.",
    images: ["/og.png"],
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
