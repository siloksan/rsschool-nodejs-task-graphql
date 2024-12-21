import { MemberType, PrismaClient } from '@prisma/client';
import { MEMBER_TYPE_ID, MemberTypeId } from '../types/member.js';

interface ContextPrisma {
  prisma: PrismaClient;
}

interface ArgsId {
  id: MemberTypeId;
}

export async function memberResolve(
  _: unknown,
  __: unknown,
  { prisma }: ContextPrisma,
): Promise<MemberType[]> {
  return prisma.memberType.findMany();
}

export async function memberByIdResolve(
  _: unknown,
  { id }: ArgsId,
  { prisma }: ContextPrisma,
) {
  if (id in MEMBER_TYPE_ID) {
    throw new Error(`Invalid MemberTypeId: ${id}`);
  }

  const memberType = await prisma.memberType.findUnique({
    where: {
      id,
    },
  });

  if (memberType === null) {
    throw new Error(`Member type don't found.`);
  }

  return memberType;
}
