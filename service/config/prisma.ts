import { PrismaClient } from '@prisma/generated/client';

// Extend the global object to include PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

export { prisma };
    