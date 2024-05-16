import { Card, CardContent, CardHeader, CardTitle } from "@/components/atom/card.js";
import { type Image, useImagesQuery } from "@/hooks/generated-graphql-hooks.js";
import { useGlobalStore } from "@/store/global-store.js";
import { cn } from "@/utils/cn.js";
import { type ReactElement } from "react";

export function ImageList(): ReactElement {
  const imageFit = useGlobalStore((store) =>
    store.thumbnailFit === "cover" ? "object-cover" : "object-contain",
  );

  const { data } = useImagesQuery();

  if (!data) {
    return <>Loading...</>;
  }

  return <ImageListView images={data.images} imageFit={imageFit} />;
}

type ImageListViewProps = {
  images: Image[];
  imageFit?: "object-cover" | "object-contain";
};

export function ImageListView({ images, imageFit }: ImageListViewProps): JSX.Element {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex items-center gap-2 flex-wrap">
          {images.map((image) => (
            <li key={image.id} className="size-48">
              <img
                src={image.thumbnailUrl}
                alt={image.alt || "No alternative text specified."}
                className={cn("size-full object-cover border", imageFit)}
              ></img>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
