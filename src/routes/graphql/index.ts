import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql';
import { MemberTypeGQL, MemberTypeIdEnumGQL } from './types/member.js';
import { memberByIdResolve, memberResolve } from './_resolvers/member.js';
import {
  changePostResolve,
  createPostResolve,
  deletePostResolve,
  postByIdResolve,
  postsResolve,
} from './_resolvers/post.js';
import { CreatePostInputGQL, PostChangeInputGQL, PostGQL } from './types/post.js';
import { UUIDType } from './types/uuid.js';
import {
  changeProfileResolve,
  createProfileResolve,
  deleteProfileResolve,
  profileByIdResolve,
  profilesResolve,
} from './_resolvers/profile.js';
import {
  ProfileChangeInputGQL,
  ProfileInputGQL,
  ProfileTypeGQL,
} from './types/profile.js';
import {
  changeUserResolve,
  createUserResolve,
  deleteUserResolve,
  userByIdResolve,
  usersResolve,
} from './_resolvers/user.js';
import { UserChangeInputGQL, UserInputGQL, UserTypeGQL } from './types/user.js';

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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // post
    createPost: {
      type: PostGQL,
      args: { dto: { type: new GraphQLNonNull(CreatePostInputGQL) } },
      resolve: createPostResolve,
    },
    changePost: {
      type: PostGQL,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(PostChangeInputGQL) },
      },
      resolve: changePostResolve,
    },
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: deletePostResolve,
    },
    // profile
    createProfile: {
      type: ProfileTypeGQL,
      args: { dto: { type: new GraphQLNonNull(ProfileInputGQL) } },
      resolve: createProfileResolve,
    },
    changeProfile: {
      type: ProfileTypeGQL,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ProfileChangeInputGQL) },
      },
      resolve: changeProfileResolve,
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: deleteProfileResolve,
    },
    // user
    createUser: {
      type: UserTypeGQL,
      args: { dto: { type: new GraphQLNonNull(UserInputGQL) } },
      resolve: createUserResolve,
    },
    changeUser: {
      type: UserTypeGQL,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(UserChangeInputGQL) },
      },
      resolve: changeUserResolve,
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: deleteUserResolve,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default plugin;
