/*
  Warnings:

  - You are about to drop the column `netVotes` on the `QuestionsQuestionEncounter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionsQuestion" ALTER COLUMN "lastSeenAt" DROP DEFAULT,
ALTER COLUMN "upvotes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "QuestionsQuestionEncounter" DROP COLUMN "netVotes";
