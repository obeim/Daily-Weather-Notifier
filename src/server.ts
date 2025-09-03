import Fastify from "fastify";
import cors from "@fastify/cors";
import ratelimit from "@fastify/rate-limit";
import fastifyRedis from "@fastify/redis";
import weatherRoutes from "./routes/weather.js";
import prismaPlugin from "./plugins/prisma.js";
import env from "./config/env.js";

const server = Fastify({
  logger: true,
});

await server.register(ratelimit, {
  max: env.maxRequests,
  timeWindow: env.maxRequestsWindow,
});

await server.register(fastifyRedis, {
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password,
});

server.register(prismaPlugin);

server.register(cors, { origin: true });

// routes
server.register(weatherRoutes, { prefix: "/api/v1" });

server.get("/", async () => {
  return { message: "API is running" };
});

try {
  await server.listen({ port: env.port, host: env.host });
  server.log.info(`Server listening on http://${env.host}:${env.port}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
