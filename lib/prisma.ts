import { PrismaClient } from "@prisma/client";

// Global declaration to prevent multiple Prisma Client instances during Next.js Hot Reload
const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

export const prisma =
  globalForPrisma.prisma ??
  new (PrismaClient as any)();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
