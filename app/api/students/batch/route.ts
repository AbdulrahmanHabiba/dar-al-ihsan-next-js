import { handleApi } from "@/lib/api/handler";
import { createManyStudents, CreateStudentInput } from "@/services/students.service";
import { NextRequest } from "next/server";

export const POST = handleApi(async (req: NextRequest) => {
  const body = await req.json();
  
  // التعامل مع كلتا الحالتين: إرسال مصفوفة مباشرة أو كائن يحتوي على مصفوفة طلاب
  const students: CreateStudentInput[] = Array.isArray(body) ? body : (body.students || []);

  if (students.length === 0) {
    throw new Error("Invalid request body: No students provided");
  }

  return await createManyStudents(students);
});