import { SignJWT, jwtVerify } from "jose";

// Helper function to get the secret key and encode it
function getKey() {
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!SECRET_KEY) {
    throw new Error("Please provide a JWT_SECRET environment variable");
  }
  return new TextEncoder().encode(SECRET_KEY);
}

export async function signToken(payload: any): Promise<string> {
  const key = getKey();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key);
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const key = getKey();
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}
