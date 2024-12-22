import { Profile } from '@prisma/client';
import { ContextPrisma } from '../types/common.js';
import { isUUID } from '../types/uuid.js';

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
  if (!isUUID(id)) {
    throw new Error(`Invalid PostId`);
  }

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });

  if (profile === null) {
    throw new Error(`Post type don't found.`);
  }

  return profile;
}
