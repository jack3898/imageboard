import { Button } from "@/components/atom/button.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atom/card.js";
import { Form, FormField, FormLabel, FormMessage } from "@/components/atom/form.js";
import { Input } from "@/components/atom/input.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@internal/shared";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, type ReactElement } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";

export const Route = createFileRoute("/upload/")({
  component: UploadFile
});

type UploadForm = schemas.upload.UploadForm;

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

function UploadFileForm(): ReactElement {
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
        body: formData
      });
    },
    onSuccess() {
      form.reset();
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

  return <UploadFileFormView form={form} onSubmit={onSubmit} uploadResult={result} />;
}

type UploadFileFormViewProps = {
  form: UseFormReturn<UploadForm>;
  onSubmit: (data: UploadForm) => void;
  uploadResult: UseMutationResult<unknown, Error, FormData, unknown>;
};

function UploadFileFormView({
  onSubmit,
  form,
  uploadResult
}: UploadFileFormViewProps): ReactElement {
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
          <div className="flex justify-between">
            <div className="grow">
              <small>{uploadResult.isSuccess && "Image uploaded!"}</small>
            </div>
            <Button disabled={!form.formState.isValid}>Upload</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
