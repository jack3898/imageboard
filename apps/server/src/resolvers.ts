import { images } from "./temp-data.js";

// TODO: Use typegen
export const resolvers = {
  Query: {
    images: (): typeof images => images,
  },
};
