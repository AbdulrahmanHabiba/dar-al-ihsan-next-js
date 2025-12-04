"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    // فقط على الكلاينت: لو مش متسجل دخوله، روّح على /auth
    if (!isAuthenticated()) {
      router.replace("/auth");
    } else {
      setCanShow(true);
    }
  }, [router]);

  if (!canShow) {
    return null; // حتى تكتمل الـ useEffect، وبعدها يظهر الداشبورد
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

