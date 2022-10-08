/*
  Warnings:

  - Added the required column `questionType` to the `QuestionsQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionsQuestionType" AS ENUM ('CODING', 'SYSTEM_DESIGN', 'BEHAVIORAL');

-- AlterTable
ALTER TABLE "QuestionsQuestion" ADD COLUMN     "questionType" "QuestionsQuestionType" NOT NULL;
