/*
  Warnings:

  - You are about to drop the column `specialization` on the `OffersExperience` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `OffersFullTime` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `OffersIntern` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OffersExperience" DROP COLUMN "specialization";

-- AlterTable
ALTER TABLE "OffersFullTime" DROP COLUMN "specialization",
ALTER COLUMN "baseSalaryId" DROP NOT NULL,
ALTER COLUMN "bonusId" DROP NOT NULL,
ALTER COLUMN "stocksId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OffersIntern" DROP COLUMN "specialization";
