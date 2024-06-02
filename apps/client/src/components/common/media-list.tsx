import {
  type PostsQuery,
  usePostsSuspenseQuery,
  Quality
} from "@/hooks/generated-graphql-hooks.js";
import { useUrlQ } from "@/hooks/urlParams.js";
import { useGlobalStore } from "@/store/global-store.js";
import { cn } from "@/utils/cn.js";
import { Link } from "@tanstack/react-router";
import { type ReactElement } from "react";

type File = PostsQuery["posts"][number];

export function MediaList(): JSX.Element {
  const q = useUrlQ();
  const { data } = usePostsSuspenseQuery({ variables: { filter: q } });

  if (!data.posts.length) {
    return <NoMediaFound />;
  }

  return (
    <ul className="flex items-center gap-2 flex-wrap">
      {data.posts
        .filter((post) => ["png", "jpeg"].includes(post.file?.type ?? ""))
        .map((image) => (
          <li key={image.id} className="size-48">
            <Link to={"/explore/single"} search={(cur) => ({ q: "", ...cur, id: image.id })}>
              <MediaTile mediaItem={image} />
            </Link>
          </li>
        ))}
    </ul>
  );
}

function NoMediaFound(): JSX.Element {
  return <p>We searched far and wide, but nothing. 😣</p>;
}

function MediaTile({ mediaItem }: { mediaItem: File }): ReactElement {
  const imageFit = useGlobalStore((store) =>
    store.thumbnailFit === "cover" ? "object-cover" : "object-contain"
  );

  const rawVariant = mediaItem.file?.variants?.find((variant) => variant.quality === Quality.Raw);

  return (
    <img
      src={`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/file/${rawVariant?.id}/raw`}
      className={cn("size-full object-cover border", imageFit)}
    />
  );
}
