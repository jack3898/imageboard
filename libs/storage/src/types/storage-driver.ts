import { type FileType } from "./file";

// More methods are to come

export interface StorageDriver {
  upload(file: FileType): Promise<void>;
  // download
  // delete
  // ..more
}
