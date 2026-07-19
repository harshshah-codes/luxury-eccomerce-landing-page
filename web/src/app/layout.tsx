import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
