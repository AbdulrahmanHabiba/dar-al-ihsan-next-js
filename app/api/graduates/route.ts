import { handleApi } from "@/lib/api/handler";
import { createGraduate, getAllGraduates } from "@/services/graduate.service";
import { NextRequest } from "next/server";

export const GET = handleApi(async () => {
  return await getAllGraduates();
});

export const POST = handleApi(async (req: NextRequest) => {
  const body = await req.json();
  return await createGraduate(body);
});


