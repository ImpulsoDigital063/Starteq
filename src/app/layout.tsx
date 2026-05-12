import type { Metadata, Viewport } from "next";
import { Inter, Rajdhani, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const SITE_URL = "https://starteq.vercel.app";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "Starteq Tocantins",
  description: "Loja de hardware gamer e assistência técnica em Palmas-TO. PCs montados, peças validadas, entrega same-day.",
  url: SITE_URL,
  telephone: "+55-63-99252-8619",
  email: "starteqpalmas@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "104 Sul, SE 05, Lt. 19, Sala 07",
    addressLocality: "Palmas",
    addressRegion: "TO",
    postalCode: "77020-018",
    addressCountry: "BR",
  },
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-13:00"],
  priceRange: "$$",
  paymentAccepted: ["Cash", "Credit Card", "Pix", "Boleto"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "67",
  },
  sameAs: [
    "https://www.instagram.com/starteq_to",
  ],
};

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

// Viewport · Next.js 16 não adiciona meta viewport por padrão · sem isso iOS Safari
// renderiza assumindo width 980px e miniaturiza tudo
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
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
      <body className="min-h-screen flex flex-col">
        {children}
        <FloatingWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
