import Fastify from "fastify";
import cors from "@fastify/cors";
import ratelimit from "@fastify/rate-limit";
import weatherRoutes from "./routes/weather.js";
import config from "./config.js";

const server = Fastify({
  logger: true,
});

await server.register(ratelimit, {
  max: config.maxRequests,
  timeWindow: config.maxRequestsWindow,
});

server.register(cors, { origin: true });

// routes
server.register(weatherRoutes, { prefix: "/api/v1" });

server.get("/", async () => {
  return { message: "API is running" };
});

try {
  await server.listen({ port: config.port, host: config.host });
  server.log.info(`Server listening on http://${config.host}:${config.port}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
