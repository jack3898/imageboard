import { Button } from "@/components/atom/button.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atom/card.js";
import { Form, FormField, FormLabel, FormMessage } from "@/components/atom/form.js";
import { Input } from "@/components/atom/input.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/upload/")({
  component: UploadFile
});

function UploadFile(): ReactElement {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Uploading is really simple. Fill out the form below, and you're on your way!
        </p>
        <UploadFileForm />
      </CardContent>
    </Card>
  );
}

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The title is too short!" })
    .max(128, { message: "The title is too long!" }),
  file: z.array(z.instanceof(File)).nonempty({ message: "You must provide at least one file" })
});

function UploadFileForm(): ReactElement {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: []
    }
  });

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    const file = data.file[0];

    formData.append("title", data.title);

    if (file) {
      formData.append("file", file);
    }

    fetch(`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/upload/image`, {
      method: "POST",
      body: formData
    });
  }, []);

  return (
    <Card className="p-4 max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormField
            control={form.control}
            name="title"
            render={() => <Input {...form.register("title")} />}
          />
          <FormMessage>
            <span>{form.formState.errors.title?.message}</span>
          </FormMessage>
          <FormLabel htmlFor="file">File</FormLabel>
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <Input
                onChange={(e) => {
                  field.onChange(Array.from(e.target.files ?? []));
                }}
                type="file"
              />
            )}
          />
          <FormMessage>
            <span>
              <>{form.formState.errors.file?.message}</>
            </span>
          </FormMessage>
          <div className="text-right">
            <Button disabled={!form.formState.isValid}>Upload</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
