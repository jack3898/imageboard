import { type FileType } from "../types/file.js";
import { type StorageDriver } from "../types/storage-driver.js";
import fs from "node:fs/promises";
import path from "node:path";
import { blobToWebReadable } from "../utils/blobToWebReadable.js";
import { webReadableToNodeReadable } from "../utils/webReadableToNodeReadable.js";
import { createReadStream } from "node:fs";
import { nodeReadableToWebReadable } from "../utils/nodeReadableToWebReadable.js";

/**
 * The local driver is for filesystem-only operations. Great for testing.
 */
export class NodeLocalDriver implements StorageDriver {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async upload(file: FileType): Promise<void> {
    const readableStream = file.data instanceof Blob ? blobToWebReadable(file.data) : file.data;
    const nodeReadable = webReadableToNodeReadable(readableStream);
    const fullPath = path.resolve(this.basePath, file.name);

    await fs.access(this.basePath);

    return fs.writeFile(fullPath, nodeReadable);
  }

  async download(filePath: string): Promise<ReadableStream> {
    const fullPath = path.resolve(this.basePath, filePath);

    await fs.access(fullPath);

    const readable = createReadStream(fullPath);

    return nodeReadableToWebReadable(readable);
  }
}
