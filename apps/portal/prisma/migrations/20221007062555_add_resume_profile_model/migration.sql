/*
  Warnings:

  - You are about to drop the column `userId` on the `ResumesComment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ResumesCommentVote` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ResumesResume` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ResumesStar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentId,resumesProfileId]` on the table `ResumesCommentVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resumeId,resumesProfileId]` on the table `ResumesStar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resumesProfileId` to the `ResumesComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumesProfileId` to the `ResumesCommentVote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumesProfileId` to the `ResumesResume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumesProfileId` to the `ResumesStar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResumesComment" DROP CONSTRAINT "ResumesComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResumesCommentVote" DROP CONSTRAINT "ResumesCommentVote_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResumesResume" DROP CONSTRAINT "ResumesResume_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResumesStar" DROP CONSTRAINT "ResumesStar_userId_fkey";

-- AlterTable
ALTER TABLE "ResumesComment" DROP COLUMN "userId",
ADD COLUMN     "resumesProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResumesCommentVote" DROP COLUMN "userId",
ADD COLUMN     "resumesProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResumesResume" DROP COLUMN "userId",
ADD COLUMN     "resumesProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResumesStar" DROP COLUMN "userId",
ADD COLUMN     "resumesProfileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ResumesProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResumesProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumesProfile_userId_key" ON "ResumesProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumesCommentVote_commentId_resumesProfileId_key" ON "ResumesCommentVote"("commentId", "resumesProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumesStar_resumeId_resumesProfileId_key" ON "ResumesStar"("resumeId", "resumesProfileId");

-- AddForeignKey
ALTER TABLE "ResumesProfile" ADD CONSTRAINT "ResumesProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesResume" ADD CONSTRAINT "ResumesResume_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesStar" ADD CONSTRAINT "ResumesStar_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesComment" ADD CONSTRAINT "ResumesComment_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesCommentVote" ADD CONSTRAINT "ResumesCommentVote_resumesProfileId_fkey" FOREIGN KEY ("resumesProfileId") REFERENCES "ResumesProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
