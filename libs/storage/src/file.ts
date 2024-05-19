import { type FileType } from "./types/file";

export class File implements FileType {
  mimeType: string;
  name: string;
  data: ReadableStream | Blob;

  constructor(file: FileType) {
    this.mimeType = file.mimeType;
    this.name = file.name;
    this.data = file.data;
  }
}
