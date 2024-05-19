import { NodeLocalDriver, type types } from "@internal/storage";
import { env } from "./env.js";

function getStorageDriver(): types.StorageDriver {
  switch (env.STORAGE_DRIVER) {
    case "node_local":
      return new NodeLocalDriver(env.STORAGE_BASE_PATH);
    default:
      throw Error(`${env.STORAGE_DRIVER} is not yet implemented!`);
  }
}

export const storageDriver = getStorageDriver();
