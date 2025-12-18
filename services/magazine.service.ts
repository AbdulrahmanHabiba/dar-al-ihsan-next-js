import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";

export async function getAllMagazineItems() {
  try {
    return await prisma.magazine.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw ApiError.internal("Failed to fetch magazine items");
  }
}

export async function createMagazineItem(data: any) {
  try {
    return await prisma.magazine.create({ data });
  } catch (error) {
    throw ApiError.internal("Failed to create magazine item");
  }
}

export async function updateMagazineItem(id: number, data: any) {
  try {
    return await prisma.magazine.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw ApiError.internal("Failed to update magazine item");
  }
}

export async function deleteMagazineItem(id: number) {
  try {
    await prisma.magazine.delete({ where: { id } });
  } catch (error) {
    throw ApiError.internal("Failed to delete magazine item");
  }
}

