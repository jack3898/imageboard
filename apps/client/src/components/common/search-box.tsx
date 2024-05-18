import { type ReactElement } from "react";
import { Input } from "../atom/input.js";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Button } from "../atom/button.js";
import { Search as SearchIcon } from "lucide-react";
import { type NavigateOptions, useNavigate, useSearch } from "@tanstack/react-router";

type SearchProps = NavigateOptions;

export function SearchBox(options: SearchProps): ReactElement {
  const navigate = useNavigate();

  // This could be on any route!
  const search = useSearch({
    strict: false,
  });

  const form = useForm({
    defaultValues: { q: search.q },
    onSubmit({ value }) {
      const newSearch = { ...search, q: value.q };

      navigate({
        ...options,
        search: newSearch,
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="q"
        validatorAdapter={zodValidator}
        validators={{ onChange: z.string().max(100) }}
      >
        {(field) => {
          return (
            <SearchBoxView
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors.join("")}
              value={field.getValue()}
              name={field.name}
            />
          );
        }}
      </form.Field>
    </form>
  );
}

type SearchViewProps = {
  onChange: React.ComponentProps<typeof Input>["onChange"];
  error: string | undefined;
  value: string;
  name: string;
};

function SearchBoxView({ onChange, error, value, name }: SearchViewProps): ReactElement {
  return (
    <>
      <div className="flex gap-2">
        <Input
          type="text"
          onChange={onChange}
          placeholder="Search for tags, authors, meta..."
          value={value}
          name={name}
        />
        <Button size="icon" type="submit" className="[aspect-ratio:1/1]">
          <SearchIcon />
        </Button>
      </div>
      <p>{error}</p>
    </>
  );
}
