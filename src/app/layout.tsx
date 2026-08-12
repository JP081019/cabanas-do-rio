import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cabanas do Rio",
  description:
    "Hospedagem intimista junto ao rio, com cabanas acolhedoras e experiências de natureza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
