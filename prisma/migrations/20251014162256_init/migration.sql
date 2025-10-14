/*
  Warnings:

  - You are about to drop the column `discordWebhook` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `redirectUrl` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Log` table. All the data in the column will be lost.
  - Added the required column `urlId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Log_slug_key";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "discordWebhook",
DROP COLUMN "redirectUrl",
DROP COLUMN "slug",
ADD COLUMN     "urlId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "redirectUrl" TEXT,
    "discordWebhook" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
