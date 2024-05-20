import { envClient } from "@/env-client.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { type ReactNode, type ReactElement } from "react";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: `${envClient.UNSAFE_BACKEND_URL}graphql`,
  cache: cache
});

type ApolloProviderProps = {
  children: ReactNode;
};

export function ApolloClientProvider({ children }: ApolloProviderProps): ReactElement {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
