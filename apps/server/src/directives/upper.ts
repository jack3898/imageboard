import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, type GraphQLSchema } from "graphql";

// This is here as reference, might also come in handy!
// Stolen from https://github.com/apollographql/docs-examples/tree/main/apollo-server/v4/custom-directives/upper-case-directive
// It helped a lot when learning how to make custom directives

export function upperDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (upperDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (
          source,
          args,
          context,
          info
        ): Promise<string | unknown> {
          const result = await resolve(source, args, context, info);

          if (typeof result === "string") {
            return result.toUpperCase();
          }

          return result;
        };
        return fieldConfig;
      }
    }
  });
}
