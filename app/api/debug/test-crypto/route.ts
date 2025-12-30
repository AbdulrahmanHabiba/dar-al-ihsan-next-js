import { hashPassword, verifyPassword } from "@/lib/security";
import { NextResponse } from "next/server";

export async function GET() {
  const testPass = "abdo1234";
  
  try {
    const hash = await hashPassword(testPass);
    const isValid = await verifyPassword(testPass, hash);
    const isInvalid = await verifyPassword("wrong_pass", hash);

    return NextResponse.json({
      success: true,
      test: {
        password: testPass,
        generatedHash: hash,
        verificationResult: isValid,
        shouldBeFalse: isInvalid
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
