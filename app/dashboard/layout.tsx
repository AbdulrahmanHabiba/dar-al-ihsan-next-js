"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  GraduationCap,
  Users,
  MessageSquare,
  BookOpen,
  TrendingUp,
  LogOut,
  CircleUserRound,
  Presentation
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/dashboard/news", label: "الأخبار", icon: Newspaper },
  { href: "/dashboard/students", label: "الطلاب", icon: CircleUserRound },
  { href: "/dashboard/teachers", label: "المعلمين", icon: Users },
  { href: "/dashboard/groups", label: "المجموعات", icon: Presentation  },
  { href: "/dashboard/graduates", label: "الخريجين", icon: GraduationCap },
  { href: "/dashboard/complaints", label: "الشكاوي", icon: MessageSquare },
  { href: "/dashboard/magazine", label: "المجلة", icon: BookOpen },
  { href: "/dashboard/stories", label: "قصص النجاح", icon: TrendingUp },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [canShow, setCanShow] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // فقط على الكلاينت: لو مش متسجل دخوله، روّح على /auth
    if (!isAuthenticated()) {
      router.replace("/auth");
    } else {
      setCanShow(true);
    }
  }, [router]);

  // إخفاء هيدر الداشبورد عند السحب لأسفل، وإظهاره عند السحب لأعلى
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 80) {
        // نزول لأسفل
        setShowHeader(false);
      } else if (currentY < lastScrollY || currentY <= 80) {
        // طلوع لأعلى أو قريب من أول الصفحة
        setShowHeader(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  if (!canShow) {
    return null; // حتى تكتمل الـ useEffect، وبعدها يظهر الداشبورد
  }

  return (
    <div className="min-h-screen bg-background flex flex-col text-right" dir="rtl">
      {/* Header */}
      <header className={cn(
        "border-b bg-card sticky top-0 z-50 transition-transform duration-300",
        showHeader ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container mx-auto px-2 sm:px-4 py-4 flex items-center justify-between flex-col sm:flex-row gap-5 sm:gap-0">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">لوحة التحكم - دار التحفيظ</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right flex items-center gap-3 sm:block border p-2 sm:border-none">
              <p className="font-medium">المدير العام :</p>
              <p className="text-sm text-muted-foreground">admin@dar.com</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Desktop Sidebar Navigation */}
        <aside className="w-64 border-l bg-card p-4 hidden md:block md:sticky md:top-20 md:self-start">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Horizontal Navigation - Sticky below header */}
        <nav className="md:hidden  top-[80px] z-40 bg-card/95 backdrop-blur border-b shadow-sm">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-around gap-1 px-2 py-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                    )}
                    title={item.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 w-full mx-auto px-2 sm:px-4 py-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

