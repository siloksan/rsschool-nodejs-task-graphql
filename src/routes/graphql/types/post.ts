import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';

const Post = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  content: { type: new GraphQLNonNull(GraphQLString) },
};

export const PostGQL = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: UUIDType },
    ...Post,
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export const CreatePostInputGQL = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    ...Post,
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export const PostChangeInputGQL = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
