import { Card, CardHeader, CardTitle, CardContent } from "@/components/atom/card.js";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, type ReactElement } from "react";
import { z } from "zod";
import { MediaList } from "@/components/common/media-list.js";
import { useUrlQ } from "@/hooks/url-params.js";

export const Route = createFileRoute("/explore/")({
  component: MediaListWrapper,
  validateSearch: z.object({ q: z.string().catch("") }).parse,
  errorComponent: MediaListError
});

export function MediaListWrapper(): JSX.Element {
  const search = useUrlQ();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{search ? `Showing results for "${search}"` : "Latest"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<p>Please wait...</p>}>
          <MediaList />
        </Suspense>
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
      </CardContent>
    </Card>
  );
}
