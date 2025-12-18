import { handleApi } from "@/lib/api/handler";
import { deleteTeacher, updateTeacher } from "@/services/teacher.service";

export const PUT = handleApi(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  return await updateTeacher(Number(id), body);
});

export const DELETE = handleApi(async (req, { params }) => {
  const { id } = await params;
  return await deleteTeacher(Number(id));
});

