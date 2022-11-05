-- DropForeignKey
ALTER TABLE "OffersAnalysis" DROP CONSTRAINT "OffersAnalysis_overallAnalysisUnitId_fkey";

-- AddForeignKey
ALTER TABLE "OffersAnalysis" ADD CONSTRAINT "OffersAnalysis_overallAnalysisUnitId_fkey" FOREIGN KEY ("overallAnalysisUnitId") REFERENCES "OffersAnalysisUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
