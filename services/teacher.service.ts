import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";
import { Teacher } from "@prisma/client";

export async function getAllTeachers() {
  try {
    return await prisma.teacher.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { students: true, groups: true }
        }
      }
    });
  } catch (error) {
    throw ApiError.internal("Failed to fetch teachers");
  }
}

export async function createTeacher(data: any) {
  try {
    return await prisma.teacher.create({ data });
  } catch (error) {
    throw ApiError.internal("Failed to create teacher");
  }
}

export async function updateTeacher(id: number, data: any) {
  try {
    return await prisma.teacher.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw ApiError.internal("Failed to update teacher");
  }
}

export async function deleteTeacher(id: number) {
  try {
    await prisma.teacher.delete({ where: { id } });
  } catch (error) {
    throw ApiError.internal("Failed to delete teacher");
  }
}
