/*
  Warnings:

  - Changed the type of `vote` on the `QuestionsAnswerCommentVote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vote` on the `QuestionsAnswerVote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vote` on the `QuestionsQuestionCommentVote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vote` on the `QuestionsQuestionVote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Vote" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "QuestionsAnswerCommentVote" DROP COLUMN "vote",
ADD COLUMN     "vote" "Vote" NOT NULL;

-- AlterTable
ALTER TABLE "QuestionsAnswerVote" DROP COLUMN "vote",
ADD COLUMN     "vote" "Vote" NOT NULL;

-- AlterTable
ALTER TABLE "QuestionsQuestionCommentVote" DROP COLUMN "vote",
ADD COLUMN     "vote" "Vote" NOT NULL;

-- AlterTable
ALTER TABLE "QuestionsQuestionVote" DROP COLUMN "vote",
ADD COLUMN     "vote" "Vote" NOT NULL;

-- DropEnum
DROP TYPE "QuestionsVote";
