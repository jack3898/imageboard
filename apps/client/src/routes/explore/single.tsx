import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/atom/card.js";
import { MediaItemFromUrlId } from "@/components/common/media-item-from-url-id.js";
import {
  PostDescription,
  PostTitle,
  PostUploadDate,
  PostUploader
} from "@/components/common/post.js";
import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
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
        <CardTitle>
          <PostTitle />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MediaItemFromUrlId />
        <hr className="my-4" />
        <Quote className="-scale-x-100" />
        <PostDescription />
        <div className="flex justify-end">
          <Quote />
        </div>
      </CardContent>
      <CardFooter>
        <p>
          <small>
            Uploaded by <PostUploader />, <PostUploadDate />
          </small>
        </p>
      </CardFooter>
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
