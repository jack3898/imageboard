export function blobToWebReadable(blob: Blob): ReadableStream {
  const stream = new ReadableStream({
    start(controller): void {
      const reader = blob.stream().getReader();

      function push(): void {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();

            return;
          }

          controller.enqueue(value);

          push();
        });
      }

      push();
    },
  });

  return stream;
}
