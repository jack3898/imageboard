import { useMemo, type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Star } from "lucide-react";
import { usePostSuspenseQuery } from "@/hooks/generated-graphql-hooks.js";
import { useUrlPostId } from "@/hooks/url-post-id.js";
import ReactMarkdown from "react-markdown";

export function PostTitle(): ReactElement {
  const postId = useUrlPostId();
  const { data } = usePostSuspenseQuery({ variables: { postId } });

  return <>{data.post?.title}</>;
}

export function PostDescription(): ReactElement {
  const postId = useUrlPostId();
  const { data } = usePostSuspenseQuery({ variables: { postId } });

  return useMemo(() => {
    if (!data?.post?.description) {
      return <></>;
    }

    return <ReactMarkdown>{data.post.description}</ReactMarkdown>;
  }, [data?.post?.description]);
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
  const { data } = usePostSuspenseQuery({ variables: { postId } });

  if (!data?.post?.author) {
    return <></>;
  }

  return <>{data.post.author.username}</>;
}

export function PostUploadDate(): ReactElement {
  const postId = useUrlPostId();
  const { data } = usePostSuspenseQuery({ variables: { postId } });

  if (!data?.post?.createdAt) {
    return <></>;
  }

  return <>{new Date(data.post.createdAt).toLocaleDateString()}</>;
}
