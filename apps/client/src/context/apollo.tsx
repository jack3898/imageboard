import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { type ReactNode, type ReactElement } from "react";

// TODO: Generate with fetch call
const cache = new InMemoryCache({
  possibleTypes: {
    File: ["ImageFile"]
  }
});

const client = new ApolloClient({
  uri: `${import.meta.env["UNSAFE_BACKEND_URL"]}/graphql`,
  cache: cache,
  credentials: "include"
});

type ApolloProviderProps = {
  children: ReactNode;
};

export function ApolloClientProvider({ children }: ApolloProviderProps): ReactElement {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
