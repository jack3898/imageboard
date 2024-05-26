import { Card, CardContent, CardHeader, CardTitle } from "@/components/atom/card.js";
import { UploadFileForm } from "@/components/common/upload-item-form.js";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createFileRoute("/upload/")({
  component: UploadFile,
  errorComponent: UploadFileError,
  beforeLoad({ context }) {
    if (!context?.user?.id) {
      throw redirect({ to: "/account/login" });
    }
  }
});

function UploadFile(): ReactElement {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Uploading is really simple. Fill out the form below, and you're on your way!
        </p>
        <Card className="p-4 max-w-xl">
          <UploadFileForm />
        </Card>
      </CardContent>
    </Card>
  );
}

function UploadFileError(): ReactElement {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Oh no!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>There was a problem loading this form.</p>
        <Link to=".." className="underline">
          Go back?
        </Link>
      </CardContent>
    </Card>
  );
}
