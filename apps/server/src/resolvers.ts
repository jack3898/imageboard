import { getUsers } from "./resolvers/query/get-users.js";
import { getFiles } from "./resolvers/query/get-files.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    files: () => getFiles(),
    users: () => getUsers(),
  },
};
