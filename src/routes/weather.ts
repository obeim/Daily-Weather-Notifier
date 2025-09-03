import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { getWeatherQueryParams } from "../validations/weather.js";
import { getWeatherForecast } from "../helpers/api.js";
import {
  addSubscriberBody,
  subscribeQueryParams,
} from "../validations/subscriber.js";

const weatherRoutes: FastifyPluginCallbackTypebox = (fastify, opts) => {
  const { redis, prisma } = fastify;
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

  fastify.post(
    "/subscribe",
    { schema: { body: addSubscriberBody, querystring: subscribeQueryParams } },
    async (request, reply) => {
      const { email } = request.body;
      const { unsubscribe } = request.query;

      const user = await prisma.subscriber.findUnique({
        where: { email: email },
      });

      if (unsubscribe && user) {
        await prisma.subscriber.delete({ where: { email } });
        return reply.status(200).send({
          message: "You’re now unsubscribed. We’re sorry to see you go!",
        });
      }

      if (user)
        return reply
          .status(403)
          .send({ message: "User is Already Subscribed" });

      await prisma.subscriber.create({ data: request.body });
      return { message: "User subscribed" };
    }
  );
};
export default weatherRoutes;
