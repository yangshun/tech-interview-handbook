-- CreateTable
CREATE TABLE "QuestionTags" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "QuestionTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionQuestionTagEntry" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "QuestionQuestionTagEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTags_tag_key" ON "QuestionTags"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionQuestionTagEntry_questionId_tagId_key" ON "QuestionQuestionTagEntry"("questionId", "tagId");

-- AddForeignKey
ALTER TABLE "QuestionQuestionTagEntry" ADD CONSTRAINT "QuestionQuestionTagEntry_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionQuestionTagEntry" ADD CONSTRAINT "QuestionQuestionTagEntry_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "QuestionTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
