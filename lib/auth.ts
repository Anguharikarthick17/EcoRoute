import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "ecoroute_gov_india_super_secret_jwt_key_2026_cpcb_moefcc";
const TOKEN_NAME = "ecoroute_token";

export interface JWTPayload {
  userId: string;
  email: string;
  role: "CITIZEN" | "RECYCLER" | "OFFICER" | "ADMIN";
  citizenId?: string;
  name?: string;
}

/**
 * Hash password using bcryptjs.
 * 
 * Security Rationale:
 * 10 salt rounds are intentionally selected to comply with OWASP password storage
 * guidelines while avoiding CPU thread starvation in asynchronous Node.js event loops.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare raw password with hashed password using constant-time comparison
 * to eliminate timing-attack side-channel vulnerabilities.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Sign a JWT token (Valid for 1 Hour).
 * 
 * Security Rationale:
 * Short-lived 1-hour session tokens minimize the window of vulnerability if a device
 * is shared or unattended. Key authorization claims (role, citizenId, userId) are embedded
 * in the payload to allow stateless middleware authorization without redundant database lookups.
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Extract token from HTTP headers or Cookie store
 */
export async function getAuthSession(): Promise<JWTPayload | null> {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;

    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Set HTTP-only Auth Cookie (1 Hour expiration)
 */
export async function setAuthCookie(token: string) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600, // 1 Hour (3600 seconds)
    path: "/",
  });
}

/**
 * Clear Auth Cookie
 */
export async function clearAuthCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

