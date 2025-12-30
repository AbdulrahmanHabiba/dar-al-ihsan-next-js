import { handleApi } from "@/lib/api/handler";
import { getAllUsers } from "@/services/user.service";
import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export const GET = handleApi(async () => {
  return await getAllUsers();
});

export const POST = handleApi(async (req) => {
  const body = await req.json();
  const { username, password, name, role, email, studentId, teacherId, supervisorId } = body;

  if (!username || !password || !name) {
    throw ApiError.badRequest("يجب إدخال اسم المستخدم وكلمة المرور والاسم");
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) throw ApiError.badRequest("اسم المستخدم موجود بالفعل");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      name,
      role: (role as Role) || Role.STUDENT,
      email: email || null,
      studentId: studentId ? parseInt(studentId) : null,
      teacherId: teacherId ? parseInt(teacherId) : null,
      supervisorId: supervisorId ? parseInt(supervisorId) : null,
    },
  });

  return user;
});
