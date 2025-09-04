import { schedulerQueue } from "../queues/schedulerQueue.js";

export async function setupScheduler() {
  await schedulerQueue.add(
    "dailyEmailScheduler",
    {},
    {
      repeat: { pattern: "0 14 * * *" }, // every day at 2 PM
      removeOnComplete: true,
    }
  );

  await schedulerQueue.add(
    "weeklyEmailScheduler",
    {},
    {
      repeat: { pattern: "0 14 * * 0" }, // every week (Sunday) at 2 PM
      removeOnComplete: true,
    }
  );
  console.log("📅 Daily and Weekly scheduler setup successfully");
  process.exit(0);
}
