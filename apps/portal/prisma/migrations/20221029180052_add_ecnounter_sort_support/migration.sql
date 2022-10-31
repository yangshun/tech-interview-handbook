-- AlterTable
ALTER TABLE "QuestionsQuestion" ADD COLUMN     "numEncounters" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "QuestionsQuestion_numEncounters_id_idx" ON "QuestionsQuestion"("numEncounters", "id");
