import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
new Worker(
  "email",
  async (job) => {
    if (job.name === "sendForecast") {
      const { email, forecast } = job.data;
      // sending email logic will be here

      console.log(email, forecast);
    }
  },
  {
    connection,
    concurrency: 50,
  }
);

console.log("✅ Email worker running...");
