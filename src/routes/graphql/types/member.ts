import { GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLEnumType } from 'graphql';

const MEMBER_TYPE_ID = ['BASIC', 'BUSINESS'] as const;

export type MemberTypeId = (typeof MEMBER_TYPE_ID)[number];

export const MemberTypeIdEnumGQL = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: Object.assign(
    {},
    ...MEMBER_TYPE_ID.map((item) => ({
      [item]: { value: item },
    })),
  ) as Record<MemberTypeId, { value: MemberTypeId }>,
});

export const MemberTypeGQL = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: MemberTypeIdEnumGQL },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});
