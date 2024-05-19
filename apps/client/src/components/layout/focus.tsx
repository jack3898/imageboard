import { cn } from "@/utils/cn.js";
import { type ReactNode, type ReactElement } from "react";

type FocusProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  size?: "small" | "medium" | "large";
} & React.ComponentPropsWithoutRef<"div">;

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

export function Focus({
  children,
  size = "medium",
  header,
  footer,
  ...wrapperProps
}: FocusProps): ReactElement {
  return (
    <div {...wrapperProps} className={cn("flex flex-col", wrapperProps.className)}>
      <header className="shrink">{header}</header>
      <main className="grow flex justify-center items-center">
        <div className={cn(`max-w-xl w-full`, getTailwindSize(size))}>{children}</div>
      </main>
      <footer className="shrink">{footer}</footer>
    </div>
  );
}
