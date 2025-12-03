import { handleApi } from "@/lib/api/handler";
import { createNews, getAllNews, News } from "@/services/news.service";
import { NextRequest } from "next/server";

export const GET = handleApi(async ()=>{
  return await getAllNews()
});

export const POST = handleApi(async (req: NextRequest)=>{
  const body: News = await req.json();
  return await createNews(body);
}
)