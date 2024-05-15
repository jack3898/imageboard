import { Card, CardContent, CardHeader, CardTitle } from "@/components/atom/card.js";
import { useGlobalStore } from "@/store/global-store.js";
import { cn } from "@/utils/cn.js";
import { useMemo, type ReactElement } from "react";

type ThumbnailImage = {
  id: number;
  thumbnailUrl: string;
  link: string;
  alt: string;
};

export function ImageList(): ReactElement {
  const imageFit = useGlobalStore((store) =>
    store.thumbnailFit === "cover" ? "object-cover" : "object-contain",
  );

  const images: ThumbnailImage[] = useMemo(() => {
    return [
      {
        id: 1,
        thumbnailUrl: "https://picsum.photos/200/300",
        link: "",
        alt: "",
      },
      {
        id: 2,
        thumbnailUrl: "https://picsum.photos/300/200",
        link: "",
        alt: "",
      },
      {
        id: 3,
        thumbnailUrl: "https://picsum.photos/220/300",
        link: "",
        alt: "",
      },
    ];
  }, []);

  return <ImageListView images={images} imageFit={imageFit} />;
}

type ImageListViewProps = {
  images: ThumbnailImage[];
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
                alt={image.alt}
                className={cn("size-full object-cover border", imageFit)}
              ></img>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
