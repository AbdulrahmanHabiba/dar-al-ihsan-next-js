import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const username = "abdulrahman2025";

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
        // No password for safety
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: `المستخدم ${username} غير موجود في قاعدة البيانات.`
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "المستخدم موجود وجاهز للدخول.",
      user
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
