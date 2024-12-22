import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

const Post = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  content: { type: new GraphQLNonNull(GraphQLString) },
  authorId: { type: new GraphQLNonNull(UUIDType) },
};

export const PostGQL = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: UUIDType },
    ...Post,
  },
});

export const PostInputGQL = new GraphQLObjectType({
  name: 'CreatePost',
  fields: {
    ...Post,
  },
});
