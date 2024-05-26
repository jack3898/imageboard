import { useLoggedInUserSuspenseQuery, type User } from "@/hooks/generated-graphql-hooks.js";
import { type ReactElement, type ReactNode, createContext, useContext } from "react";

type ImageboardContext = {
  user: User | null;
};

const imageboardContext = createContext<ImageboardContext | null>(null);

export type ImageboardContextProviderProps = {
  children?: ReactNode;
};

/**
 * This is global state for the imageboard. It's a DI mechanism, and should never be used as state management.
 * Ideally this changes as little as possible.
 */
export function ImageboardContextProvider({
  children
}: ImageboardContextProviderProps): ReactElement {
  const {
    data: { loggedInUser: user = null }
  } = useLoggedInUserSuspenseQuery();

  return <imageboardContext.Provider value={{ user }}>{children}</imageboardContext.Provider>;
}

export function useImageboardContext(): ImageboardContext {
  const ctx = useContext(imageboardContext);

  if (!ctx) {
    throw ReferenceError("You cannot use useImageboardContext without a ImageboardContextProvider");
  }

  return ctx;
}

type AuthProps = {
  children: ReactNode;
  asLoggedIn?: boolean;
};

export function Auth({ children, asLoggedIn = true }: AuthProps): ReactElement {
  const { user } = useImageboardContext();

  if (!user !== asLoggedIn) {
    return <>{children}</>;
  }

  return <></>;
}
