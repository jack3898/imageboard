export function mimeToFiletype(mime: string): "jpeg" | "png" | undefined {
  switch (mime) {
    case "image/jpeg":
      return "jpeg";
    case "image/png":
      return "png";
    default:
      return undefined;
  }
}
