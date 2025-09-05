import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { Frequency, PrismaClient } from "@prisma/client";
import { emailQueue } from "../queues/emailQueue.js";
import { getWeatherForecast } from "../helpers/api.js";

const prisma = new PrismaClient();

new Worker(
  "scheduler",
  async (job) => {
    console.log("➡️ Got job:", job.name, "at", new Date().toISOString());

    if (job.name === "dailyEmailScheduler") {
      createForecastEmailJobs("DAILY");
    }

    if (job.name === "weeklyEmailScheduler") {
      createForecastEmailJobs("WEEKLY");
    }
  },
  { connection }
);
console.log("✅ Scheduler running...");

const createForecastEmailJobs = async (frequency: Frequency) => {
  // group by country
  const grouped = await prisma.subscriber.groupBy({
    by: ["country"],
    where: { frequency: frequency },
  });

  for (const { country } of grouped) {
    const subscribers = await prisma.subscriber.findMany({
      where: { frequency: frequency, country },
    });

    if (subscribers.length === 0) continue;

    const todayKey = `${country}:${new Date().toISOString().split("T")[0]}`;

    let forecast;
    let forecastString = await connection.get(todayKey);

    if (forecastString) forecast = JSON.parse(forecastString);
    else {
      forecast = await getWeatherForecast(
        Number(subscribers[0].lat),
        Number(subscribers[0].long)
      );

      await connection.set(todayKey, JSON.stringify(forecast), "EX", 43200); // expire in 12 hrs
    }
    console.log(subscribers);

    await emailQueue.addBulk(
      subscribers.map((user) => ({
        name: "sendForecast",
        data: { email: user.email, forecast },
      }))
    );
  }
};
