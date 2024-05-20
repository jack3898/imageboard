import { useBrowserStore } from "@/store/browser-store.js";
import { cn } from "@/utils/cn.js";
import { type ReactElement, type ReactNode } from "react";

type BrowseProps = {
  header: ReactNode;
  left: ReactNode;
  main: ReactNode;
  footer: ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export function BrowseLayout(props: BrowseProps): ReactElement {
  const isMobile = useBrowserStore((store) => store.viewportWidth < 768);

  if (isMobile) {
    return <BrowseLayoutMobile {...props} />;
  } else {
    return <BrowseLayoutDesktop {...props} />;
  }
}

/**
 * Main browser layout.
 *
 * NOTE: Uses 100vh
 */
export function BrowseLayoutDesktop({
  header,
  left,
  main,
  footer,
  ...wrapperProps
}: BrowseProps): ReactElement {
  return (
    <div
      {...wrapperProps}
      className={cn(
        "grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-2 [grid-template-areas:'header_header''left_main''footer_footer'] size-full",
        wrapperProps.className
      )}
    >
      <header className="[grid-area:header]">{header}</header>
      <aside className="[grid-area:left]">{left}</aside>
      <main className="[grid-area:main]">{main}</main>
      <footer className="[grid-area:footer]">{footer}</footer>
    </div>
  );
}

/**
 * Main browser layout.
 *
 * NOTE: Uses 100vh
 */
export function BrowseLayoutMobile({
  header,
  left,
  main,
  footer,
  ...wrapperProps
}: BrowseProps): ReactElement {
  return (
    <div {...wrapperProps} className={cn("flex flex-col size-full gap-2", wrapperProps.className)}>
      <header>{header}</header>
      <aside>{left}</aside>
      <main className="grow">{main}</main>
      <footer>{footer}</footer>
    </div>
  );
}
