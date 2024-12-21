import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';
import { MemberTypeGQL } from './types/member.js';
import { memberByIdResolve, memberResolve } from './_resolvers/member.js';

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
    test: {
      type: GraphQLString,
      resolve: async () => 'Hello GraphQl, I"m John!',
    },
    memberTypes: {
      type: new GraphQLList(MemberTypeGQL),
      resolve: memberResolve,
    },
    memberType: {
      type: MemberTypeGQL,
      args: {
        id: { type: GraphQLString },
      },
      resolve: memberByIdResolve,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default plugin;
