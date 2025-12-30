import { ApiError } from "@/lib/api/error";
import { handleApi } from "@/lib/api/handler";
import { loginUser, LoginData } from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = handleApi(async (req: NextRequest) => {
  const body: LoginData = await req.json();
  
  // Validation
  if (!body.username || !body.password) {
    throw ApiError.badRequest("يرجى إدخال اسم المستخدم وكلمة المرور");
  }

  const { token, user } = await loginUser(body);

  // إنشاء Response مع Cookie
  const response = NextResponse.json({
    data: {
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user,
    }
  });

  // حفظ التوكن في Cookie
  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // تغيير من strict لـ lax لضمان الثبات في الروابط الجانبية
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });

  return response;
});