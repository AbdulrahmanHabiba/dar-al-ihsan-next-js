import { handleApi } from "@/lib/api/handler";
import { createGroup, getAllGroups } from "@/services/group.service";
import { NextRequest } from "next/server";

export const GET = handleApi(async () => {
  return await getAllGroups();
});

export const POST = handleApi(async (req: NextRequest) => {
  const body = await req.json();
  return await createGroup(body);
});
