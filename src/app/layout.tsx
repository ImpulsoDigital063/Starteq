import type { Metadata } from "next";
import { Inter, Rajdhani, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starteq Tocantins · Hardware Gamer e Assistência Técnica · Palmas-TO",
  description:
    "Loja gamer especializada em Palmas. Monte seu PC com peças validadas, retire na hora ou receba no mesmo dia. Atendimento humano + IA + PIX nativo.",
  openGraph: {
    title: "Starteq Tocantins",
    description: "Hardware gamer em Palmas-TO · monte seu PC · entrega same-day",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${rajdhani.variable} ${jetbrains.variable} ${orbitron.variable}`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
