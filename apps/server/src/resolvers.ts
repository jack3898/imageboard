import { getLoggedInUser, getPublicUser } from "./resolvers/query/get-users.js";
import { getFile, getImageFiles, resolveFileType } from "./resolvers/query/get-files.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    files: getImageFiles,
    file: (_, args) => {
      return getFile(args.id);
    },
    loggedInUser: getLoggedInUser,
    publicUser: (_, args) => {
      return getPublicUser(args.id);
    }
  },
  File: {
    __resolveType(type) {
      return resolveFileType(type.kind);
    }
  },
  ImageFile: {
    resolveUser: (parent) => {
      return getPublicUser(parent.user);
    }
  },
  AbstractFile: {
    resolveUser: (parent) => {
      return getPublicUser(parent.user);
    }
  }
};
