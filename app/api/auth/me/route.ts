import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { handleApi } from "@/lib/api/handler";
import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";

export const GET = handleApi(async (req: NextRequest) => {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    throw ApiError.unauthorized("غير مسجل دخول");
  }

  const payload = await verifyToken(token);
  if (!payload) {
    throw ApiError.unauthorized("انتهت صلاحية الجلسة");
  }

  // نقدر نكتفي بالبيانات اللي في التوكن لو عايزين سرعة، 
  // أو نجيب أحدث بيانات من الداتا بيز للضمان
  const user = await prisma.user.findUnique({
    where: { id: payload.id as number },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      email: true,
      studentId: true,
      teacherId: true,
      supervisorId: true,
    }
  });

  if (!user) {
    throw ApiError.notFound("المستخدم غير موجود");
  }

  return user;
});
