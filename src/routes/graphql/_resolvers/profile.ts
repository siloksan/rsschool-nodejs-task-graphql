import { Profile } from '@prisma/client';
import { ContextPrisma } from '../types/common.js';

export async function profilesResolve(
  _: unknown,
  __: unknown,
  { prisma }: ContextPrisma,
): Promise<Profile[]> {
  return prisma.profile.findMany();
}

export async function profileByIdResolve(
  _: unknown,
  { id }: { id: string },
  { prisma }: ContextPrisma,
) {
  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });

  return profile;
}
