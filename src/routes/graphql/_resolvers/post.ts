import { Post } from '@prisma/client';
import { ContextPrisma } from '../types/common.js';

export async function postsResolve(
  _: unknown,
  __: unknown,
  { prisma }: ContextPrisma,
): Promise<Post[]> {
  return prisma.post.findMany();
}

export async function postByIdResolve(
  _: unknown,
  { id }: { id: string },
  { loaders }: ContextPrisma,
) {
  const post = await loaders.postByIdLoader.load(id);

  return post;
}

export async function createPostResolve(
  _: unknown,
  { dto }: { dto: Omit<Post, 'id'> },
  { prisma }: ContextPrisma,
) {
  return prisma.post.create({
    data: dto,
  });
}

export async function changePostResolve(
  _: unknown,
  { dto, id }: { id: string; dto: Omit<Post, 'id' | 'authorId'> },
  { prisma }: ContextPrisma,
) {
  return prisma.post.update({
    where: { id },
    data: dto,
  });
}

export async function deletePostResolve(
  _: unknown,
  { id }: { id: string },
  { prisma }: ContextPrisma,
) {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
}
