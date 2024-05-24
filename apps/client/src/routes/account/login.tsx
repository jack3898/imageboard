import { Button } from "@/components/atom/button.js";
import { Form, FormField, FormLabel, FormMessage } from "@/components/atom/form.js";
import { Input } from "@/components/atom/input.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { schemas } from "@internal/shared";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/account/login")({
  component: LoginForm
});

type AccountForm = schemas.account.AccountForm;

function LoginForm(): ReactElement {
  const loginMutation = useMutation({
    mutationFn(data: AccountForm) {
      return fetch(`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
      });
    }
  });

  const form = useForm({
    resolver: zodResolver(schemas.account.accountForm),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = useCallback(
    (values: AccountForm) => {
      loginMutation.mutate(values);
    },
    [loginMutation]
  );

  return (
    <>
      <div className="text-center">
        <strong className="mb-4">Welcome back!</strong>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return <Input {...field} />;
            }}
          />
          <FormMessage>
            <span>{form.formState.errors.email?.message}</span>
          </FormMessage>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return <Input {...field} type="password" />;
            }}
          />
          <FormMessage>
            <span>{form.formState.errors.password?.message}</span>
          </FormMessage>
          <div className="text-right">
            <Button type="submit" disabled={!form.formState.isValid}>
              Let's go!
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
