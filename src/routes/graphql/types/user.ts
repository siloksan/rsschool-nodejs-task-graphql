import {
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
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
      resolve: async ({ id }: { id: string }, _, { loaders }: ContextPrisma) => {
        console.log('id: ', id);
        return await loaders.profileByUserIdLoader.load(id);
      },
    },
    posts: {
      type: new GraphQLList(PostGQL),
      resolve: async ({ id }: { id: string }, _, { loaders }: ContextPrisma) => {
        return await loaders.postByAuthorIdLoader.load(id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserTypeGQL),
      resolve: async ({ id }: { id: string }, _, { loaders }: ContextPrisma) => {
        return loaders.userSubscribedToLoader.load(id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserTypeGQL),
      resolve: async ({ id }: { id: string }, _, { loaders }: ContextPrisma) => {
        return loaders.subscribedToUserByIdLoader.load(id);
      },
    },
  }),
});

export const UserInputGQL = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const UserChangeInputGQL = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
