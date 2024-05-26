import { getUser } from "./resolvers/query/get-logged-in-user.js";
import { getFiles } from "./resolvers/query/get-files.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    files: getFiles,
    loggedInUser: getUser
  }
};
