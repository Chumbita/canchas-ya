/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OtpCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Player" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OtpCode_email_key" ON "public"."OtpCode"("email");
