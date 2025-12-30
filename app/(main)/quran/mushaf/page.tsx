"use client";

import QuranBrowser from "@/components/quran/QuranBrowser";

export default function QuranTestPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 
        This page acts as a dedicated portal for the Mushaf.
        Header/Footer are hidden inside QuranBrowser by using a fixed full-screen layout.
      */}
            <QuranBrowser />
        </div>
    );
}
