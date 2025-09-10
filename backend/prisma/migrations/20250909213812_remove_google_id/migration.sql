/*
  Warnings:

  - You are about to drop the column `googleId` on the `Player` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Player_googleId_key";

-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "googleId";
