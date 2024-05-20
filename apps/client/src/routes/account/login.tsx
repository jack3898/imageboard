import { Button } from "@/components/atom/button.js";
import { Form, FormField, FormLabel, FormMessage } from "@/components/atom/form.js";
import { Input } from "@/components/atom/input.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/account/login")({
  component: LoginForm
});

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters or more" })
    .max(72, { message: "A password cannot be longer than 72 characters" })
});

function LoginForm(): ReactElement {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values));
  }, []);

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
