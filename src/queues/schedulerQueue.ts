import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const schedulerQueue = new Queue("scheduler", { connection });
