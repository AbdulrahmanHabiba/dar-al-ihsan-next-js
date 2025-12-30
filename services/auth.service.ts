import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/security";
import { signToken } from "@/lib/jwt";
import { parseInviteCode } from "@/lib/auth-utils";
import { ApiError } from "@/lib/api/error";

// ════════════════════════════════════════════════════════════════
// Types
// ════════════════════════════════════════════════════════════════

export interface RegisterData {
  username: string;
  password: string;
  name: string;
  email?: string;
  phone?: string;
  code: string;
}

export interface LoginData {
  username: string; // This can be username or email
  password: string;
}

// ════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════

function isEmail(input: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

// ════════════════════════════════════════════════════════════════
// Auth Service
// ════════════════════════════════════════════════════════════════

async function registerUser(data: RegisterData) {
  const { username, password, name, email, phone, code } = data;

  let finalRole: any = "STUDENT";
  let entityId: number | null = null;
  let entityType: string | null = null;

  if (code) {
    const inviteCode = parseInviteCode(code);
    if (!inviteCode) throw ApiError.badRequest("كود التسجيل غير صحيح");

    entityId = inviteCode.entityId;
    entityType = inviteCode.entityType;

    await checkEntity(entityType, entityId);
    finalRole = await determineFinalRole(entityType, entityId, inviteCode.role);
  }

  // Check unique username
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) throw ApiError.badRequest("اسم المستخدم مستخدم بالفعل");

  // Check unique email if provided
  if (email) {
    const existingEmail = await prisma.user.findFirst({ where: { email } });
    if (existingEmail) throw ApiError.badRequest("البريد الإلكتروني مستخدم بالفعل");
  }

  const hashedPassword = await hashPassword(password);

  try {
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email: email || null,
        phone: phone || null,
        role: finalRole,
        studentId: entityType === "Student" ? entityId : null,
        teacherId: entityType === "Teacher" ? entityId : null,
        supervisorId: entityType === "Supervisor" ? entityId : null,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    throw ApiError.internal("فشل في إنشاء الحساب");
  }
}

async function loginUser(data: LoginData) {
  const { username, password } = data;
  const isEmailInput = isEmail(username);
  const trimmedPassword = password.trim();
  const trimmedUsername = username.trim();

  const user = await prisma.user.findFirst({
    where: isEmailInput ? { email: trimmedUsername } : { username: trimmedUsername },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
      name: true,
      email: true,
    }
  });

  if (!user) {
    throw ApiError.unauthorized("اسم المستخدم أو كلمة المرور غير صحيحة");
  }

  const isValid = await verifyPassword(trimmedPassword, user.password);
  
  if (!isValid) {
    throw ApiError.unauthorized("اسم المستخدم أو كلمة المرور غير صحيحة");
  }

  console.log(`[Login Debug] Login successful for: ${user.username}`);


  try {
    const token = await signToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    throw ApiError.internal("Failed to generate token");
  }
}

// ════════════════════════════════════════════════════════════════
// Internal Helpers
// ════════════════════════════════════════════════════════════════

async function checkEntity(type: string, id: number) {
  if (type === "Student") {
    const student = await prisma.student.findUnique({ where: { id }, include: { user: true } });
    if (!student) throw ApiError.notFound("الطالب غير موجود");
    if (student.user) throw ApiError.badRequest("هذا الطالب لديه حساب بالفعل");
  } else if (type === "Teacher") {
    const teacher = await prisma.teacher.findUnique({ where: { id }, include: { user: true } });
    if (!teacher) throw ApiError.notFound("المعلم غير موجود");
    if (teacher.user) throw ApiError.badRequest("هذا المعلم لديه حساب بالفعل");
  } else if (type === "Supervisor") {
    const supervisor = await prisma.supervisor.findUnique({ where: { id }, include: { user: true } });
    if (!supervisor) throw ApiError.notFound("المشرف غير موجود");
    if (supervisor.user) throw ApiError.badRequest("هذا المشرف لديه حساب بالفعل");
  }
}

async function determineFinalRole(type: string, id: number, defaultRole: any) {
  if (type === "Supervisor") {
    const supervisor = await prisma.supervisor.findUnique({ where: { id }, select: { adminLevel: true } });
    if (supervisor?.adminLevel === "SUPER_ADMIN") return "SUPER_ADMIN";
  }
  return defaultRole;
}

export { registerUser, loginUser };