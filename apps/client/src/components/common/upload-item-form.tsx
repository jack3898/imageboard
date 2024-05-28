import { useCallback, type ReactElement } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../atom/form.js";
import { schemas } from "@internal/shared";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../atom/button.js";
import { Input } from "../atom/input.js";
import { useFilesLazyQuery } from "@/hooks/generated-graphql-hooks.js";
import { Textarea } from "../atom/textarea.js";

type UploadForm = schemas.upload.UploadForm;

export function UploadFileForm(): ReactElement {
  const [fetchFiles] = useFilesLazyQuery();

  const form = useForm<UploadForm>({
    resolver: zodResolver(schemas.upload.uploadForm),
    defaultValues: {
      title: "",
      file: [],
      alt: "",
      description: ""
    }
  });

  const result = useMutation({
    mutationFn(formData: FormData) {
      return fetch(`${import.meta.env["UNSAFE_BACKEND_URL"]}/api/upload/image`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
    },
    async onSuccess() {
      form.reset();
      await fetchFiles({ fetchPolicy: "network-only" });
    }
  });

  const onSubmit = useCallback(
    (data: UploadForm) => {
      const formData = new FormData();
      const file = data.file[0];

      formData.append("title", data.title);
      formData.append("alt", data.alt);
      formData.append("description", data.description);

      if (file) {
        formData.append("file", file);
      }

      result.mutate(formData);
    },
    [result]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/jpeg image/png"
                  onChange={(event) => onChange(Array.from(event.target.files ?? []))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt text</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                Alt text is a little description to aid those with impaired vision understand what
                the image is about. Keep it nice an concise!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Any extras worth adding?" className="resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="grow">
            <small>{result.isSuccess && "File uploaded!"}</small>
          </div>
          <Button>Upload</Button>
        </div>
      </form>
    </Form>
  );
}
