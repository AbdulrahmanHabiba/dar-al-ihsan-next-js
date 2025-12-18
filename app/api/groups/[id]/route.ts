import { handleApi } from "@/lib/api/handler";
import { deleteGroup, updateGroup } from "@/services/group.service";

export const PUT = handleApi(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  return await updateGroup(Number(id), body);
});

export const DELETE = handleApi(async (req, { params }) => {
  const { id } = await params;
  return await deleteGroup(Number(id));
});

