import { SiteLogo } from "@/components/atom/site-logo.js";
import { type ReactElement } from "react";
import { ToggleImageFit } from "./toggle-image-fit.js";

export function Header(): ReactElement {
  return (
    <div className="flex justify-between">
      <div>
        <SiteLogo />
      </div>
      <div>
        Contain images? <ToggleImageFit />
      </div>
    </div>
  );
}
