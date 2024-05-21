import { Card, CardHeader, CardTitle, CardContent } from "@/components/atom/card.js";
import { useFilesQuery, type File } from "@/hooks/generated-graphql-hooks.js";
import { useGlobalStore } from "@/store/global-store.js";
import { cn } from "@/utils/cn.js";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, type ReactElement } from "react";
import { z } from "zod";

export const Route = createFileRoute("/explore/")({
  component: MediaList,
  validateSearch: z.object({ q: z.string().catch("") }).parse,
  errorComponent: MediaListError
});

export function MediaList(): ReactElement {
  const { data, refetch } = useFilesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data) {
    return <>Loading...</>;
  }

  return <MediaListView images={data.files} />;
}

type MediaListViewProps = {
  images: File[];
  imageFit?: "object-cover" | "object-contain";
};

export function MediaListView({ images }: MediaListViewProps): JSX.Element {
  const q = Route.useSearch({ select: (search) => search.q });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest</CardTitle>
        {q && <p>Showing results for "{q}".</p>}
      </CardHeader>
      <CardContent>
        <ul className="flex items-center gap-2 flex-wrap">
          {images.map((image) => (
            <li key={image.id} className="size-48">
              <Link to={"/explore/single"} search={{ q, id: image.id }}>
                <ImageTile image={image} />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
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

function MediaListError(): ReactElement {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Oh no!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>There was a problem loading this page.</p>
        <Link to="/explore">Go back?</Link>
      </CardContent>
    </Card>
  );
}
