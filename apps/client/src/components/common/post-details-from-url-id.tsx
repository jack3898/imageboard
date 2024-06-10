import { useCallback, useMemo, type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Star, Trash } from "lucide-react";
import { useDeletePostMutation, usePostSuspenseQuery } from "@/hooks/generated-graphql-hooks.js";
import ReactMarkdown from "react-markdown";
import { useUrlPostId } from "@/hooks/url-params.js";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter
} from "../atom/alert-dialogue.js";
import { useNavigate } from "@tanstack/react-router";

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

export function DeletePostButton(): ReactElement {
  const navigate = useNavigate();
  const postId = useUrlPostId();
  const { data } = usePostSuspenseQuery({ variables: { postId } });
  const [deletePost] = useDeletePostMutation();

  const deletePostByPostId = useCallback(async () => {
    await deletePost({
      variables: { deletePostId: postId }
    });

    navigate({ to: "/explore", search: { q: "" } });
  }, [deletePost, navigate, postId]);

  if (!data.post?.isOwner) {
    return <></>;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deletePostByPostId();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
