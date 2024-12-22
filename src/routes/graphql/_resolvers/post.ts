import { Post } from '@prisma/client';
import { ContextPrisma } from '../types/common.js';
import { isUUID } from '../types/uuid.js';

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
  { prisma }: ContextPrisma,
) {
  if (!isUUID(id)) {
    throw new Error(`Invalid PostId`);
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (post === null) {
    throw new Error(`Post type don't found.`);
  }

  return post;
}

// export async function createPostResolve(
//   _: unknown,
//   args: Omit<Post, 'id'>,
//   { prisma }: ContextPrisma,
// ) {
//   return prisma.post.create({
//     data: args,
//   });
// }
