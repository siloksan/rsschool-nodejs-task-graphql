import { User } from '@prisma/client';
import { ContextPrisma } from '../types/common.js';
import { GraphQLResolveInfo } from 'graphql';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { UserTypeGQL } from '../types/user.js';

export async function usersResolve(
  _: unknown,
  __: unknown,
  { prisma, loaders }: ContextPrisma,
  info: GraphQLResolveInfo,
): Promise<User[]> {
  const parsedInfo = parseResolveInfo(info) as ResolveTree;

  const { fields } = simplifyParsedResolveInfoFragmentWithType(parsedInfo, UserTypeGQL);

  const includeUserSubscribedTo = 'userSubscribedTo' in fields;
  const includeSubscribedToUser = 'subscribedToUser' in fields;

  const users = await prisma.user.findMany({
    include: {
      userSubscribedTo: includeUserSubscribedTo,
      subscribedToUser: includeSubscribedToUser,
    },
  });

  const usersMap = new Map<string, User>();

  users.forEach((user) => usersMap.set(user.id, user));

  users.forEach((user) => {
    if (includeUserSubscribedTo) {
      const userSubscriptions = user.userSubscribedTo.map((subscription) =>
        usersMap.get(subscription.authorId),
      ) as User[];

      loaders.userSubscribedToLoader.prime(user.id, userSubscriptions);
    }

    if (includeSubscribedToUser) {
      const subscribers = user.subscribedToUser.map((subscriber) =>
        usersMap.get(subscriber.subscriberId),
      ) as User[];

      loaders.subscribedToUserByIdLoader.prime(user.id, subscribers);
    }
  });

  return users;
}

export async function userByIdResolve(
  _: unknown,
  { id }: { id: string },
  { loaders }: ContextPrisma,
) {
  return await loaders.userByIdLoader.load(id);
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
