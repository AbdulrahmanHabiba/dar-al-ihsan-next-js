import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";

export async function getAllComplaints() {
  try {
    return await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw ApiError.internal("Failed to fetch complaints");
  }
}

export async function createComplaint(data: any) {
  try {
    return await prisma.complaint.create({ data });
  } catch (error) {
    throw ApiError.internal("Failed to create complaint");
  }
}

export async function markComplaintAsRead(id: number) {
  try {
    return await prisma.complaint.update({
      where: { id },
      data: { isRead: true },
    });
  } catch (error) {
    throw ApiError.internal("Failed to update complaint");
  }
}

export async function deleteComplaint(id: number) {
  try {
    await prisma.complaint.delete({ where: { id } });
  } catch (error) {
    throw ApiError.internal("Failed to delete complaint");
  }
}


