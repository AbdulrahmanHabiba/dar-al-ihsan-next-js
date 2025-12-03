import { ApiError } from "@/lib/api/error";
import { prisma } from "@/lib/db";

export interface News {
    title: string;
    description?: string;
    images?: string[];
    videoUrl?: string;
    publisher?: string;
    likes?: number;
    link?: string;
    linkTitle?: string;
    published?: boolean;
    createdAt?: Date;
}

export async function getAllNews() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return news;
  } catch (error) {
    throw ApiError.internal("Failed to fetch news");
  }
}

export async function getNewsById(id: number) {
  if (!id || isNaN(id) || id <= 0) {
    throw ApiError.badRequest("Invalid news id");
  }
  try {
    const news = await prisma.news.findUnique({
      where: { id },
    });
    if (!news) {
      throw ApiError.notFound(`News with ID ${id} not found`);
    }
    return news;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // console.error("Database error in getNewsById:", error);
    throw ApiError.internal("Failed to fetch news");
  }
}

export async function createNews(news: News){
    if (!news.title) {
        throw ApiError.badRequest("Title is required");
    }
    try{
        const newNews = await prisma.news.create({
            data: news,
        });
        return newNews;
    }
    catch(error){
        throw ApiError.internal("Failed to create news");
    }
}

export async function updateNews(id: number, news: Partial<News>){
    if (!id || isNaN(id) || id <= 0) {
        throw ApiError.badRequest("Invalid news id");
    }
    try{
        const updatedNews = await prisma.news.update({
            where: { id },
            data: news,
        });
        return updatedNews;
    }
    catch(error){
        if (error instanceof ApiError) {
            throw error;
        }
        // console.error("Database error in updateNews:", error);
        throw ApiError.internal("Failed to update news");
    }
}

export async function deleteNews(id: number){
    if (!id || isNaN(id) || id <= 0) {
        throw ApiError.badRequest("Invalid news id");
    }
    try{
        const deletedNews = await prisma.news.delete({
            where: { id },
        });
        return {message: "News deleted successfully"}
    }
    catch(error){
        if (error instanceof ApiError) {
            throw error;
        }
        // console.error("Database error in deleteNews:", error);
        throw ApiError.internal("Failed to delete news");
    }
}

export async function incrementNewsLikes(id: number, delta: number) {
  if (!id || isNaN(id) || id <= 0) {
    throw ApiError.badRequest("Invalid news id");
  }
  if (!Number.isInteger(delta)) {
    throw ApiError.badRequest("Delta must be an integer");
  }

  try {
    // Check if news exists and get current likes
    const news = await prisma.news.findUnique({
      where: { id },
      select: { id: true, likes: true },
    });

    if (!news) {
      throw ApiError.notFound(`News with ID ${id} not found`);
    }

    // Calculate new likes value (ensure it doesn't go below 0)
    const newLikes = Math.max(0, news.likes + delta);

    // Use updateMany to avoid triggering updatedAt
    // updateMany doesn't update the @updatedAt field automatically
    await prisma.news.updateMany({
      where: { id },
      data: { likes: newLikes },
    });

    // Fetch and return the updated news
    const result = await prisma.news.findUnique({
      where: { id },
    });

    if (!result) {
      throw ApiError.notFound(`News with ID ${id} not found after update`);
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.internal("Failed to update likes");
  }
}