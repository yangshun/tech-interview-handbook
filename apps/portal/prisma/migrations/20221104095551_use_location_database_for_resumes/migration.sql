/*
  Warnings:

  - You are about to drop the column `location` on the `ResumesResume` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `ResumesResume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable. Set default location to Singapore.
ALTER TABLE "ResumesResume" DROP COLUMN "location",
ADD COLUMN     "locationId" TEXT NOT NULL DEFAULT '196';

-- AddForeignKey
ALTER TABLE "ResumesResume" ADD CONSTRAINT "ResumesResume_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
