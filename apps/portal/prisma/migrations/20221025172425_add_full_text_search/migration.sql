-- AlterTable
ALTER TABLE "QuestionsQuestion" ADD COLUMN     "contentSearch" tsvector;

-- CreateIndex
CREATE INDEX "QuestionsQuestion_contentSearch_idx" ON "QuestionsQuestion" USING GIN ("contentSearch");
