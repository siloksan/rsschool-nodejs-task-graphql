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
