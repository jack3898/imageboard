import { NodeLocalDriver, type types } from "@internal/storage";
import { env } from "./env.js";

/**
 * Configures and initializes a storage driver based from environment configuration.
 *
 * For driver-specific features, use type guards or instanceof checks.
 */
function getStorageDriver(): types.StorageDriver {
  switch (env.STORAGE_DRIVER) {
    case "node_local":
      return new NodeLocalDriver(env.STORAGE_BASE_PATH);
    default:
      throw Error(`${env.STORAGE_DRIVER} is not yet implemented!`);
  }
}

/**
 * Driver destination changes on environment configuration.
 */
export const abstractStorageDriver = getStorageDriver();
