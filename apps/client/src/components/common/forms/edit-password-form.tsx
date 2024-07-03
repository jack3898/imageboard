import { Button } from "@/components/atom/button.js";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/atom/form.js";
import { Input } from "@/components/atom/input.js";
import { useEditPassword } from "@/hooks/account-hooks.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@internal/shared";
import { useCallback, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

type AccountEditPasswordForm = z.infer<typeof schemas.account.editPasswordForm>;

export function EditPasswordForm(): ReactElement {
  const { editPassword } = useEditPassword();

  const form = useForm({
    resolver: zodResolver(schemas.account.editPasswordForm),
    defaultValues: {
      currentPassword: "",
      password: "",
      verifyPassword: ""
    }
  });

  const changePassword = useCallback(
    (values: AccountEditPasswordForm) => {
      editPassword({
        currentPassword: values.currentPassword,
        newPassword: values.password
      });
    },
    [editPassword]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(changePassword)}>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="currentPassword">Current password</FormLabel>
              <Input type="password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">New password</FormLabel>
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
              <FormLabel htmlFor="verifyPassword">Verify new password</FormLabel>
              <Input type="password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button type="submit">Change password</Button>
        </div>
      </form>
    </Form>
  );
}
