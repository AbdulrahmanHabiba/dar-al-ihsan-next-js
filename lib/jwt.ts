import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("Please provide a JWT_SECRET environment variable");
}

const key = new TextEncoder().encode(SECRET_KEY);

export async function signToken(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key);
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}
