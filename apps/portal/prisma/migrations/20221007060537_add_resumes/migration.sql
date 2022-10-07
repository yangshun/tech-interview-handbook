-- CreateEnum
CREATE TYPE "ResumesSection" AS ENUM ('GENERAL', 'EDUCATION', 'EXPERIENCE', 'PROJECTS', 'SKILLS');

-- CreateTable
CREATE TABLE "ResumesProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResumesProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumesResume" (
    "id" TEXT NOT NULL,
    "resumesProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumesResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumesStar" (
    "id" TEXT NOT NULL,
    "resumesProfileId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumesStar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumesComment" (
    "id" TEXT NOT NULL,
    "resumesProfileId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "section" "ResumesSection" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumesComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumesCommentVote" (
    "id" TEXT NOT NULL,
    "resumesProfileId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumesCommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumesProfile_userId_key" ON "ResumesProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumesStar_resumeId_resumesProfileId_key" ON "ResumesStar"("resumeId", "resumesProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumesCommentVote_commentId_resumesProfileId_key" ON "ResumesCommentVote"("commentId", "resumesProfileId");

-- AddForeignKey
ALTER TABLE "ResumesProfile" ADD CONSTRAINT "ResumesProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesResume" ADD CONSTRAINT "ResumesResume_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesStar" ADD CONSTRAINT "ResumesStar_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesStar" ADD CONSTRAINT "ResumesStar_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "ResumesResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesComment" ADD CONSTRAINT "ResumesComment_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesComment" ADD CONSTRAINT "ResumesComment_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "ResumesResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesCommentVote" ADD CONSTRAINT "ResumesCommentVote_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesCommentVote" ADD CONSTRAINT "ResumesCommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ResumesComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;