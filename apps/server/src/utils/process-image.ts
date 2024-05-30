import { type Readable } from "node:stream";
import sharp from "sharp";

/**
 * EXIF may contain sensitive geolocation data and camera device information, which may compromise user privacy.
 *
 * EXIF data is embedded within the image.
 */
export function stripExif(file: Readable): Readable {
  return file.pipe(sharp().withExif({}));
}

/**
 * Pass through a file, and asynchronously pulls out the image metadata and pipes to the next readable.
 */
export function getBasicImageMeta(file: Readable): Promise<{
  meta: sharp.Metadata;
  stream: Readable;
}> {
  return new Promise((resolve, reject) => {
    const transformer = file.pipe(sharp());

    transformer
      .metadata()
      .then((meta) => {
        resolve({ meta, stream: transformer });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function enforceMaxWidthAndHeight(file: Readable): Readable {
  // Might be cool in the future to define a db config for the w and h 🤔
  return file.pipe(sharp().resize({ fit: "inside", width: 2000, height: 2000 }));
}
