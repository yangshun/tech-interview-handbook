/*
  Warnings:

  - Made the column `totalYoe` on table `OffersBackground` required. This step will fail if there are existing NULL values in that column.
  - Made the column `negotiationStrategy` on table `OffersOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comments` on table `OffersOffer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OffersBackground" ALTER COLUMN "totalYoe" SET NOT NULL;

-- AlterTable
ALTER TABLE "OffersOffer" ALTER COLUMN "negotiationStrategy" SET NOT NULL,
ALTER COLUMN "comments" SET NOT NULL;
