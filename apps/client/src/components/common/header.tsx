import { SiteLogo } from "@/components/atom/site-logo.js";
import { type ReactElement } from "react";
import { ToggleImageFit } from "./toggle-image-fit.js";
import { DarkModeToggle } from "./dark-mode-toggle.js";
import { Link } from "@tanstack/react-router";

export function Header(): ReactElement {
  return (
    <div className="flex justify-between">
      <div className="grow">
        <Link to="/">
          <SiteLogo />
        </Link>
      </div>
      <div className="shrink flex items-center gap-4">
        Contain images? <ToggleImageFit />
        Dark mode? <DarkModeToggle />
      </div>
    </div>
  );
}
