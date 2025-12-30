import { handleApi } from "@/lib/api/handler";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import { Role } from "@prisma/client";

export const GET = handleApi(async (req: NextRequest) => {
  const supervisors = await prisma.user.findMany({
    where: {
      role: {
        in: [Role.ADMIN, Role.SUPER_ADMIN]
      }
    },
    include: {
        supervisor: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return supervisors;
});
