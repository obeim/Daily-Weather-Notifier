/*
  Warnings:

  - You are about to drop the column `lastSentAt` on the `Subscriber` table. All the data in the column will be lost.
  - Added the required column `country` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscriber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "frequency" TEXT NOT NULL DEFAULT 'DAILY',
    "country" TEXT NOT NULL,
    "lat" DECIMAL NOT NULL,
    "long" DECIMAL NOT NULL
);
INSERT INTO "new_Subscriber" ("email", "frequency", "id") SELECT "email", "frequency", "id" FROM "Subscriber";
DROP TABLE "Subscriber";
ALTER TABLE "new_Subscriber" RENAME TO "Subscriber";
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
