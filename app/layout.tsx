import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/query-provider";

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
      <body className={`${cairo.variable} ${amiri.variable}`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}