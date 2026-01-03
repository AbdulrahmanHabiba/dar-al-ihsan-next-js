"use client";

import { Home, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function FloatingNav() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div
            className={`fixed right-0 top-1/2 -translate-y-1/2 z-[1000] flex items-center transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-[calc(100%-2rem)]"
                }`}
        >
            {/* Panel with buttons */}
            <div className="flex flex-col gap-2 bg-background/90 backdrop-blur-md border-2 border-r-0 rounded-l-2xl shadow-2xl p-3">
                {/* Home Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:scale-110 transition-all duration-300"
                    onClick={() => router.push("/")}
                    title="الصفحة الرئيسية"
                >
                    <Home className="h-5 w-5" />
                </Button>

                {/* Theme Toggle */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:scale-110 transition-all duration-300"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    title={mounted ? (theme === "dark" ? "الوضع النهاري" : "الوضع الليلي") : "تبديل المظهر"}
                >
                    {mounted ? (
                        theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* Arrow Trigger - attached to panel */}
            <Button
                variant="outline"
                size="icon"
                className="h-12 w-8 rounded-l-full rounded-r-none bg-background/90 backdrop-blur-md border-2 border-r-0 shadow-lg hover:scale-105 transition-all duration-300 text-blue-500 hover:text-blue-600 font-bold "
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? "إخفاء" : "إظهار القائمة"}
            >
                {isOpen ? (
                    <ChevronRight className="h-6 w-6" />
                ) : (
                    <ChevronLeft className="h-6 w-6" />
                )}
            </Button>
        </div>
    );
}
