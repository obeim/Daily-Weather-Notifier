import { Type } from "@fastify/type-provider-typebox";

export const addSubscriberBody = Type.Object({
  email: Type.String({
    format: "email",
  }),
});
