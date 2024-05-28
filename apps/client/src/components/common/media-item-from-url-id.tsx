import { useSearch } from "@tanstack/react-router";
import { type ReactElement } from "react";

export function MediaItemFromUrlId(): ReactElement {
  const fileId = useSearch({
    strict: false,
    select: (search) => ("id" in search ? search.id : "")
  });

  return (
    <img
      src={`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/file/${fileId}/raw`}
      alt=""
      className="max-h-[70vh] w-auto"
      onClick={(e) => e.currentTarget.requestFullscreen()}
    />
  );
}
