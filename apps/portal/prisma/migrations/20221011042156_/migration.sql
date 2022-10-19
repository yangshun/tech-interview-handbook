/*
  Warnings:

  - You are about to drop the column `isAttending` on the `OffersEducation` table. All the data in the column will be lost.
  - The primary key for the `OffersFullTime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `offerId` on the `OffersFullTime` table. All the data in the column will be lost.
  - The primary key for the `OffersIntern` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `offerId` on the `OffersIntern` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[offersInternId]` on the table `OffersOffer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[offersFullTimeId]` on the table `OffersOffer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileName]` on the table `OffersProfile` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `OffersFullTime` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `OffersIntern` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "OffersBackground" DROP CONSTRAINT "OffersBackground_offersProfileId_fkey";

-- DropForeignKey
ALTER TABLE "OffersEducation" DROP CONSTRAINT "OffersEducation_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "OffersExperience" DROP CONSTRAINT "OffersExperience_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "OffersFullTime" DROP CONSTRAINT "OffersFullTime_baseSalaryId_fkey";

-- DropForeignKey
ALTER TABLE "OffersFullTime" DROP CONSTRAINT "OffersFullTime_bonusId_fkey";

-- DropForeignKey
ALTER TABLE "OffersFullTime" DROP CONSTRAINT "OffersFullTime_offerId_fkey";

-- DropForeignKey
ALTER TABLE "OffersFullTime" DROP CONSTRAINT "OffersFullTime_stocksId_fkey";

-- DropForeignKey
ALTER TABLE "OffersFullTime" DROP CONSTRAINT "OffersFullTime_totalCompensationId_fkey";

-- DropForeignKey
ALTER TABLE "OffersIntern" DROP CONSTRAINT "OffersIntern_monthlySalaryId_fkey";

-- DropForeignKey
ALTER TABLE "OffersIntern" DROP CONSTRAINT "OffersIntern_offerId_fkey";

-- DropForeignKey
ALTER TABLE "OffersOffer" DROP CONSTRAINT "OffersOffer_profileId_fkey";

-- DropForeignKey
ALTER TABLE "OffersReply" DROP CONSTRAINT "OffersReply_profileId_fkey";

-- DropForeignKey
ALTER TABLE "OffersSpecificYoe" DROP CONSTRAINT "OffersSpecificYoe_backgroundId_fkey";

-- AlterTable
ALTER TABLE "OffersEducation" DROP COLUMN "isAttending";

-- AlterTable
ALTER TABLE "OffersFullTime" DROP CONSTRAINT "OffersFullTime_pkey",
DROP COLUMN "offerId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "OffersFullTime_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OffersIntern" DROP CONSTRAINT "OffersIntern_pkey",
DROP COLUMN "offerId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "OffersIntern_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OffersOffer" ADD COLUMN     "offersFullTimeId" TEXT,
ADD COLUMN     "offersInternId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OffersOffer_offersInternId_key" ON "OffersOffer"("offersInternId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersOffer_offersFullTimeId_key" ON "OffersOffer"("offersFullTimeId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersProfile_profileName_key" ON "OffersProfile"("profileName");

-- AddForeignKey
ALTER TABLE "OffersBackground" ADD CONSTRAINT "OffersBackground_offersProfileId_fkey" FOREIGN KEY ("offersProfileId") REFERENCES "OffersProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersSpecificYoe" ADD CONSTRAINT "OffersSpecificYoe_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "OffersBackground"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersExperience" ADD CONSTRAINT "OffersExperience_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "OffersBackground"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersEducation" ADD CONSTRAINT "OffersEducation_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "OffersBackground"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersReply" ADD CONSTRAINT "OffersReply_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "OffersProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersOffer" ADD CONSTRAINT "OffersOffer_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "OffersProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersOffer" ADD CONSTRAINT "OffersOffer_offersInternId_fkey" FOREIGN KEY ("offersInternId") REFERENCES "OffersIntern"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersOffer" ADD CONSTRAINT "OffersOffer_offersFullTimeId_fkey" FOREIGN KEY ("offersFullTimeId") REFERENCES "OffersFullTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersIntern" ADD CONSTRAINT "OffersIntern_monthlySalaryId_fkey" FOREIGN KEY ("monthlySalaryId") REFERENCES "OffersCurrency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_totalCompensationId_fkey" FOREIGN KEY ("totalCompensationId") REFERENCES "OffersCurrency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_baseSalaryId_fkey" FOREIGN KEY ("baseSalaryId") REFERENCES "OffersCurrency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_bonusId_fkey" FOREIGN KEY ("bonusId") REFERENCES "OffersCurrency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_stocksId_fkey" FOREIGN KEY ("stocksId") REFERENCES "OffersCurrency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
