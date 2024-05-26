import { type GraphQLSchema, buildClientSchema, getIntrospectionQuery } from "graphql";
import { env } from "./env.js";

export default async function introspectGraphQL(): Promise<GraphQLSchema> {
  const introspectionQuery = getIntrospectionQuery();

  // In order to introspect the backend, we need authentication to the graphql endpoint
  const getCookieRes = await fetch(`${env.UNSAFE_BACKEND_URL}api/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ email: env.TEST_EMAIL, password: env.TEST_PASSWORD }),
    credentials: "include"
  });

  const cookie = getCookieRes.headers
    .get("set-cookie")
    ?.match(/=([^;]+)/)
    ?.at(1);

  const response = await fetch(`${env.UNSAFE_BACKEND_URL}graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: `session=${cookie}`
    },
    body: JSON.stringify({ query: introspectionQuery }),
    credentials: "include"
  });

  const { data } = await response.json();

  return buildClientSchema(data);
}
