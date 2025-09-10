/*
  Warnings:

  - You are about to drop the column `password` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `Club` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('JUGADOR', 'CLUB');

-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "password",
DROP COLUMN "phone_number",
ADD COLUMN     "googleId" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'JUGADOR',
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "public"."Club";

-- CreateIndex
CREATE UNIQUE INDEX "Player_googleId_key" ON "public"."Player"("googleId");
