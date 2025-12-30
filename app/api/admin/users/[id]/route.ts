import { handleApi } from "@/lib/api/handler";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import { ApiError } from "@/lib/api/error";

export const PATCH = handleApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id: rawId } = await params;
  const id = parseInt(rawId);
  const body = await req.json();

  const user = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      role: body.role,
      isActive: body.isActive,
    },
  });

  return user;
});

export const DELETE = handleApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id: rawId } = await params;
  const id = parseInt(rawId);

  await prisma.user.delete({
    where: { id },
  });

  return { message: "User deleted successfully" };
});

export const GET = handleApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id: rawId } = await params;
  const id = parseInt(rawId);

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      student: true,
      teacher: true,
      supervisor: true,
    }
  });

  if (!user) throw ApiError.notFound("User not found");

  return user;
});
