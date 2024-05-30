import { ImageQuality, useFileSuspenseQuery } from "@/hooks/generated-graphql-hooks.js";
import { useSearch } from "@tanstack/react-router";
import { type ReactElement } from "react";

export function MediaItemFromUrlId(): ReactElement {
  const fileId = useSearch({
    strict: false,
    select: (search) => ("id" in search ? search.id : "")
  });
  const file = useFileSuspenseQuery({ variables: { fileId } });
  const image = file.data.file?.__typename === "ImageFile" && file.data.file;

  if (!image) {
    console.warn("Attempted to load a file that is not an image.");

    return <></>;
  }

  const rawImage = image.imageVariants.find((img) => img.quality === ImageQuality.Raw);

  return (
    <img
      src={`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/file/${fileId}/raw`}
      alt={image.alt}
      width={rawImage?.width}
      height={rawImage?.height}
      className="max-h-[70vh] w-auto"
      onClick={(e) => e.currentTarget.requestFullscreen()}
    />
  );
}
