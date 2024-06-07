import { SiteLogo } from "@/components/atom/site-logo.js";
import { type ReactElement } from "react";
import { ToggleImageFit } from "../common/toggle-image-fit.js";
import { Link } from "@tanstack/react-router";
import { AccountDropdownMenu } from "../common/buttons/account-dropdown-menu-button.js";
import { DarkModeToggle } from "../common/buttons/dark-mode-toggle-button.js";

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
