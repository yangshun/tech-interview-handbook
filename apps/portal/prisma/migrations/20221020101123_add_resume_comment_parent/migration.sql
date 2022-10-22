-- AlterTable
ALTER TABLE "ResumesComment" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "ResumesComment" ADD CONSTRAINT "ResumesComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ResumesComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
