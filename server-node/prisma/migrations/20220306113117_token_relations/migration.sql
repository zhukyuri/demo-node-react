/*
  Warnings:

  - You are about to drop the column `user` on the `Tokens` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tokens_user_key";

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
