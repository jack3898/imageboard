import { Button } from "@/components/atom/button.js";
import { AccountEdit } from "@/components/common/account-edit.js";
import { useImageboardContext } from "@/context/imageboard.js";
import { Link, createFileRoute } from "@tanstack/react-router";
import { LogIn, UserPlus } from "lucide-react";
import { type ReactElement } from "react";

export const Route = createFileRoute("/account/")({
  component: Account
});

function Account(): ReactElement {
  const { user } = useImageboardContext();

  if (user?.id) {
    return <AccountLoggedIn />;
  } else {
    return <AccountLoggedOut />;
  }
}

function AccountLoggedIn(): ReactElement {
  return <AccountEdit />;
}

function AccountLoggedOut(): ReactElement {
  return (
    <div>
      <p className="mb-4 text-center">What do you want to do?</p>
      <div className="flex gap-2 justify-center">
        <Button asChild className="inline-flex gap-2 items-center p-4">
          <Link to="/account/signup">
            Create a new account <UserPlus />
          </Link>
        </Button>
        <Button asChild className="inline-flex gap-2 items-center p-4">
          <Link to="/account/login">
            Sign in <LogIn />
          </Link>
        </Button>
      </div>
    </div>
  );
}
