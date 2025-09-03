import { Type } from "@fastify/type-provider-typebox";

export const getWeatherQueryParams = Type.Object({
  lat: Type.Number(),
  long: Type.Number(),
});
