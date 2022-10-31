/*
  Warnings:

  - You are about to drop the column `companyPercentile` on the `OffersAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `noOfSimilarCompanyOffers` on the `OffersAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `noOfSimilarOffers` on the `OffersAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `overallPercentile` on the `OffersAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OffersProfile` table. All the data in the column will be lost.
  - You are about to drop the `_TopCompanyOffers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TopOverallOffers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `overallAnalysisUnitId` to the `OffersAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OffersAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OffersProfile" DROP CONSTRAINT "OffersProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TopCompanyOffers" DROP CONSTRAINT "_TopCompanyOffers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TopCompanyOffers" DROP CONSTRAINT "_TopCompanyOffers_B_fkey";

-- DropForeignKey
ALTER TABLE "_TopOverallOffers" DROP CONSTRAINT "_TopOverallOffers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TopOverallOffers" DROP CONSTRAINT "_TopOverallOffers_B_fkey";

-- AlterTable
ALTER TABLE "OffersAnalysis" DROP COLUMN "companyPercentile",
DROP COLUMN "noOfSimilarCompanyOffers",
DROP COLUMN "noOfSimilarOffers",
DROP COLUMN "overallPercentile",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "overallAnalysisUnitId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OffersProfile" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_TopCompanyOffers";

-- DropTable
DROP TABLE "_TopOverallOffers";

-- CreateTable
CREATE TABLE "OffersAnalysisUnit" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "percentile" DOUBLE PRECISION NOT NULL,
    "noOfSimilarOffers" INTEGER NOT NULL,

    CONSTRAINT "OffersAnalysisUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OffersProfileToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CompanyAnalysis" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OffersAnalysisUnitToOffersOffer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OffersProfileToUser_AB_unique" ON "_OffersProfileToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OffersProfileToUser_B_index" ON "_OffersProfileToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyAnalysis_AB_unique" ON "_CompanyAnalysis"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyAnalysis_B_index" ON "_CompanyAnalysis"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OffersAnalysisUnitToOffersOffer_AB_unique" ON "_OffersAnalysisUnitToOffersOffer"("A", "B");

-- CreateIndex
CREATE INDEX "_OffersAnalysisUnitToOffersOffer_B_index" ON "_OffersAnalysisUnitToOffersOffer"("B");

-- AddForeignKey
ALTER TABLE "OffersAnalysis" ADD CONSTRAINT "OffersAnalysis_overallAnalysisUnitId_fkey" FOREIGN KEY ("overallAnalysisUnitId") REFERENCES "OffersAnalysisUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OffersProfileToUser" ADD CONSTRAINT "_OffersProfileToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "OffersProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OffersProfileToUser" ADD CONSTRAINT "_OffersProfileToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyAnalysis" ADD CONSTRAINT "_CompanyAnalysis_A_fkey" FOREIGN KEY ("A") REFERENCES "OffersAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyAnalysis" ADD CONSTRAINT "_CompanyAnalysis_B_fkey" FOREIGN KEY ("B") REFERENCES "OffersAnalysisUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OffersAnalysisUnitToOffersOffer" ADD CONSTRAINT "_OffersAnalysisUnitToOffersOffer_A_fkey" FOREIGN KEY ("A") REFERENCES "OffersAnalysisUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OffersAnalysisUnitToOffersOffer" ADD CONSTRAINT "_OffersAnalysisUnitToOffersOffer_B_fkey" FOREIGN KEY ("B") REFERENCES "OffersOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
