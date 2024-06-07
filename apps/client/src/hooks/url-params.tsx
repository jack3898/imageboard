import { useSearch } from "@tanstack/react-router";

/**
 * Url param "id" value
 */
export function useUrlPostId(): string {
  return useSearch({
    strict: false,
    select: (search) => ("id" in search ? search.id : "")
  });
}

/**
 * Url param "q" value
 */
export function useUrlQ(): string {
  return useSearch({
    strict: false,
    select: (search) => ("q" in search ? search.q : "")
  });
}
