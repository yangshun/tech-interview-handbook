/*
  Warnings:

  - You are about to drop the column `company` on the `QuestionsQuestionEncounter` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `QuestionsQuestionEncounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionsQuestionEncounter" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionEncounter" ADD CONSTRAINT "QuestionsQuestionEncounter_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
