import { useCallback, type ReactElement } from "react";
import { Input } from "../atom/input.js";
import { z } from "zod";
import { Button } from "../atom/button.js";
import { Search as SearchIcon } from "lucide-react";
import { type NavigateOptions, useNavigate } from "@tanstack/react-router";
import { Form, FormField, FormMessage } from "../atom/form.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUrlQ } from "@/hooks/url-params.js";

type SearchProps = NavigateOptions;

const formSchema = z.object({
  q: z.string().max(100, { message: "Your search query is too long" })
});

export function SearchBox(navigateOptions: SearchProps): ReactElement {
  const navigate = useNavigate();
  const q = useUrlQ();

  const onSubmit = useCallback(
    ({ q }: z.infer<typeof formSchema>) => {
      // The beauty of this search box is it merges the q param with existing search params
      navigate({ ...navigateOptions, search: (cur) => ({ ...cur, q }) });
    },
    [navigate, navigateOptions]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { q }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => <SearchBoxView inputProps={field} />}
        />
        <FormMessage className="h-[unset]">
          <>{form.formState.errors.q?.message}</>
        </FormMessage>
      </form>
    </Form>
  );
}

type SearchViewProps = {
  inputProps: React.ComponentProps<typeof Input>;
};

function SearchBoxView({ inputProps }: SearchViewProps): ReactElement {
  return (
    <div className="flex gap-2">
      <Input type="text" placeholder="Search for tags, authors, meta..." {...inputProps} />
      <Button size="icon" type="submit" className="[aspect-ratio:1/1]">
        <SearchIcon />
      </Button>
    </div>
  );
}
