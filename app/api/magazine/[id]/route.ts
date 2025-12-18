import { handleApi } from "@/lib/api/handler";
import { deleteMagazineItem, updateMagazineItem } from "@/services/magazine.service";

export const PUT = handleApi(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  return await updateMagazineItem(Number(id), body);
});

export const DELETE = handleApi(async (req, { params }) => {
  const { id } = await params;
  return await deleteMagazineItem(Number(id));
});

