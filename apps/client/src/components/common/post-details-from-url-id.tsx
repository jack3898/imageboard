import { type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Star } from "lucide-react";
import { useFileQuery } from "@/hooks/generated-graphql-hooks.js";
import { useUrlPostId } from "@/hooks/url-post-id.js";

export function PostTitle(): ReactElement {
  const postId = useUrlPostId();
  const { data } = useFileQuery({ variables: { fileId: postId } });

  return <>{data?.file?.title}</>;
}

export function PostDescription(): ReactElement {
  return (
    <>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos fugiat ea maiores!
      Minima nisi aut harum aspernatur soluta voluptatum laudantium, numquam, eum veniam quibusdam
      doloribus. Consequatur architecto excepturi modi expedita.
    </>
  );
}

export function PostFavouriteButton(): ReactElement {
  return (
    <Button size="icon" className="w-6 h-6 p-0">
      <Star />
    </Button>
  );
}

export function PostUploader(): ReactElement {
  const postId = useUrlPostId();
  const { data } = useFileQuery({ variables: { fileId: postId } });

  if (!data?.file?.user) {
    return <></>;
  }

  return <>{data.file.user}</>;
}

export function PostUploadDate(): ReactElement {
  const postId = useUrlPostId();
  const { data } = useFileQuery({ variables: { fileId: postId } });

  if (!data?.file?.createdAt) {
    return <></>;
  }

  return <>{new Date(data.file.createdAt).toLocaleDateString()}</>;
}
