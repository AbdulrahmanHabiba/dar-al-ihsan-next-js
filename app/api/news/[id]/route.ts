import { handleApi } from "@/lib/api/handler";
import { getNewsById, updateNews, deleteNews } from "@/services/news.service";

export const GET = handleApi(async (req, { params }) => {
  const { id } = await params; 
  return await getNewsById(Number(id));
});

export const PUT = handleApi(async (req, { params }) => {
  const { id } = await params; 
  const body = await req.json();
  return await updateNews(Number(id), body);
});

export const DELETE = handleApi(async (req, { params }) => {
  const { id } = await params; 
  return await deleteNews(Number(id));
});