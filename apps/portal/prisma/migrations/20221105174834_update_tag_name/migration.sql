/*
  Warnings:

  - You are about to drop the `QuestionQuestionTagEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionQuestionTagEntry" DROP CONSTRAINT "QuestionQuestionTagEntry_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionQuestionTagEntry" DROP CONSTRAINT "QuestionQuestionTagEntry_tagId_fkey";

-- DropTable
DROP TABLE "QuestionQuestionTagEntry";

-- DropTable
DROP TABLE "QuestionTag";

-- CreateTable
CREATE TABLE "QuestionsQuestionTag" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "QuestionsQuestionTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsQuestionTagEntry" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "QuestionsQuestionTagEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsQuestionTag_tag_key" ON "QuestionsQuestionTag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsQuestionTagEntry_questionId_tagId_key" ON "QuestionsQuestionTagEntry"("questionId", "tagId");

-- AddForeignKey
ALTER TABLE "QuestionsQuestionTagEntry" ADD CONSTRAINT "QuestionsQuestionTagEntry_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionTagEntry" ADD CONSTRAINT "QuestionsQuestionTagEntry_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "QuestionsQuestionTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
