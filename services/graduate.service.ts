import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";

export async function getAllGraduates() {
  try {
    return await prisma.graduate.findMany({
      orderBy: { graduationYear: "desc" },
    });
  } catch (error) {
    throw ApiError.internal("Failed to fetch graduates");
  }
}

export async function createGraduate(data: any) {
  try {
    return await prisma.graduate.create({ data });
  } catch (error) {
    throw ApiError.internal("Failed to create graduate");
  }
}

export async function updateGraduate(id: number, data: any) {
  try {
    return await prisma.graduate.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw ApiError.internal("Failed to update graduate");
  }
}

export async function deleteGraduate(id: number) {
  try {
    await prisma.graduate.delete({ where: { id } });
  } catch (error) {
    throw ApiError.internal("Failed to delete graduate");
  }
}


