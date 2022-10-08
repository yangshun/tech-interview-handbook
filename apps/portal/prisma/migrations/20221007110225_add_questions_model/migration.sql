-- CreateEnum
CREATE TYPE "QuestionsVote" AS ENUM ('NO_VOTE', 'UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "QuestionsQuestion" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsQuestionEncounter" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsQuestionEncounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsQuestionVote" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT,
    "vote" "QuestionsVote" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsQuestionVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsQuestionComment" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsQuestionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsQuestionCommentVote" (
    "id" TEXT NOT NULL,
    "questionCommentId" TEXT NOT NULL,
    "userId" TEXT,
    "vote" "QuestionsVote" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsQuestionCommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAnswerVote" (
    "id" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "userId" TEXT,
    "vote" "QuestionsVote" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsAnswerVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAnswerComment" (
    "id" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "userId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsAnswerComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAnswerCommentVote" (
    "id" TEXT NOT NULL,
    "answerCommentId" TEXT NOT NULL,
    "userId" TEXT,
    "vote" "QuestionsVote" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsAnswerCommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsQuestionVote_questionId_userId_key" ON "QuestionsQuestionVote"("questionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsQuestionCommentVote_questionCommentId_userId_key" ON "QuestionsQuestionCommentVote"("questionCommentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsAnswerVote_answerId_userId_key" ON "QuestionsAnswerVote"("answerId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsAnswerCommentVote_answerCommentId_userId_key" ON "QuestionsAnswerCommentVote"("answerCommentId", "userId");

-- AddForeignKey
ALTER TABLE "QuestionsQuestion" ADD CONSTRAINT "QuestionsQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionEncounter" ADD CONSTRAINT "QuestionsQuestionEncounter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionEncounter" ADD CONSTRAINT "QuestionsQuestionEncounter_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionVote" ADD CONSTRAINT "QuestionsQuestionVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionVote" ADD CONSTRAINT "QuestionsQuestionVote_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionComment" ADD CONSTRAINT "QuestionsQuestionComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionComment" ADD CONSTRAINT "QuestionsQuestionComment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionCommentVote" ADD CONSTRAINT "QuestionsQuestionCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsQuestionCommentVote" ADD CONSTRAINT "QuestionsQuestionCommentVote_questionCommentId_fkey" FOREIGN KEY ("questionCommentId") REFERENCES "QuestionsQuestionComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswer" ADD CONSTRAINT "QuestionsAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswer" ADD CONSTRAINT "QuestionsAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswerVote" ADD CONSTRAINT "QuestionsAnswerVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswerVote" ADD CONSTRAINT "QuestionsAnswerVote_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "QuestionsAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswerComment" ADD CONSTRAINT "QuestionsAnswerComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswerComment" ADD CONSTRAINT "QuestionsAnswerComment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "QuestionsAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswerCommentVote" ADD CONSTRAINT "QuestionsAnswerCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswerCommentVote" ADD CONSTRAINT "QuestionsAnswerCommentVote_answerCommentId_fkey" FOREIGN KEY ("answerCommentId") REFERENCES "QuestionsAnswerComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
