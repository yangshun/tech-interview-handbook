/*
  Warnings:

  - You are about to drop the column `location` on the `QuestionsQuestionEncounter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionsQuestionEncounter" DROP COLUMN "location",
ADD COLUMN     "cityId" TEXT,
ADD COLUMN     "countryId" TEXT,
ADD COLUMN     "stateId" TEXT,
ALTER COLUMN "companyId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "QuestionsAnswer_updatedAt_id_idx" ON "QuestionsAnswer"("updatedAt", "id");

-- CreateIndex
CREATE INDEX "QuestionsAnswer_upvotes_id_idx" ON "QuestionsAnswer"("upvotes", "id");

-- CreateIndex
CREATE INDEX "QuestionsAnswerComment_updatedAt_id_idx" ON "QuestionsAnswerComment"("updatedAt", "id");

-- CreateIndex
CREATE INDEX "QuestionsAnswerComment_upvotes_id_idx" ON "QuestionsAnswerComment"("upvotes", "id");

-- CreateIndex
CREATE INDEX "QuestionsQuestionComment_updatedAt_id_idx" ON "QuestionsQuestionComment"("updatedAt", "id");

-- CreateIndex
CREATE INDEX "QuestionsQuestionComment_upvotes_id_idx" ON "QuestionsQuestionComment"("upvotes", "id");

-- AddForeignKey
ALTER TABLE "QuestionsQuestionEncounter" ADD CONSTRAINT "QuestionsQuestionEncounter_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionEncounter" ADD CONSTRAINT "QuestionsQuestionEncounter_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionEncounter" ADD CONSTRAINT "QuestionsQuestionEncounter_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
