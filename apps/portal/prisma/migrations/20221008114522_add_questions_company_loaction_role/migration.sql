/*
  Warnings:

  - Added the required column `company` to the `QuestionsQuestionEncounter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `QuestionsQuestionEncounter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `QuestionsQuestionEncounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionsQuestionEncounter" ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
