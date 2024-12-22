import { GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeGQL } from './member.js';
import { ContextPrisma } from './common.js';

const ProfileType = {
  isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  memberTypeId: { type: new GraphQLNonNull(UUIDType) },
};

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
