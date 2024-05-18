import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/signup")({
  component: () => <div>Sign up</div>,
});
