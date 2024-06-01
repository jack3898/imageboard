import { getFileByPostId, getFileVariants } from "./resolvers/query/get-files.js";
import { getPost, getPosts } from "./resolvers/query/get-posts.js";
import { getLoggedInUser, getPublicUser } from "./resolvers/query/get-users.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    posts: getPosts,
    post: (_, args) => getPost(args.id),
    loggedInUser: getLoggedInUser,
    publicUser: (_, args) => getPublicUser(args.id)
  },
  Post: {
    author: (parent) => getPublicUser(parent.authorId),
    file: (parent) => getFileByPostId(parent.id)
  },
  File: {
    variants: (parent) => getFileVariants(parent.id)
  }
};
