"use client";

import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDashboardHeader, setShowDashboardHeader] = useState(true);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // لما المنيو تتفتح على الموبايل، امنع سكرول الصفحة الخلفية
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // على صفحات الداشبورد: أخفي الهيدر الرئيسي عند السكرول لتحت، وأرجّعه عند السكرول لفوق
  useEffect(() => {
    if (!pathname?.startsWith("/dashboard")) {
      setShowDashboardHeader(true);
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // لو بننزل لتحت وعدّينا شوية بيكسلات، اخفي الهيدر
      if (currentY > lastScrollY && currentY > 80) {
        setShowDashboardHeader(false);
      } else if (currentY < lastScrollY || currentY <= 80) {
        // لو بنطلع لفوق أو قرّبنا من أول الصفحة، أظهره تاني
        setShowDashboardHeader(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const navItems = [
     { title: "الرئيسية", path: "/" },
    { title: "عن الدار", path: "/about" },
    { title: "المعلمون", path: "/teachers" },
    { title: "الخريجون", path: "/graduates" },
    { title: "المجلة", path: "/magazine" },
    { title: "المصحف الشريف", path: "/quran" },
    { title: "الأذكار", path: "/azkar" },
    { title: "موقعنا", path: "/location" },
    { title: "تواصل معنا", path: "/contact" },
    { title: "لوحة التحكم", path: "/auth" },
  ];

  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <header
      className={cn(
        "sticky top-0 md:z-40 z-[100] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300",
        isDashboard && !showDashboardHeader ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary shadow-elegant">
            <BookOpen className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="hidden md:block text-right">
            <h1 className="text-xl font-bold leading-tight">دار الإحسان</h1>
            <p className="text-xs text-muted-foreground">لتحفيظ وتجويد القرآن الكريم</p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="px-4 py-2 rounded-md text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-muted"
              activeClassName="text-primary bg-primary/10"
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur h-[calc(100vh-56px)] w-full overflow-y-auto">
          <nav className="container flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-md text-base font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-muted"
                activeClassName="text-primary bg-primary/10"
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

