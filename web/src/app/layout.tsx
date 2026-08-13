import type { Metadata } from "next";
import { EB_Garamond, Manrope } from 'next/font/google';
import AppShell from "@/components/app-shell";
import "./globals.css";

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-serif' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "The Ethiel Studio — Atelier of Considered Objects",
  description: "An atelier of considered objects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${manrope.variable}`}>
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
