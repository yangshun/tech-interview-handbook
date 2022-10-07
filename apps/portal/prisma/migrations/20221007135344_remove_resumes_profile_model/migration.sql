/*
  Warnings:

  - You are about to drop the column `resumesProfileId` on the `ResumesComment` table. All the data in the column will be lost.
  - You are about to drop the column `resumesProfileId` on the `ResumesCommentVote` table. All the data in the column will be lost.
  - You are about to drop the column `resumesProfileId` on the `ResumesResume` table. All the data in the column will be lost.
  - You are about to drop the column `resumesProfileId` on the `ResumesStar` table. All the data in the column will be lost.
  - You are about to drop the `ResumesProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,commentId]` on the table `ResumesCommentVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,resumeId]` on the table `ResumesStar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ResumesComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ResumesCommentVote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ResumesResume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ResumesStar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResumesComment" DROP CONSTRAINT "ResumesComment_resumesProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ResumesCommentVote" DROP CONSTRAINT "ResumesCommentVote_resumesProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ResumesProfile" DROP CONSTRAINT "ResumesProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResumesResume" DROP CONSTRAINT "ResumesResume_resumesProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ResumesStar" DROP CONSTRAINT "ResumesStar_resumesProfileId_fkey";

-- DropIndex
DROP INDEX "ResumesCommentVote_commentId_resumesProfileId_key";

-- DropIndex
DROP INDEX "ResumesStar_resumeId_resumesProfileId_key";

-- AlterTable
ALTER TABLE "ResumesComment" DROP COLUMN "resumesProfileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResumesCommentVote" DROP COLUMN "resumesProfileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResumesResume" DROP COLUMN "resumesProfileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResumesStar" DROP COLUMN "resumesProfileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ResumesProfile";

-- CreateIndex
CREATE UNIQUE INDEX "ResumesCommentVote_userId_commentId_key" ON "ResumesCommentVote"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumesStar_userId_resumeId_key" ON "ResumesStar"("userId", "resumeId");

-- AddForeignKey
ALTER TABLE "ResumesResume" ADD CONSTRAINT "ResumesResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesStar" ADD CONSTRAINT "ResumesStar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesComment" ADD CONSTRAINT "ResumesComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumesCommentVote" ADD CONSTRAINT "ResumesCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
