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

export async function createProfileResolve(
  _: unknown,
  { dto }: { dto: Omit<Profile, 'id'> },
  { prisma }: ContextPrisma,
) {
  return prisma.profile.create({
    data: dto,
  });
}

export async function changeProfileResolve(
  _: unknown,
  { dto, id }: { id: string; dto: Omit<Profile, 'id' | 'userId'> },
  { prisma }: ContextPrisma,
) {
  return prisma.profile.update({
    where: { id },
    data: dto,
  });
}

export async function deleteProfileResolve(
  _: unknown,
  { id }: { id: string },
  { prisma }: ContextPrisma,
) {
  await prisma.profile.delete({
    where: {
      id: id,
    },
  });
}
