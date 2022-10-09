/*
  Warnings:

  - Added the required column `seenAt` to the `QuestionsQuestionEncounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionsQuestionEncounter" ADD COLUMN     "seenAt" TIMESTAMP(3) NOT NULL;
