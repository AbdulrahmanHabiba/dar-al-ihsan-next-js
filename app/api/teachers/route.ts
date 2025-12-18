import { handleApi } from "@/lib/api/handler";
import { createTeacher, getAllTeachers } from "@/services/teacher.service";
import { NextRequest } from "next/server";

export const GET = handleApi(async () => {
  return await getAllTeachers();
});

export const POST = handleApi(async (req: NextRequest) => {
  const body = await req.json();
  return await createTeacher(body);
});
