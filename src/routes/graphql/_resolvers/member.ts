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
