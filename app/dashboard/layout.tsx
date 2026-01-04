"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMe, useLogout } from "@/hooks/useAuth";
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
  Presentation,
  Loader2,
  ShieldCheck,
  UserRoundCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingNav } from "@/components/FloatingNav";

const navItems = [
  { href: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/dashboard/news", label: "الأخبار", icon: Newspaper },
  { href: "/dashboard/users", label: "المستخدمين", icon: UserRoundCog },
  { href: "/dashboard/supervisors", label: "المشرفين", icon: ShieldCheck },
  { href: "/dashboard/students", label: "الطلاب", icon: CircleUserRound },
  { href: "/dashboard/teachers", label: "المعلمين", icon: Users },
  { href: "/dashboard/groups", label: "المجموعات", icon: Presentation },
  { href: "/dashboard/graduates", label: "الخريجين", icon: GraduationCap },
  { href: "/dashboard/complaints", label: "الشكاوي", icon: MessageSquare },
  { href: "/dashboard/magazine", label: "المجلة", icon: BookOpen },
  { href: "/dashboard/stories", label: "قصص النجاح", icon: TrendingUp },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, error } = useMe();
  const logoutMutation = useLogout();
  const [showHeader, setShowHeader] = useState(true);
  const [randomAzkar, setRandomAzkar] = useState("");

  // إخفاء هيدر الداشبورد عند السحب لأسفل، وإظهاره عند السحب لأعلى
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 80) {
        setShowHeader(false);
      } else if (currentY < lastScrollY || currentY <= 80) {
        setShowHeader(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const azkar = [
      "استغفر الله العظيم وأتوب إليه",
      "اللهم صلِّ وسلم وبارك على سيدنا محمد",
      "سبحان الله وبحمده",
      "سبحان الله العظيم",
      "لا حول ولا قوة إلا بالله العلي العظيم",
      "يا حي يا قيوم برحمتك أستغيث",
      "لا إله إلا أنت سبحانك إني كنت من الظالمين",
    ];
    setRandomAzkar(azkar[Math.floor(Math.random() * azkar.length)]);
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/auth");
  };

  // نقل التوجيه إلى useEffect لمنع خطأ "Cannot update a component while rendering"
  useEffect(() => {
    if (!isLoading && (error || !user)) {
      router.replace("/auth");
    }
  }, [error, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="relative mb-8">
          <div className="h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          <BookOpen className="h-10 w-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-4 italic">"{randomAzkar}"</h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2 animate-bounce">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>اشغل دقائق الانتظار بذكر الله...</span>
        </p>
      </div>
    );
  }

  // لو حصل خطأ أو مفيش يوزر، نرجع null والـ useEffect هيتصرف في التوجيه
  if (error || !user) {
    return null;
  }

  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isAdmin = user?.role === "ADMIN";
  const isTeacher = user?.role === "TEACHER";

  // فلترة القائمة الجانبية بناءً على الصلاحيات
  const filteredNavItems = navItems.filter(item => {
    if (isSuperAdmin) return true;
    if (isAdmin) return item.href !== "/dashboard/supervisors";
    if (isTeacher) return item.href === "/dashboard" || item.href === "/dashboard/teachers" || item.href === "/dashboard/students";
    return false;
  });

  // تحديد ما إذا كان المسار الحالي مسموح به (لعرض المموه)
  const isAllowedPath = filteredNavItems.some(item =>
    item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col text-right relative" dir="rtl">
      <FloatingNav />
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
              <p className="font-medium text-primary">{user?.name}</p>
              <div className="flex items-center justify-end gap-1">
                {isSuperAdmin && <ShieldCheck className="h-3 w-3 text-destructive" />}
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout} title="تسجيل الخروج">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Desktop Sidebar Navigation */}
        <aside className="w-64 border-l bg-card p-4 hidden md:block md:sticky md:top-20 md:self-start">
          <nav className="space-y-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
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
        <nav className="md:hidden sticky top-[80px] z-40 bg-card/95 backdrop-blur border-b shadow-sm">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-around gap-1 px-2 py-3">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

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

        {/* Main Content Area */}
        <main className="flex-1 w-full mx-auto px-2 sm:px-4 py-6 md:py-8 mb-12 relative overflow-hidden">
          {/* Glassmorphic Overlay for Unauthorized Pages (Teachers/Admins) */}
          {!isAllowedPath && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-background/40">
              <div className="max-w-md w-full bg-card/80 border shadow-2xl rounded-3xl p-8 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex p-4 rounded-2xl bg-destructive/10 text-destructive mb-2">
                  <ShieldCheck className="h-12 w-12" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">الوصول غير مسموح</h2>
                  <p className="text-muted-foreground mt-2">عذراً، لا تملك الصلاحيات الكافية للوصول لهذه الصفحة. هذه المنطقة مخصصة للإدارة فقط.</p>
                </div>
                <Button asChild className="w-full h-12 rounded-xl text-lg font-bold">
                  <Link href="/dashboard">العودة للرئيسية</Link>
                </Button>
              </div>
            </div>
          )}

          <div className={cn("transition-all duration-500", !isAllowedPath && "blur-lg grayscale pointer-events-none")}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
