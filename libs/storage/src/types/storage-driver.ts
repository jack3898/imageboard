import { type FileType } from "./file.js";

// More methods are to come

export interface StorageDriver {
  upload(file: FileType): Promise<void>;
  download(path: string): Promise<ReadableStream>;
}
