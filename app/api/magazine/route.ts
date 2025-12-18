import { handleApi } from "@/lib/api/handler";
import { createMagazineItem, getAllMagazineItems } from "@/services/magazine.service";
import { NextRequest } from "next/server";

export const GET = handleApi(async () => {
  return await getAllMagazineItems();
});

export const POST = handleApi(async (req: NextRequest) => {
  const body = await req.json();
  return await createMagazineItem(body);
});

