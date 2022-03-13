/*
  Warnings:

  - A unique constraint covering the columns `[activationLink]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `activationLink` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activationLink" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_activationLink_key" ON "User"("activationLink");
