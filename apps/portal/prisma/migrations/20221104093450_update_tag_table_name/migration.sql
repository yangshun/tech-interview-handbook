/*
  Warnings:

  - You are about to drop the `QuestionTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionQuestionTagEntry" DROP CONSTRAINT "QuestionQuestionTagEntry_tagId_fkey";

-- DropTable
DROP TABLE "QuestionTags";

-- CreateTable
CREATE TABLE "QuestionTag" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "QuestionTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTag_tag_key" ON "QuestionTag"("tag");

-- AddForeignKey
ALTER TABLE "QuestionQuestionTagEntry" ADD CONSTRAINT "QuestionQuestionTagEntry_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "QuestionTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
