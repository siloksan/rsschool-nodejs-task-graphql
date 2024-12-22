import { PrismaClient } from '@prisma/client';

export interface ContextPrisma {
  prisma: PrismaClient;
}
