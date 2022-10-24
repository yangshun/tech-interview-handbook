/*
  Warnings:

  - Added the required column `upvotes` to the `QuestionsAnswerComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionsAnswer" ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "QuestionsAnswerComment" ADD COLUMN     "upvotes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuestionsQuestionComment" ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;
