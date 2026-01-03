import type { Metadata } from "next";
import { Cairo, Amiri, Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/app/providers";
import { QuranPlayer } from "@/components/QuranPlayer";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-ruqaa",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dar-al-ihsan.vercel.app"),
  title: {
    default: "دار الإحسان لتحفيظ وتجويد القرآن الكريم - إدكو",
    template: "%s | دار الإحسان"
  },
  description: "دار الإحسان لتحفيظ وتجويد القرآن الكريم بإدكو - البحيرة، تحت إشراف فضيلة الشيخ أحمد مرعي. تعليم القرآن الكريم بالتجويد والقراءات والعلوم الشرعية.",
  keywords: [
    "دار الإحسان", "Dar Al-Ihsan", "تحفيظ قرآن إدكو", "تجويد القرآن", "الشيخ أحمد مرعي",
    "Quran Center Idku", "قرآن كريم إدكو", "البحيرة", "مدرسة قرآن", "تعليم تجويد",
    "عبدالرحمن حبيبة", "Abdulrahman Habiba", "تطوير دار الإحسان", "مشاريع عبدالرحمن حبيبة"
  ],
  authors: [{ name: "دار الإحسان" }, { name: "عبدالرحمن حبيبة", url: "https://abdulrahman-habiba.vercel.app" }],
  creator: "عبدالرحمن حبيبة (Abdulrahman Habiba)",
  publisher: "دار الإحسان",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "دار الإحسان لتحفيظ وتجويد القرآن الكريم",
    description: "رحلة إيمانية في رحاب القرآن الكريم تحت إشراف الشيخ أحمد مرعي بإدكو.",
    url: "https://dar-al-ihsan.vercel.app",
    siteName: "دار الإحسان",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/azhar-logo-modern.png",
        width: 800,
        height: 600,
        alt: "شعار دار الإحسان",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "دار الإحسان لتحفيظ وتجويد القرآن الكريم",
    description: "تعليم القرآن الكريم بالتجويد والقراءات بإشراف الشيخ أحمد مرعي",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "دار الإحسان لتحفيظ وتجويد القرآن الكريم",
              "alternateName": "Dar Al-Ihsan",
              "image": "https://dar-al-ihsan.vercel.app/azhar-logo-modern.png",
              "url": "https://dar-al-ihsan.vercel.app",
              "telephone": "+201159556715",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "شارع البحر",
                "addressLocality": "إدكو",
                "addressRegion": "البحيرة",
                "addressCountry": "EG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 31.309075,
                "longitude": 30.2933174
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "12:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=100013462008509",
                "https://www.facebook.com/groups/1550459465114127"
              ],
              "founder": {
                "@type": "Person",
                "name": "الشيخ أحمد مرعي"
              },
              "author": {
                "@type": "Person",
                "name": "عبدالرحمن حبيبة",
                "url": "https://abdulrahman-habiba.vercel.app"
              }
            })
          }}
        />
      </head>
      <body className={`${cairo.variable} ${amiri.variable} ${ruqaa.variable}`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              {children}
              <QuranPlayer />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}