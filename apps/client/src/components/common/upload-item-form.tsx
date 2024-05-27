import { useCallback, type ReactElement } from "react";
import { Form, FormField, FormLabel, FormMessage } from "../atom/form.js";
import { schemas } from "@internal/shared";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../atom/button.js";
import { Input } from "../atom/input.js";
import { useFilesLazyQuery } from "@/hooks/generated-graphql-hooks.js";

type UploadForm = schemas.upload.UploadForm;

export function UploadFileForm(): ReactElement {
  const [fetchFiles] = useFilesLazyQuery();

  const form = useForm<UploadForm>({
    resolver: zodResolver(schemas.upload.uploadForm),
    defaultValues: {
      title: "",
      file: []
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
        <div className="flex justify-between">
          <div className="grow">
            <small>{result.isSuccess && "File uploaded!"}</small>
          </div>
          <Button disabled={!form.formState.isValid}>Upload</Button>
        </div>
      </form>
    </Form>
  );
}
