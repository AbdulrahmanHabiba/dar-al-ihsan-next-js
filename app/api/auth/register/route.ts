import { handleApi } from "@/lib/api/handler";
import { registerUser, RegisterData } from "@/services/auth.service";
import { NextRequest } from "next/server";
import { ApiError } from "@/lib/api/error";

export const POST = handleApi(async (req: NextRequest) => {
  const body: RegisterData = await req.json();
  
  // Validation
  if (!body.username || !body.password || !body.name) {
    throw ApiError.badRequest("يرجى تعبئة جميع البيانات (الاسم، اسم المستخدم، كلمة المرور)");
  }

  return await registerUser(body);
});