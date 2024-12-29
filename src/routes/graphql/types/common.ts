import { PrismaClient } from '@prisma/client';
import { createLoaders } from '../loader/loader.js';

export interface ContextPrisma {
  prisma: PrismaClient;
  loaders: ReturnType<typeof createLoaders>;
}
