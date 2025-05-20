import { Post, PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

function createMemberTypeByIdLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const members = await prisma.memberType.findMany({
      where: { id: { in: [...keys] } },
    });

    return keys.map((id) => members.find((member) => member.id === id));
  });
}

function createProfileByIdLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: [...keys] } },
    });

    return keys.map((id) => profiles.find((profile) => profile.id === id));
  });
}

function createProfileByUserIdLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: [...keys] } },
    });

    return keys.map((id) => profiles.find((profile) => profile.userId === id));
  });
}

function createPostByIdLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { id: { in: [...keys] } },
    });

    return keys.map((id) => posts.find((post) => post.id === id));
  });
}

function createPostByAuthorIdIdLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...keys] } },
    });

    const authorMap = new Map<string, Post[]>();

    posts.forEach((post) => {
      const authorPosts = authorMap.get(post.authorId);

      if (authorPosts) {
        authorPosts.push(post);
      } else {
        authorMap.set(post.authorId, [post]);
      }
    });

    return keys.map((id) => authorMap.get(id) || []);
  });
}

function createUserByIdLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...keys] } },
    });

    return keys.map((id) => users.find((user) => user.id === id));
  });
}

function createUserSubscribedToLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const userSubscribed = await prisma.user.findMany({
      where: { id: { in: [...keys] } },
      include: { userSubscribedTo: { select: { author: true } } },
    });

    const authorsMap = new Map<string, User[]>();

    userSubscribed.forEach((user) => {
      const authors = user.userSubscribedTo.map(({ author }) => author);
      authorsMap.set(user.id, authors);
    });

    return keys.map((id) => authorsMap.get(id) || []);
  });
}

function createSubscribedToUserByIdLoader(prisma: PrismaClient) {
  return new DataLoader(async (keys: readonly string[]) => {
    const userWithSubscribers = await prisma.user.findMany({
      where: { id: { in: [...keys] } },
      include: { subscribedToUser: { select: { subscriber: true } } },
    });

    const subscribersMap = new Map<string, User[]>();

    userWithSubscribers.forEach((user) => {
      const subscribers = user.subscribedToUser.map(({ subscriber }) => subscriber);
      subscribersMap.set(user.id, subscribers);
    });

    return keys.map((id) => subscribersMap.get(id) || []);
  });
}

export function createLoaders(prisma: PrismaClient) {
  return {
    memberTypeByIdLoader: createMemberTypeByIdLoader(prisma),
    profileByIdLoader: createProfileByIdLoader(prisma),
    profileByUserIdLoader: createProfileByUserIdLoader(prisma),
    postByIdLoader: createPostByIdLoader(prisma),
    postByAuthorIdLoader: createPostByAuthorIdIdLoader(prisma),
    userByIdLoader: createUserByIdLoader(prisma),
    userSubscribedToLoader: createUserSubscribedToLoader(prisma),
    subscribedToUserByIdLoader: createSubscribedToUserByIdLoader(prisma),
  };
}
