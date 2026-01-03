import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

// ════════════════════════════════════════════════════════════════
// Configuration
// ════════════════════════════════════════════════════════════════

const PROTECTED_PATHS = ["/dashboard"];
const API_PROTECTED_PATHS = [
  "/api/students",
  "/api/teachers",
  "/api/groups",
  "/api/news",
  "/api/admin",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. تحديد ما إذا كان المسار محمياً
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isApiProtectedPath = API_PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtectedPath && !isApiProtectedPath) {
    return NextResponse.next();
  }

  // 2. الحصول على التوكن
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return handleUnauthorized(req, isApiProtectedPath);
  }

  // 3. التحقق من التوكن
  const payload = await verifyToken(token);
  
  if (!payload) {
    return handleUnauthorized(req, isApiProtectedPath);
  }

  const userRole = payload.role as string;

  // 4. فحص الصلاحيات بناءً على الرتبة
  
  // أ. الطالب ممنوع من دخول الداشبورد نهائياً
  if (userRole === "STUDENT" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ب. المشرف (ADMIN) ممنوع من دخول صفحة إدارة المشرفين
  if (userRole === "ADMIN" && pathname.startsWith("/dashboard/supervisors")) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ج. المعلم (TEACHER) نمنعه من الـ API الحساسة لو مش في مسار المعلمين
  if (userRole === "TEACHER" && isApiProtectedPath && !pathname.startsWith("/api/teachers")) {
    return NextResponse.json({ error: "غير مصرح لك" }, { status: 403 });
  }

  // 5. السماح بمرور الطلب
  return NextResponse.next();
}

/**
 * التعامل مع الطلبات غير المصرح بها
 */
function handleUnauthorized(req: NextRequest, isApi: boolean) {
  if (isApi) {
    return NextResponse.json(
      { error: "غير مصرح لك بالوصول - برجاء تسجيل الدخول أولاً" },
      { status: 401 }
    );
  }

  const url = req.nextUrl.clone();
  url.pathname = "/auth";
  url.searchParams.set("callbackUrl", req.nextUrl.pathname);
  
  return NextResponse.redirect(url);
}

// تحديد المسارات بدقة لضمان أفضل أداء
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/students/:path*",
    "/api/teachers/:path*",
    "/api/groups/:path*",
    "/api/news/:path*",
    "/api/admin/:path*",
  ],
};
