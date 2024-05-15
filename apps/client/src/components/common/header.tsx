import { SiteLogo } from "@/components/atom/site-logo.js";
import { type ReactElement } from "react";
import { ToggleImageFit } from "./toggle-image-fit.js";
import { DarkModeToggle } from "./dark-mode-toggle.js";

export function Header(): ReactElement {
  return (
    <div className="flex justify-between">
      <div className="grow">
        <SiteLogo />
      </div>
      <div className="shrink flex items-center gap-4">
        Contain images? <ToggleImageFit />
        Dark mode? <DarkModeToggle />
      </div>
    </div>
  );
}
