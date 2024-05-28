import { useSearch } from "@tanstack/react-router";

export function useUrlPostId(): string {
  return useSearch({
    strict: false,
    select: (search) => ("id" in search ? search.id : "")
  });
}
