import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-display",
});
const body = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cabanasdorio.com.br"),
  title: "Cabanas do Rio | Hospedagem em Alfredo Wagner - SC",
  description:
    "Conheça a Cabana do Rio e o Mirante do Caeté. Dois refúgios entre a mata, a madeira e o rio em Alfredo Wagner, Santa Catarina. Planeje sua estadia.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cabanas do Rio | Seu refúgio em Alfredo Wagner",
    description:
      "Dois refúgios. A natureza em comum. Conheça as cabanas e planeje sua próxima pausa em Santa Catarina.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/natureza/rio.avif",
        width: 1200,
        height: 798,
        alt: "Rio cercado pela natureza em Alfredo Wagner",
      },
    ],
  },
  verification: {
    google: "F_kZJ9YgiO560Zalo2GJWFyLBytH7DXQbral2v3238Y",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
