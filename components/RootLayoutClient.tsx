"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { QuranPlayer } from "@/components/QuranPlayer";

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Check if current route is the Quran reader
    const isQuranPage = pathname?.startsWith("/quran");

    if (isQuranPage) {
        return <main className="flex-1">{children}</main>;
    }

    return (
        <>
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
        </>
    );
}
