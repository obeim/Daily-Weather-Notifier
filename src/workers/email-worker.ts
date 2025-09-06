import env from "../config/env.js";
import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { weatherEmailTemplate } from "../helpers/weatherEmailTemplate.js";
import { transporter } from "../config/nodemailer.js";
import { EmailJobData } from "../types.js";
new Worker<EmailJobData>(
  "email",
  async (job) => {
    if (job.name === "sendForecast") {
      const { email, forecast } = job.data;
      console.log("forecast", forecast);
      try {
        await transporter.sendMail({
          from: `"Weather Notifier" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "🌤️ Your Daily Weather Update",
          html: weatherEmailTemplate(forecast),
        });
      } catch (Err) {
        console.log(Err);
      }
      console.log(email, forecast);
    }
  },
  {
    connection,
    concurrency: 50,
  }
);

console.log("✅ Email worker running...");
