import { getUser } from "./resolvers/query/get-logged-in-user.js";
import { getImageFiles } from "./resolvers/query/get-files.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    files: getImageFiles,
    loggedInUser: getUser
  }
};
