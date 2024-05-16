import { envClient } from "@/env-client.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { type ReactNode, type ReactElement } from "react";

const cache = new InMemoryCache();

const client = new ApolloClient({
  // TODO: Change this! It will definitely break at some point!
  uri: `http://localhost:${envClient.UNSAFE_BACKEND_PORT}/graphql`,
  cache: cache,
});

type ApolloProviderProps = {
  children: ReactNode;
};

export function ApolloClientProvider({ children }: ApolloProviderProps): ReactElement {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
