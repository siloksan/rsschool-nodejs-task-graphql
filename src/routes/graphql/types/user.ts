import {
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInterfaceType,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileTypeGQL } from './profile.js';
import { ContextPrisma } from './common.js';
import { PostGQL } from './post.js';

export const UserTypeGQL: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileTypeGQL,
      resolve: async ({ id }: { id: string }, _, { prisma }: ContextPrisma) => {
        const profile = await prisma.profile.findUnique({
          where: {
            userId: id,
          },
        });

        return profile;
      },
    },
    posts: {
      type: new GraphQLList(PostGQL),
      resolve: async ({ id }: { id: string }, _, { prisma }: ContextPrisma) => {
        return prisma.post.findMany({ where: { authorId: id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserTypeGQL),
      resolve: async (user: { id: string }, _, { prisma }: ContextPrisma) => {
        return prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: user.id,
              },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserTypeGQL),
      resolve: async (user: { id: string }, _, { prisma }: ContextPrisma) => {
        return prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: user.id,
              },
            },
          },
        });
      },
    },
  }),
});
