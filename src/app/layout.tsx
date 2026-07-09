import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://butomimarlik.com";
const SITE_TITLE = "BUTO Mimarlık | Mimarlık, İç Mimarlık ve İnşaat Hizmetleri";
const SITE_DESCRIPTION =
  "BUTO Mimarlık LTD. ŞTİ. — Mimari ve iç mimari proje tasarımı, dekorasyon ve tadilat, restorasyon, inşaat taahhüt, yapı güçlendirme ve danışmanlık hizmetleri. İstanbul merkezli vizyoner mimarlık ofisi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | BUTO Mimarlık",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "BUTO Mimarlık",
    "mimarlık ofisi İstanbul",
    "iç mimarlık ofisi",
    "mimari proje çizimi",
    "dekorasyon ve tadilat",
    "restorasyon ve renovasyon",
    "inşaat taahhüt firması",
    "yapı güçlendirme",
    "proje ve danışmanlık hizmetleri",
    "Güneşli mimarlık",
    "Bağcılar mimarlık",
    "mimari tasarım",
  ],
  authors: [{ name: "BUTO Mimarlık" }],
  creator: "BUTO Mimarlık",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "BUTO Mimarlık",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BUTO MİMARLIK LTD. ŞTİ.",
  url: SITE_URL,
  email: "info@butomimarlik.com",
  telephone: "+90 530 549 48 93",
  faxNumber: "0212 664 49 38",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15 Temmuz Mah. Koçman Cad. Demirkol Plaza B2 Blok No:54 Kat:4",
    addressLocality: "Güneşli-Bağcılar",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  areaServed: "TR",
  makesOffer: [
    "Dekorasyon ve Tadilat",
    "Restorasyon ve Renovasyon",
    "İnşaat Taahhüt",
    "Yapı Güçlendirme",
    "Proje ve Danışmanlık Hizmetleri",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${jakarta.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
