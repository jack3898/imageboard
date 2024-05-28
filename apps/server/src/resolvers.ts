import { getUser } from "./resolvers/query/get-logged-in-user.js";
import { getImageFile, getImageFiles } from "./resolvers/query/get-files.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    files: getImageFiles,
    file: (_, args) => {
      return getImageFile(args.id);
    },
    loggedInUser: getUser
  }
};
