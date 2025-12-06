import { PrismaClient } from '@prisma/generated/client';

// Extend the global object to include PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
const prisma: PrismaClient = global.prisma;

export { prisma };
    