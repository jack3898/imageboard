import { useGlobalStore } from "@/store/global-store.js";
import { type ReactElement } from "react";

export function ToggleImageFit(): ReactElement {
  const checked = useGlobalStore((store) => store.thumbnailFit === "contain");

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={({ currentTarget }) => {
        useGlobalStore.setState({ thumbnailFit: currentTarget.checked ? "contain" : "cover" });
      }}
    />
  );
}
