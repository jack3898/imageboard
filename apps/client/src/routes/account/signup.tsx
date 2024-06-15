import { SignupForm } from "@/components/common/forms/signup-form.js";
import { createFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createFileRoute("/account/signup")({
  component: SignupFormPage
});

function SignupFormPage(): ReactElement {
  return (
    <>
      <div>
        <strong className="mb-4">Create your own account!</strong>
      </div>
      <br />
      <SignupForm />
    </>
  );
}
