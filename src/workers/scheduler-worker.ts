import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { PrismaClient } from "@prisma/client";
import { emailQueue } from "../queues/emailQueue.js";
import { getWeatherForecast } from "../helpers/api.js";

const prisma = new PrismaClient();

new Worker(
  "scheduler",
  async (job) => {
    console.log("➡️ Got job:", job.name, "at", new Date().toISOString());

    if (job.name === "dailyEmailScheduler") {
      const forecast = await getWeatherForecast(27, 30);
      const subscribers = await prisma.subscriber.findMany({
        where: { frequency: "DAILY" },
      });

      console.log(`🌤️ Adding ${subscribers.length} daily forecast jobs`);

      if (subscribers.length > 0)
        await emailQueue.addBulk(
          subscribers.map((user) => ({
            name: "sendForecast",
            data: { email: user.email, forecast },
          }))
        );
    }

    if (job.name === "weeklyEmailScheduler") {
      const forecast = await getWeatherForecast(27, 30, true);
      const subscribers = await prisma.subscriber.findMany({
        where: { frequency: "WEEKLY" },
      });

      console.log(`🌤️ Adding ${subscribers.length} weekly forecast jobs`);

      if (subscribers.length > 0)
        await emailQueue.addBulk(
          subscribers.map((user) => ({
            name: "sendForecast",
            data: { email: user.email, forecast },
          }))
        );
    }
  },
  { connection }
);
console.log("✅ Scheduler running...");
