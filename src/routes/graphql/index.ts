import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';
import { MemberTypeGQL, MemberTypeIdEnumGQL } from './types/member.js';
import { memberByIdResolve, memberResolve } from './_resolvers/member.js';
import { postByIdResolve, postsResolve } from './_resolvers/post.js';
import { PostGQL } from './types/post.js';
import { UUIDType } from './types/uuid.js';
import { profileByIdResolve, profilesResolve } from './_resolvers/profile.js';
import { ProfileTypeGQL } from './types/profile.js';
import { userByIdResolve, usersResolve } from './_resolvers/user.js';
import { UserTypeGQL } from './types/user.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma },
      });
    },
  });
};

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    // member-type
    memberTypes: {
      type: new GraphQLList(MemberTypeGQL),
      resolve: memberResolve,
    },
    memberType: {
      type: MemberTypeGQL,
      args: {
        id: { type: MemberTypeIdEnumGQL },
      },
      resolve: memberByIdResolve,
    },

    // post
    posts: {
      type: new GraphQLList(PostGQL),
      resolve: postsResolve,
    },
    post: {
      type: PostGQL,
      args: {
        id: { type: UUIDType },
      },
      resolve: postByIdResolve,
    },

    // profile
    profiles: {
      type: new GraphQLList(ProfileTypeGQL),
      resolve: profilesResolve,
    },
    profile: {
      type: ProfileTypeGQL,
      args: {
        id: { type: UUIDType },
      },
      resolve: profileByIdResolve,
    },

    // user
    users: {
      type: new GraphQLList(UserTypeGQL),
      resolve: usersResolve,
    },
    user: {
      type: UserTypeGQL,
      args: {
        id: { type: UUIDType },
      },
      resolve: userByIdResolve,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default plugin;
