/*
  Warnings:

  - Added the required column `upvotes` to the `QuestionsQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionsQuestion" ADD COLUMN     "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "upvotes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuestionsQuestionEncounter" ADD COLUMN     "netVotes" INTEGER NOT NULL DEFAULT 0;
