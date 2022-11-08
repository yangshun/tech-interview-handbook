-- DropForeignKey
ALTER TABLE "ResumesComment" DROP CONSTRAINT "ResumesComment_parentId_fkey";

-- AddForeignKey
ALTER TABLE "ResumesComment" ADD CONSTRAINT "ResumesComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ResumesComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
