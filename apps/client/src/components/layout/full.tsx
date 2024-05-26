import { cn } from "@/utils/cn.js";
import { type ReactElement, type ReactNode } from "react";

type FullProps = {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * A full-width layout, with three main columns: header, main, footer.
 *
 * If you need a side-bar, use the `browse` layout instead.
 */
export function FullLayout({ header, main, footer, ...wrapperProps }: FullProps): ReactElement {
  return (
    <div {...wrapperProps} className={cn("flex flex-col size-full gap-2", wrapperProps.className)}>
      <header>{header}</header>
      <main className="grow">{main}</main>
      <footer>{footer}</footer>
    </div>
  );
}
