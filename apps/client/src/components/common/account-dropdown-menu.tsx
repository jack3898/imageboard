import { type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, Upload, UserPlus, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../atom/dropdown-menu.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../atom/dialog.js";
import { Auth } from "@/context/imageboard.js";
import { useMutation } from "@tanstack/react-query";
import { useApolloClient } from "@apollo/client";
import { LoggedInUserDocument } from "@/hooks/generated-graphql-hooks.js";

export function AccountDropdownMenu(): ReactElement {
  const client = useApolloClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn() {
      return fetch(`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/logout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include"
      });
    },
    async onSuccess(data) {
      if (data.status === 200) {
        await client.refetchQueries({ include: [LoggedInUserDocument] });
        await navigate({ from: "/", to: "/" });
      }
    }
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <UserRound />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <Auth asLoggedIn={false}>
            <DropdownMenuItem asChild>
              <Link to="/account/login" preload="intent">
                <LogIn className="mr-2 h-4 w-4 inline" />
                <span>Log in</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account/signup" preload="intent">
                <UserPlus className="mr-2 h-4 w-4 inline" />
                <span>Sign up</span>
              </Link>
            </DropdownMenuItem>
          </Auth>
          <Auth asLoggedIn>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <a>
                  <UserPlus className="mr-2 h-4 w-4 inline" />
                  <span>Log out</span>
                </a>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to="/upload" preload="intent">
                <Upload className="mr-2 h-4 w-4 inline" />
                <span>Upload</span>
              </Link>
            </DropdownMenuItem>
          </Auth>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>You are about to log out.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              logoutMutation.mutate();
            }}
          >
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
