/*
  Warnings:

  - You are about to drop the column `creator` on the `OffersReply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OffersReply" DROP COLUMN "creator",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "OffersReply" ADD CONSTRAINT "OffersReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
