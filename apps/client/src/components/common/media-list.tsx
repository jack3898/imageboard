import { useGlobalStore } from "@/store/global-store.js";
import { cn } from "@/utils/cn.js";
import { Link } from "@tanstack/react-router";
import { type ReactElement } from "react";
import { useFilesQuery, type File } from "@/hooks/generated-graphql-hooks.js";

export function MediaList(): JSX.Element {
  const { data } = useFilesQuery();

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <ul className="flex items-center gap-2 flex-wrap">
      {data.files.map((image) => (
        <li key={image.id} className="size-48">
          <Link to={"/explore/single"} search={(cur) => ({ q: "", ...cur, id: image.id })}>
            <ImageTile image={image} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ImageTile({ image }: { image: File }): ReactElement {
  const imageFit = useGlobalStore((store) =>
    store.thumbnailFit === "cover" ? "object-cover" : "object-contain"
  );

  return (
    <img
      src={`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/file/${image.id}`}
      className={cn("size-full object-cover border", imageFit)}
    />
  );
}
