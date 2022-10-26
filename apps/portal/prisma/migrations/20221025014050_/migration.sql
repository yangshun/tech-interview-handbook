-- DropIndex
DROP INDEX "QuestionsQuestion_contentSearch_idx";

-- AlterTable
ALTER TABLE "QuestionsQuestion" ALTER COLUMN "contentSearch" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "QuestionsQuestion_contentSearch_idx" ON "QuestionsQuestion"("contentSearch");
