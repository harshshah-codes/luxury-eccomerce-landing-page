import type { Metadata } from "next";
import { EB_Garamond, Manrope } from 'next/font/google';
import AppShell from "@/components/app-shell";
import "./globals.css";

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-serif' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Maison Héritage — Atelier of Considered Objects, Paris 1923",
  description: "An atelier of considered objects, established in Paris, 1923.",
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
