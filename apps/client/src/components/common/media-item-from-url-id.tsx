import { Quality, usePostSuspenseQuery } from "@/hooks/generated-graphql-hooks.js";
import { useUrlPostId } from "@/hooks/url-params.js";
import { type ReactElement } from "react";

export function MediaItemFromUrlId(): ReactElement {
  const postId = useUrlPostId();
  const file = usePostSuspenseQuery({ variables: { postId } });
  const image = file.data.post;

  if (!["png", "jpeg"].includes(image?.file?.type ?? "")) {
    console.warn("Attempted to load a file that is not an image.");

    return <></>;
  }

  const rawImage = image?.file?.variants?.find((file) => file.quality === Quality.Raw);

  return (
    <img
      src={`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/file/${rawImage?.id}/raw`}
      alt={image?.file?.alt}
      width={rawImage?.width}
      height={rawImage?.height}
      className="max-h-[70vh] w-auto"
      onClick={(e) => e.currentTarget.requestFullscreen()}
    />
  );
}
