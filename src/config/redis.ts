import { Redis } from "ioredis";
import env from "./env.js";

export const connection = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password,
  maxRetriesPerRequest: null, //  REQUIRED for BullMQ
});
