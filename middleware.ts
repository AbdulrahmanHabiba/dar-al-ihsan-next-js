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

  // 4. السماح بمرور الطلب
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
