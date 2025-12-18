import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";

export async function getAllGroups() {
  try {
    return await prisma.group.findMany({
      orderBy: { name: "asc" },
      include: {
        teacher: { select: { name: true } },
        _count: { select: { students: true } }
      }
    });
  } catch (error) {
    throw ApiError.internal("Failed to fetch groups");
  }
}

export async function createGroup(data: any) {
  try {
    return await prisma.group.create({ data });
  } catch (error) {
    throw ApiError.internal("Failed to create group");
  }
}

export async function updateGroup(id: number, data: any) {
  try {
    return await prisma.group.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw ApiError.internal("Failed to update group");
  }
}

export async function deleteGroup(id: number) {
  try {
    await prisma.group.delete({ where: { id } });
  } catch (error) {
    throw ApiError.internal("Failed to delete group");
  }
}
