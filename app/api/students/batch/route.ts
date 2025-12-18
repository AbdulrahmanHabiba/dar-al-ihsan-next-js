import { handleApi } from "@/lib/api/handler";
import { createManyStudents, CreateStudentInput } from "@/services/students.service";
import { NextRequest } from "next/server";

export const POST = handleApi(async (req: NextRequest) => {
  const body = await req.json();
  const students: CreateStudentInput[] = body.students || [];
  return await createManyStudents(students);
});

import { handleApi } from "@/lib/api/handler";
import { NextRequest } from "next/server";
import { createManyStudents, CreateStudentInput } from "@/services/students.service" ;

// create many students
export const POST = handleApi(async (req: NextRequest)=>{
    const body: CreateStudentInput[] = await req.json();
    // validate body
    if (!Array.isArray(body) || body.length === 0) {
        throw new Error("Invalid request body");
    }
    return await createManyStudents(body);

})