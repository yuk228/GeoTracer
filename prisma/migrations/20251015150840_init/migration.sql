/*
  Warnings:

  - A unique constraint covering the columns `[adminUuid]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - The required column `adminUuid` was added to the `Url` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `redirectUrl` on table `Url` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "adminUuid" TEXT NOT NULL,
ALTER COLUMN "redirectUrl" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_adminUuid_key" ON "Url"("adminUuid");
