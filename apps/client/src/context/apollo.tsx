import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { type ReactNode, type ReactElement } from "react";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: `${import.meta.env["UNSAFE_BACKEND_URL"]}graphql`,
  cache: cache
});

type ApolloProviderProps = {
  children: ReactNode;
};

export function ApolloClientProvider({ children }: ApolloProviderProps): ReactElement {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
