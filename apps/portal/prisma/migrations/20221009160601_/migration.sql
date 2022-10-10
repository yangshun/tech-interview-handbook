-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('INTERN', 'FULLTIME');

-- CreateTable
CREATE TABLE "OffersProfile" (
    "id" TEXT NOT NULL,
    "profileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editToken" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "OffersProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersBackground" (
    "id" TEXT NOT NULL,
    "totalYoe" INTEGER,
    "offersProfileId" TEXT NOT NULL,

    CONSTRAINT "OffersBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersSpecificYoe" (
    "id" TEXT NOT NULL,
    "yoe" INTEGER NOT NULL,
    "domain" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,

    CONSTRAINT "OffersSpecificYoe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersExperience" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "jobType" "JobType",
    "title" TEXT,
    "durationInMonths" INTEGER,
    "specialization" TEXT,
    "level" TEXT,
    "totalCompensationId" TEXT,
    "monthlySalaryId" TEXT,
    "backgroundId" TEXT NOT NULL,

    CONSTRAINT "OffersExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersCurrency" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "OffersCurrency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersEducation" (
    "id" TEXT NOT NULL,
    "type" TEXT,
    "field" TEXT,
    "isAttending" BOOLEAN,
    "school" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "backgroundId" TEXT NOT NULL,

    CONSTRAINT "OffersEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersReply" (
    "id" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "replyingToId" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "OffersReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersOffer" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "monthYearReceived" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "negotiationStrategy" TEXT,
    "comments" TEXT,
    "jobType" "JobType" NOT NULL,

    CONSTRAINT "OffersOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffersIntern" (
    "offerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "internshipCycle" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "monthlySalaryId" TEXT NOT NULL,

    CONSTRAINT "OffersIntern_pkey" PRIMARY KEY ("offerId")
);

-- CreateTable
CREATE TABLE "OffersFullTime" (
    "offerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "totalCompensationId" TEXT NOT NULL,
    "baseSalaryId" TEXT NOT NULL,
    "bonusId" TEXT NOT NULL,
    "stocksId" TEXT NOT NULL,

    CONSTRAINT "OffersFullTime_pkey" PRIMARY KEY ("offerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "OffersBackground_offersProfileId_key" ON "OffersBackground"("offersProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersExperience_totalCompensationId_key" ON "OffersExperience"("totalCompensationId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersExperience_monthlySalaryId_key" ON "OffersExperience"("monthlySalaryId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersIntern_monthlySalaryId_key" ON "OffersIntern"("monthlySalaryId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersFullTime_totalCompensationId_key" ON "OffersFullTime"("totalCompensationId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersFullTime_baseSalaryId_key" ON "OffersFullTime"("baseSalaryId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersFullTime_bonusId_key" ON "OffersFullTime"("bonusId");

-- CreateIndex
CREATE UNIQUE INDEX "OffersFullTime_stocksId_key" ON "OffersFullTime"("stocksId");

-- AddForeignKey
ALTER TABLE "OffersProfile" ADD CONSTRAINT "OffersProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersBackground" ADD CONSTRAINT "OffersBackground_offersProfileId_fkey" FOREIGN KEY ("offersProfileId") REFERENCES "OffersProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersSpecificYoe" ADD CONSTRAINT "OffersSpecificYoe_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "OffersBackground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersExperience" ADD CONSTRAINT "OffersExperience_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersExperience" ADD CONSTRAINT "OffersExperience_totalCompensationId_fkey" FOREIGN KEY ("totalCompensationId") REFERENCES "OffersCurrency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersExperience" ADD CONSTRAINT "OffersExperience_monthlySalaryId_fkey" FOREIGN KEY ("monthlySalaryId") REFERENCES "OffersCurrency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersExperience" ADD CONSTRAINT "OffersExperience_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "OffersBackground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersEducation" ADD CONSTRAINT "OffersEducation_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "OffersBackground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersReply" ADD CONSTRAINT "OffersReply_replyingToId_fkey" FOREIGN KEY ("replyingToId") REFERENCES "OffersReply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersReply" ADD CONSTRAINT "OffersReply_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "OffersProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersOffer" ADD CONSTRAINT "OffersOffer_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "OffersProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersOffer" ADD CONSTRAINT "OffersOffer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersIntern" ADD CONSTRAINT "OffersIntern_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "OffersOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersIntern" ADD CONSTRAINT "OffersIntern_monthlySalaryId_fkey" FOREIGN KEY ("monthlySalaryId") REFERENCES "OffersCurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "OffersOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_totalCompensationId_fkey" FOREIGN KEY ("totalCompensationId") REFERENCES "OffersCurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_baseSalaryId_fkey" FOREIGN KEY ("baseSalaryId") REFERENCES "OffersCurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_bonusId_fkey" FOREIGN KEY ("bonusId") REFERENCES "OffersCurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffersFullTime" ADD CONSTRAINT "OffersFullTime_stocksId_fkey" FOREIGN KEY ("stocksId") REFERENCES "OffersCurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
