-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activationLink" TEXT,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;
