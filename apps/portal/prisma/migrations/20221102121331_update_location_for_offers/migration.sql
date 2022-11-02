/*
  Warnings:

  - You are about to drop the column `location` on the `OffersExperience` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `OffersOffer` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `OffersOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OffersExperience" DROP COLUMN "location",
ADD COLUMN     "cityId" TEXT;

-- AlterTable
ALTER TABLE "OffersOffer" DROP COLUMN "location",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OffersExperience" ADD CONSTRAINT "OffersExperience_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersOffer" ADD CONSTRAINT "OffersOffer_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
