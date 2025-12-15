import { handleApi } from "@/lib/api/handler";
import { createStudent, CreateStudentInput, getAllStudents } from "@/services/students.service";
import { NextRequest } from "next/server";

export const GET = handleApi(async () => {
  return await getAllStudents();
}); 

export const POST = handleApi(async (req: NextRequest) => {
    const body: CreateStudentInput = await req.json();
    return await createStudent(body);
});