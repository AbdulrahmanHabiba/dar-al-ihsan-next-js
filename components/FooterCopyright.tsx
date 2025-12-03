"use client";

import { Globe, Phone } from "lucide-react";

export default function FooterCopyright() {
  return (
    <section className="pt-6 pb-4 text-center text-sm text-muted-foreground">
      <p className="text-xs sm:text-sm">
        © {new Date().getFullYear()} دار الإحسان لتحفيظ وتجويد القرآن الكريم. جميع الحقوق محفوظة.
      </p>

      <div className="mt-3 flex items-center justify-center gap-6">
        <a
          href="https://abdulrahman-habiba.vercel.app"
          className="flex items-center gap-2 text-xs sm:text-sm hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Globe className="h-4 w-4" />
          <span>موقع المطوّر</span>
        </a>

        <a
          href="https://wa.me/201113951795"
          className="flex items-center gap-2 text-xs sm:text-sm hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Phone className="h-4 w-4" />
          <span>تواصل واتساب</span>
        </a>
      </div>

      <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground">
        تطوير وبرمجة: عبدالرحمن حبيبة
      </p>
    </section>
  );
}
