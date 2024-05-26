import { routeTree } from "@/generated-routes.js";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { type ReactElement } from "react";
import { useImageboardContext } from "./imageboard.js";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function Router(): ReactElement {
  const { user } = useImageboardContext();

  return <RouterProvider router={router} context={{ user }} />;
}
