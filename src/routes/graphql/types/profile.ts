import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeGQL, MemberTypeIdEnumGQL } from './member.js';
import { ContextPrisma } from './common.js';

export const ProfileTypeGQL = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberType: {
      type: MemberTypeGQL,
      resolve: async (
        parent: {
          memberTypeId: string;
        },
        _,
        { prisma }: ContextPrisma,
      ) => {
        const memberType = await prisma.memberType.findUnique({
          where: {
            id: parent.memberTypeId,
          },
        });

        return memberType;
      },
    },
  },
});

export const ProfileInputGQL = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnumGQL) },
  },
});

export const ProfileChangeInputGQL = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnumGQL },
  },
});
