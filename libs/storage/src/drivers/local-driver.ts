import { type FileType } from "../types/file";
import { type StorageDriver } from "../types/storage-driver";
import fs from "node:fs/promises";
import path from "node:path";
import { blobToWebReadable } from "../utils/blobToWebReadable";
import { webReadableToNodeReadable } from "../utils/webReadableToNodeReadable";

/**
 * The local driver is for filesystem-only operations. Great for testing.
 */
export class LocalDriver implements StorageDriver {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async upload(file: FileType): Promise<void> {
    const readableStream = file.data instanceof Blob ? blobToWebReadable(file.data) : file.data;
    const nodeReadable = webReadableToNodeReadable(readableStream);
    const fullPath = path.resolve(this.basePath, file.name);

    return fs.writeFile(fullPath, nodeReadable);
  }
}
