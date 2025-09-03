import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { getWeatherQueryParams } from "../schemas/params.js";
import { getWeatherForecast } from "../helpers/api.js";

const weatherRoutes: FastifyPluginCallbackTypebox = (fastify, opts) => {
  const { redis } = fastify;
  fastify.get(
    "/forecast",
    { schema: { querystring: getWeatherQueryParams } },
    async (request, reply) => {
      const { lat, long } = request.query;
      const cachedData = await redis.get(`weather:${lat},${long}`);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const data = await getWeatherForecast(lat, long);
      await redis.set(
        `weather:${lat},${long}`,
        JSON.stringify(data),
        "EX",
        7200
      ); // cache for 2 hours
      return data;
    }
  );

  fastify.post("/subscribe", async (request, reply) => {
    return { message: "User subscribed" };
  });
};
export default weatherRoutes;
