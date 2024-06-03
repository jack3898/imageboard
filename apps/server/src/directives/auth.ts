import { type GqlContext } from "@/types/graphql-context.js";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, type GraphQLSchema } from "graphql";
import { z } from "zod";

const directiveParamsValidation = z.object({ throws: z.boolean() }).catch({ throws: true });

/**
 * Only return the field value when logged in.
 *
 * Does not support authorization. For now only authentication.
 */
export function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      const params = directiveParamsValidation.parse(authDirective);

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (
          source,
          args,
          context: GqlContext,
          info
        ): Promise<unknown | null> {
          if ("session" in context.req.signedCookies) {
            return resolve(source, args, context, info);
          }

          if (params.throws) {
            throw Error("Unauthenticated");
          }

          return null;
        };

        return fieldConfig;
      }
    }
  });
}
