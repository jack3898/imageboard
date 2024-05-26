import { useSearch } from "@tanstack/react-router";
import { type ReactElement } from "react";

export function MediaItemFromUrlId(): ReactElement {
  const fileId = useSearch({
    strict: false,
    select: (search) => ("id" in search ? search.id : "")
  });

  return (
    <img
      src={`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/file/${fileId}`}
      alt=""
      className="w-full"
    />
  );
}
