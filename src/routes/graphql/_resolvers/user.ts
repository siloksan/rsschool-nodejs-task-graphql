import { User } from '@prisma/client';
import { ContextPrisma } from '../types/common.js';

export async function usersResolve(
  _: unknown,
  __: unknown,
  { prisma }: ContextPrisma,
): Promise<User[]> {
  return prisma.user.findMany();
}

export async function userByIdResolve(
  _: unknown,
  { id }: { id: string },
  { prisma }: ContextPrisma,
) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function createUserResolve(
  _: unknown,
  { dto }: { dto: Omit<User, 'id'> },
  { prisma }: ContextPrisma,
) {
  return prisma.user.create({
    data: dto,
  });
}

export async function changeUserResolve(
  _: unknown,
  { dto, id }: { id: string; dto: Omit<User, 'id'> },
  { prisma }: ContextPrisma,
) {
  return prisma.user.update({
    where: { id },
    data: dto,
  });
}

export async function deleteUserResolve(
  _: unknown,
  { id }: { id: string },
  { prisma }: ContextPrisma,
) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}
