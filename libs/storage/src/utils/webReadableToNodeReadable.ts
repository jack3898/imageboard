import { Readable } from "stream";

export function webReadableToNodeReadable(readableStream: ReadableStream): Readable {
  const reader = readableStream.getReader();

  return new Readable({
    async read(): Promise<void> {
      const { done, value } = await reader.read();

      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    }
  });
}
