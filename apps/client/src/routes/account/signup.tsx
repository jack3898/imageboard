import { SignupForm } from "@/components/common/signup-form.js";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/signup")({
  component: SignupForm
});
