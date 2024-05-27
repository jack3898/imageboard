import { Card, CardHeader, CardTitle, CardContent } from "@/components/atom/card.js";
import { Link, createFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";
import { z } from "zod";
import { MediaList } from "@/components/common/media-list.js";

export const Route = createFileRoute("/explore/")({
  component: MediaListView,
  validateSearch: z.object({ q: z.string().catch("") }).parse,
  errorComponent: MediaListError
});

export function MediaListView(): JSX.Element {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest</CardTitle>
      </CardHeader>
      <CardContent>
        <MediaList />
      </CardContent>
    </Card>
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
        <Link to="/explore" search={{ q: "" }}>
          Go back?
        </Link>
      </CardContent>
    </Card>
  );
}
