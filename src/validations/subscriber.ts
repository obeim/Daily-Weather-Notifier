import { Type } from "@fastify/type-provider-typebox";
import { Frequency } from "@prisma/client";

export const addSubscriberBody = Type.Object({
  email: Type.String({
    format: "email",
  }),
  frequency: Type.Optional(Type.Enum(Frequency)),
});

export const subscribeQueryParams = Type.Object({
  unsubscribe: Type.Optional(Type.Boolean()),
});
