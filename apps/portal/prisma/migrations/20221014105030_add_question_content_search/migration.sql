-- AlterTable
ALTER TABLE "QuestionsQuestion" ADD COLUMN "contentSearch" TSVECTOR
    GENERATED ALWAYS AS
        to_tsvector('english', coalesce(content, ''))
    STORED;

-- CreateIndex
CREATE INDEX "QuestionsQuestion_contentSearch_idx" ON "QuestionsQuestion" USING GIN("textSearch");