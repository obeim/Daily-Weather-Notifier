import { FastifyPluginCallback } from "fastify";

const weatherRoutes: FastifyPluginCallback = (fastify, opts) => {
  fastify.get("/weather", async (request, reply) => {
    return { weather: [] };
  });

  fastify.post("/subscribe", async (request, reply) => {
    return { message: "User subscribed" };
  });
};
export default weatherRoutes;
