# Storage

This package provides access to storage drivers, which provide choice on where files are created, read, updated and deleted.

Here is an example:

```ts
import { File, LocalDriver } from "@internal/storage";

const file = new File({
  data: new Blob(["hello"]), // Or a ReadableStream
  mimeType: "text/plain",
  name: "test.txt",
});

const driver = new LocalDriver("C:/Users/Jack/Downloads");

await driver.upload(file);
```

The above example uses the local driver, which is simple filesystem only storage.

I know we do not technically "upload" when writing files to disk, but this is meant to be used primarily for cloud-based solutions so the lingo will lean in that direction.

## Focus on web-standard APIs

If you've done enough Node.js, you will notice the explicit choice to use a `Blob` over a `Buffer` and `ReadableStreams` over `Readables`. This is because as a principle I want to use web-standard APIs over Node.js proprietary ones.

This does make coding things a little trickier but it allows these drivers to be ported to different JS runtimes.

## Drivers and upcoming drivers:

- Local
- S3
- Azure blob storage (maybe)

## Still WIP

This package is still a WIP, new drivers are to come and existing are probably going to change.
