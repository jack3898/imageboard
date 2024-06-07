import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/atom/card.js";
import { Separator } from "@/components/atom/separator.js";
import { DeletePostButton } from "@/components/common/buttons/delete-post-button.js";
import { MediaItemFromUrlId } from "@/components/common/media-item-from-url-id.js";
import {
  PostDescription,
  PostTitle,
  PostUploadDate,
  PostUploader
} from "@/components/common/post-details-from-url-id.js";
import { useUrlPostId } from "@/hooks/urlParams.js";
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
  const id = useUrlPostId();

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>
          <PostTitle />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MediaItemFromUrlId />
        <Separator className="my-4" />
        <Quote className="-scale-x-100" />
        <PostDescription />
        <div className="flex justify-end">
          <Quote />
        </div>
        <Separator className="my-4" />
        <DeletePostButton postId={id} />
      </CardContent>
      <CardFooter>
        <p>
          <small>
            Uploaded by{" "}
            <strong>
              <PostUploader />
            </strong>
            , <PostUploadDate />
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
