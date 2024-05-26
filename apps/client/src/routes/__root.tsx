import { type User } from "@/hooks/generated-graphql-hooks.js";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  user?: User | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Outlet
});
