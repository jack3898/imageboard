import { type Readable } from "node:stream";

export function nodeReadableToWebReadable(nodeReadable: Readable): ReadableStream {
  return new ReadableStream({
    start(controller): void {
      nodeReadable.on("data", (chunk) => {
        controller.enqueue(chunk);
      });

      nodeReadable.on("end", () => {
        controller.close();
      });

      nodeReadable.on("error", (err) => {
        controller.error(err);
      });
    },

    cancel(): void {
      nodeReadable.destroy();
    }
  });
}
