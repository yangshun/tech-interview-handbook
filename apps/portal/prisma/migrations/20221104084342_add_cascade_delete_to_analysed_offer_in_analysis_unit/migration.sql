-- DropForeignKey
ALTER TABLE "OffersAnalysisUnit" DROP CONSTRAINT "OffersAnalysisUnit_analysedOfferId_fkey";

-- AddForeignKey
ALTER TABLE "OffersAnalysisUnit" ADD CONSTRAINT "OffersAnalysisUnit_analysedOfferId_fkey" FOREIGN KEY ("analysedOfferId") REFERENCES "OffersOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
