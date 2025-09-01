import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { getWeatherQueryParams } from "../schemas/params.js";
import { getWeatherForecast } from "../helpers/api.js";

const weatherRoutes: FastifyPluginCallbackTypebox = (fastify, opts) => {
  fastify.get(
    "/forecast",
    { schema: { querystring: getWeatherQueryParams } },
    async (request, reply) => {
      const { lat, long } = request.query;
      const data = await getWeatherForecast(lat, long);
      return data;
    }
  );

  fastify.post("/subscribe", async (request, reply) => {
    return { message: "User subscribed" };
  });
};
export default weatherRoutes;
