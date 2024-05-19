export interface FileType {
  mimeType: string;
  name: string;
  data: ReadableStream | Blob;
}
