import { NextResponse } from "next/server";
import { handleApi } from "@/lib/api/handler";

export const POST = handleApi(async () => {
  const response = NextResponse.json({
    success: true,
    message: "تم تسجيل الخروج بنجاح",
  });

  // حذف الكوكيز عن طريق ضبط تاريخ الانتهاء في الماضي
  response.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
});
