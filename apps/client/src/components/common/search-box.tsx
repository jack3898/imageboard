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

  const search = useSearch({
    strict: false,
    select: (state) => z.string().catch("").parse(state.search?.search),
  });

  const form = useForm({
    defaultValues: { search },
    onSubmit({ value }) {
      navigate({ ...options, search: { ...options.search, search: value } });
    },
  });

  return (
    <form>
      <form.Field
        name="search"
        validatorAdapter={zodValidator}
        validators={{ onChange: z.string().max(100) }}
      >
        {(field) => {
          return (
            <SearchBoxView
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors.join("")}
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              value={field.getValue()}
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
  onSubmit: React.ComponentProps<typeof Button>["onSubmit"];
  value: React.ComponentProps<typeof Button>["value"];
};

function SearchBoxView({ onChange, error, onSubmit, value }: SearchViewProps): ReactElement {
  return (
    <>
      <div className="flex gap-2">
        <Input
          type="text"
          onChange={onChange}
          placeholder="Search for tags, authors, meta..."
          value={value}
        />
        <Button size="icon" type="submit" onClick={onSubmit} className="[aspect-ratio:1/1]">
          <SearchIcon />
        </Button>
      </div>
      <p>{error}</p>
    </>
  );
}
