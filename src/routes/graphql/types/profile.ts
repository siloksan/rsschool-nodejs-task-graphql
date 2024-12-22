import { GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeIdEnumGQL } from './member.js';

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
    memberTypeId: { type: MemberTypeIdEnumGQL },
    userId: { type: UUIDType },
  },
});
