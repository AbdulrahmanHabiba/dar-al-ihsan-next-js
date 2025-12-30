import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/api/error";
import { Role } from "@prisma/client";

async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

async function updateUserRole(userId: number, role: Role) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  } catch (error) {
    throw ApiError.internal("Failed to update user role");
  }
}

async function toggleUserStatus(userId: number, isActive: boolean) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });
  } catch (error) {
    throw ApiError.internal("Failed to update user status");
  }
}

async function deleteUser(userId: number) {
  try {
    return await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    throw ApiError.internal("Failed to delete user");
  }
}

export {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
};
