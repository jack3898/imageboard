import { type GraphQLSchema, buildClientSchema, getIntrospectionQuery } from "graphql";
import { env } from "./env.js";

export default async function introspectGraphQL(): Promise<GraphQLSchema> {
  const introspectionQuery = getIntrospectionQuery();

  // TODO: When auth is implemented, fill this fetch to fetch the cookie!
  // const getCookieRes = await fetch();

  // const cookie = getCookieRes.headers
  //   .get("set-cookie")
  //   ?.match(/=([^;]+)/)
  //   ?.at(1);

  // TODO: Extract more detail of backend url as env
  const response = await fetch(`http://localhost:${env.UNSAFE_BACKEND_PORT}/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      credentials: "include",
      // cookie: `session=${cookie}`, This will be needed in the future!
    },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const { data } = await response.json();

  return buildClientSchema(data);
}
