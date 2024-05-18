import { Button } from "@/components/atom/button.js";
import { Link, createFileRoute } from "@tanstack/react-router";
import { LogIn, UserPlus } from "lucide-react";
import { type ReactElement } from "react";

export const Route = createFileRoute("/account/")({
  component: Account,
});

function Account(): ReactElement {
  return (
    <div>
      <p className="mb-4">What do you want to do?</p>
      <div className="flex gap-2 justify-center">
        <Button asChild className="inline-flex gap-2 items-center p-4">
          <Link to="signup">
            Create a new account <UserPlus />
          </Link>
        </Button>
        <Button asChild className="inline-flex gap-2 items-center p-4">
          <Link to="login">
            Sign in <LogIn />
          </Link>
        </Button>
      </div>
    </div>
  );
}
