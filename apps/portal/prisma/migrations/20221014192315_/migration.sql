-- CreateTable
CREATE TABLE "OffersAnalysis" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "overallPercentile" INTEGER NOT NULL,
    "noOfSimilarOffers" INTEGER NOT NULL,
    "companyPercentile" INTEGER NOT NULL,
    "noOfSimilarCompanyOffers" INTEGER NOT NULL,

    CONSTRAINT "OffersAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TopOverallOffers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TopCompanyOffers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OffersAnalysis_profileId_key" ON "OffersAnalysis"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersAnalysis_offerId_key" ON "OffersAnalysis"("offerId");

-- CreateIndex
CREATE UNIQUE INDEX "_TopOverallOffers_AB_unique" ON "_TopOverallOffers"("A", "B");

-- CreateIndex
CREATE INDEX "_TopOverallOffers_B_index" ON "_TopOverallOffers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TopCompanyOffers_AB_unique" ON "_TopCompanyOffers"("A", "B");

-- CreateIndex
CREATE INDEX "_TopCompanyOffers_B_index" ON "_TopCompanyOffers"("B");

-- AddForeignKey
ALTER TABLE "OffersAnalysis" ADD CONSTRAINT "OffersAnalysis_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "OffersProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersAnalysis" ADD CONSTRAINT "OffersAnalysis_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "OffersOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopOverallOffers" ADD CONSTRAINT "_TopOverallOffers_A_fkey" FOREIGN KEY ("A") REFERENCES "OffersAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopOverallOffers" ADD CONSTRAINT "_TopOverallOffers_B_fkey" FOREIGN KEY ("B") REFERENCES "OffersOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopCompanyOffers" ADD CONSTRAINT "_TopCompanyOffers_A_fkey" FOREIGN KEY ("A") REFERENCES "OffersAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopCompanyOffers" ADD CONSTRAINT "_TopCompanyOffers_B_fkey" FOREIGN KEY ("B") REFERENCES "OffersOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
