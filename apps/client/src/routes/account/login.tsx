import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/login")({
  component: () => <div>Log in</div>,
});
