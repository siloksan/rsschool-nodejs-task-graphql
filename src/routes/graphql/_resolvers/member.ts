import { MemberType } from '@prisma/client';
import { MEMBER_TYPE_ID, MemberTypeId } from '../types/member.js';
import { ContextPrisma } from '../types/common.js';

export async function memberResolve(
  _: unknown,
  __: unknown,
  { prisma }: ContextPrisma,
): Promise<MemberType[]> {
  return prisma.memberType.findMany();
}

export async function memberByIdResolve(
  _: unknown,
  { id }: { id: MemberTypeId },
  { prisma }: ContextPrisma,
) {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id,
    },
  });

  return memberType;
}
