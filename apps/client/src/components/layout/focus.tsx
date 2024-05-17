import { cn } from "@/utils/cn.js";
import { type ReactNode, type ReactElement } from "react";

type FocusProps = {
  children: ReactNode;
  size?: "small" | "medium" | "large";
};

function getTailwindSize(size: "small" | "medium" | "large"): string {
  switch (size) {
    case "small":
      return "max-w-md";
    case "medium":
      return "max-w-xl";
    case "large":
      return "max-w-4xl";
  }
}

export function Focus({ children, size = "medium" }: FocusProps): ReactElement {
  return (
    <div className="flex justify-center items-center">
      <div className={cn(`max-w-xl w-full`, getTailwindSize(size))}>{children}</div>
    </div>
  );
}
