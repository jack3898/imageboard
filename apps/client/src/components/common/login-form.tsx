import { useLogin } from "@/hooks/login-logout-hooks.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@internal/shared";
import { type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../atom/button.js";
import { FormLabel, FormField, FormMessage, Form } from "../atom/form.js";
import { Input } from "../atom/input.js";

export function LoginForm(): ReactElement {
  const { login } = useLogin();

  const form = useForm({
    resolver: zodResolver(schemas.account.accountForm),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className="max-w-sm">
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
  );
}
