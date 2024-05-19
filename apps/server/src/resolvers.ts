import { getUsers } from "./resolvers/query/get-users.js";
import { getImages } from "./resolvers/query/get-images.js";
import { type Resolvers } from "./types/generated-graphql-types.js";

export const resolvers: Resolvers = {
  Query: {
    images: () => getImages(),
    users: () => getUsers(),
  },
};
