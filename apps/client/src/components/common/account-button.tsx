import { type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Link } from "@tanstack/react-router";
import { LogIn, UserPlus, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../atom/dropdown-menu.js";

export function AccountButton(): ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <UserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/account/login">
            <LogIn className="mr-2 h-4 w-4 inline" />
            <span>Log in</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/signup">
            <UserPlus className="mr-2 h-4 w-4 inline" />
            <span>Sign up</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
