/*
  Warnings:

  - You are about to drop the column `companyName` on the `OffersAnalysisUnit` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `OffersAnalysisUnit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OffersAnalysisUnit" DROP COLUMN "companyName",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OffersAnalysisUnit" ADD CONSTRAINT "OffersAnalysisUnit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
