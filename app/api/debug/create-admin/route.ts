import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/security";
import { NextResponse } from "next/server";

export async function GET() {
  const username = "abdulrahman2025";
  const password = "abdo1234";
  const name = "Abdulrahman Habiba";

  try {
    // 1. تشفير كلمة المرور
    const hashedPassword = await hashPassword(password);

    // 2. تحديث أو إنشاء المستخدم
    const user = await prisma.user.upsert({
      where: { username },
      update: {
        password: hashedPassword,
        role: "SUPER_ADMIN",
        isActive: true,
      },
      create: {
        username,
        password: hashedPassword,
        name,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "تم إنشاء حساب الـ Super Admin بنجاح",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
