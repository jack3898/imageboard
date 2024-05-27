import { Card, CardContent, CardHeader, CardTitle } from "@/components/atom/card.js";
import { MediaItemFromUrlId } from "@/components/common/media-item-from-url-id.js";
import { createFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";
import { z } from "zod";

export const Route = createFileRoute("/explore/single")({
  component: MediaItem,
  validateSearch: z.object({
    id: z.string(),
    q: z.string().catch("")
  }).parse,
  errorComponent: MediaItemError
});

function MediaItem(): ReactElement {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Image</CardTitle>
      </CardHeader>
      <CardContent>
        <MediaItemFromUrlId />
      </CardContent>
    </Card>
  );
}

function MediaItemError(): ReactElement {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Oh no!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>There was a problem loading this page.</p>
      </CardContent>
    </Card>
  );
}
