import { useMemo, type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Star } from "lucide-react";
import { useFileQuery } from "@/hooks/generated-graphql-hooks.js";
import { useUrlPostId } from "@/hooks/url-post-id.js";
import ReactMarkdown from "react-markdown";

export function PostTitle(): ReactElement {
  const postId = useUrlPostId();
  const { data } = useFileQuery({ variables: { fileId: postId } });

  return <>{data?.file?.title}</>;
}

export function PostDescription(): ReactElement {
  const postId = useUrlPostId();
  const { data } = useFileQuery({ variables: { fileId: postId } });

  return useMemo(() => {
    if (!data?.file?.description) {
      return <></>;
    }

    return <ReactMarkdown>{data.file.description}</ReactMarkdown>;
  }, [data?.file?.description]);
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
