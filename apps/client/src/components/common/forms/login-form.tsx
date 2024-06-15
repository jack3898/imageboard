import { useLogin } from "@/hooks/login-logout-hooks.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@internal/shared";
import { type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../atom/button.js";
import { FormLabel, FormField, FormMessage, Form, FormItem } from "../../atom/form.js";
import { Input } from "../../atom/input.js";

export function LoginForm(): ReactElement {
  const { login } = useLogin();

  const form = useForm({
    resolver: zodResolver(schemas.account.loginForm),
    defaultValues: { email: "", password: "" }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="text" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input type="password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  );
}
