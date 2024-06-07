import { deletePost } from "./resolvers/mutation/mutate-posts.js";
import { getFileByPostId, getFileVariants } from "./resolvers/query/get-files.js";
import { getPost, getPosts } from "./resolvers/query/get-posts.js";
import { getLoggedInUser, getPublicUser } from "./resolvers/query/get-users.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    posts: (_, args, { req }) => getPosts(req.user.userId, args.filter?.toString()),
    post: (_, args, { req }) => getPost(req.user.userId, args.id),
    loggedInUser: getLoggedInUser,
    publicUser: (_, args) => getPublicUser(args.id)
  },
  Mutation: {
    deletePost: (_, { id: postId }, { req }) => deletePost(postId.toString(), req.user.userId)
  },
  Post: {
    author: (parent) => getPublicUser(parent.authorId),
    file: (parent) => getFileByPostId(parent.id)
  },
  File: {
    variants: (parent) => getFileVariants(parent.id)
  }
};
