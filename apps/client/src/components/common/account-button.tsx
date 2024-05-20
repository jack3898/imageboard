import { type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Link } from "@tanstack/react-router";
import { LogIn, Upload, UserPlus, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
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
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to="/upload" preload="intent">
            <Upload className="mr-2 h-4 w-4 inline" />
            <span>Upload</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
