import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@internal/shared";
import { useCallback, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../atom/button.js";
import { FormLabel, FormField, FormMessage, Form, FormItem } from "../../atom/form.js";
import { Input } from "../../atom/input.js";

export function SignupForm(): ReactElement {
  const signup = useCallback((values: unknown) => {
    console.log(values);
  }, []);

  const form = useForm({
    resolver: zodResolver(schemas.account.signupForm),
    defaultValues: { username: "", email: "", verifyEmail: "", password: "", verifyPassword: "" }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signup)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input type="text" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-[1fr_1fr] gap-2">
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
            name="verifyEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="verifyEmail">Verify email</FormLabel>
                <Input type="text" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-2">
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
          <FormField
            control={form.control}
            name="verifyPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="verifyPassword">Verify password</FormLabel>
                <Input type="password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="text-right">
          <Button type="submit">Sign up</Button>
        </div>
      </form>
    </Form>
  );
}
