import { Type } from "@fastify/type-provider-typebox";

export const getWeatherQueryParams = Type.Object({
  lat: Type.Number(),
  long: Type.Number(),
});

export const subscribeQueryParams = Type.Object({
  unsubscribe: Type.Optional(Type.Boolean()),
});
