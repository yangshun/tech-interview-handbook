-- DropForeignKey
ALTER TABLE "OffersAnalysis" DROP CONSTRAINT "OffersAnalysis_offerId_fkey";

-- DropForeignKey
ALTER TABLE "OffersAnalysis" DROP CONSTRAINT "OffersAnalysis_profileId_fkey";

-- AddForeignKey
ALTER TABLE "OffersAnalysis" ADD CONSTRAINT "OffersAnalysis_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "OffersProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersAnalysis" ADD CONSTRAINT "OffersAnalysis_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "OffersOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
