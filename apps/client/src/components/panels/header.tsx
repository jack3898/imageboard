import { SiteLogo } from "@/components/atom/site-logo.js";
import { type ReactElement } from "react";
import { ToggleImageFit } from "../common/toggle-image-fit.js";
import { DarkModeToggle } from "../common/dark-mode-toggle.js";
import { Link } from "@tanstack/react-router";
import { AccountDropdownMenu } from "../common/account-dropdown-menu.js";

export function Header(): ReactElement {
  return (
    <div className="flex justify-between flex-wrap">
      <div className="grow">
        <Link to="/">
          <SiteLogo />
        </Link>
      </div>
      <div className="shrink flex items-center gap-4">
        Contain images? <ToggleImageFit />
        <DarkModeToggle />
        <AccountDropdownMenu />
      </div>
    </div>
  );
}
