import { Button } from "@/components/atom/button.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atom/card.js";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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
  const id = Route.useSearch({ select: (search) => search.id });
  const q = Route.useSearch({ select: (search) => search.q });
  const navigate = useNavigate();

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Image ({id})</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          size="icon"
          className="mb-2"
          onClick={() =>
            navigate({
              to: "..",
              search: { q, id }
            })
          }
        >
          <ArrowLeft />
        </Button>
        <img
          src={`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/file/${id}`}
          alt="tbc"
          className="w-full"
        ></img>
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
        <Link to=".." className="underline">
          Go back?
        </Link>
      </CardContent>
    </Card>
  );
}
