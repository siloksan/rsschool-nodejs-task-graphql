import { MemberType } from '@prisma/client';
import { MemberTypeId } from '../types/member.js';
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
  { loaders }: ContextPrisma,
) {
  return await loaders.memberTypeByIdLoader.load(id);
}
