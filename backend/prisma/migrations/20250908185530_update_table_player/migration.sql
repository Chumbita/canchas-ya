/*
  Warnings:

  - You are about to drop the column `role` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "role";

-- DropEnum
DROP TYPE "public"."Role";
