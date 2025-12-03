import { handleApi } from "@/lib/api/handler";
import { incrementNewsLikes } from "@/services/news.service";

export const POST = handleApi(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  const delta = body.delta ?? 1;
  
  return await incrementNewsLikes(Number(id), delta);
});