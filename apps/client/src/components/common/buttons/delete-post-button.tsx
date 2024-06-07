import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/atom/alert-dialogue.js";
import { Button } from "@/components/atom/button.js";
import { useDeletePostMutation } from "@/hooks/generated-graphql-hooks.js";
import { useNavigate } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { useCallback, type ReactElement } from "react";

type DeletePostButtonProps = {
  postId: string;
};

export function DeletePostButton({ postId }: DeletePostButtonProps): ReactElement {
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();

  const deletePostByPostId = useCallback(async () => {
    await deletePost({
      variables: { deletePostId: postId }
    });

    navigate({ to: "/explore", search: { q: "" } });
  }, [deletePost, navigate, postId]);

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
