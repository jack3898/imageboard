import { useGlobalStore } from "@/store/global-store.js";
import { type ReactElement } from "react";
import { Switch } from "../atom/switch.js";

export function ToggleImageFit(): ReactElement {
  const checked = useGlobalStore((store) => store.thumbnailFit === "contain");

  return (
    <Switch
      checked={checked}
      onCheckedChange={(newChecked) => {
        useGlobalStore.setState({
          thumbnailFit: newChecked ? "contain" : "cover"
        });
      }}
    />
  );
}
