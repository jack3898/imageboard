import { LoginForm } from "@/components/common/login-form.js";
import { createFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createFileRoute("/account/login")({
  component: LoginFormPage
});

function LoginFormPage(): ReactElement {
  return (
    <>
      <div>
        <strong className="mb-4">Welcome back!</strong>
        <p>Log in to access all features.</p>
      </div>
      <br />
      <LoginForm />
    </>
  );
}
