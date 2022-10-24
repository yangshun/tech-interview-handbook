-- CreateTable
CREATE TABLE "QuestionsList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsListQuestionEntry" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsListQuestionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsList_userId_name_key" ON "QuestionsList"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsListQuestionEntry_listId_questionId_key" ON "QuestionsListQuestionEntry"("listId", "questionId");

-- AddForeignKey
ALTER TABLE "QuestionsList" ADD CONSTRAINT "QuestionsList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsListQuestionEntry" ADD CONSTRAINT "QuestionsListQuestionEntry_listId_fkey" FOREIGN KEY ("listId") REFERENCES "QuestionsList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsListQuestionEntry" ADD CONSTRAINT "QuestionsListQuestionEntry_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
