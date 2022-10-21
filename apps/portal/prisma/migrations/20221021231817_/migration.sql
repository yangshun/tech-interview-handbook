/*
  Warnings:

  - Added the required column `baseValue` to the `OffersCurrency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OffersCurrency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OffersCurrency" ADD COLUMN     "baseCurrency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "baseValue" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
