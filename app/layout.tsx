import type { Metadata } from "next";
import { Cairo, Amiri, Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/app/providers";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  title: "دار الإحسان لتحفيظ وتجويد القرآن الكريم",
  description: "دار الإحسان لتحفيظ وتجويد القرآن الكريم تحت إشراف الشيخ أحمد مرعي - تعليم القرآن الكريم بالتجويد والقراءات",
  authors: [{ name: "دار الإحسان" }],
  openGraph: {
    title: "دار الإحسان لتحفيظ وتجويد القرآن الكريم",
    description: "دار الإحسان لتحفيظ وتجويد القرآن الكريم تحت إشراف الشيخ أحمد مرعي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "دار الإحسان لتحفيظ وتجويد القرآن الكريم",
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
      </head>
      <body className={`${cairo.variable} ${amiri.variable} ${ruqaa.variable}`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <FloatingActionButton
                type="whatsapp"
                phoneNumber="+201159556715"
                message="مرحباً، أود الاستفسار عن دار الإحسان لتحفيظ القرآن الكريم"
              />
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