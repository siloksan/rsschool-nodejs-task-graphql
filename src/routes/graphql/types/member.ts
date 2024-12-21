import { GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLEnumType } from 'graphql';

export const MEMBER_TYPE_ID = {
  BASIC: 'BASIC',
  BUSINESS: 'BUSINESS',
} as const;

export type MemberTypeId = keyof typeof MEMBER_TYPE_ID;

export const MemberTypeIdEnumGQL = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: MEMBER_TYPE_ID.BASIC },
    BUSINESS: { value: MEMBER_TYPE_ID.BUSINESS },
  },
});
// Определяем тип MemberType
export const MemberTypeGQL = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: MemberTypeIdEnumGQL },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});
