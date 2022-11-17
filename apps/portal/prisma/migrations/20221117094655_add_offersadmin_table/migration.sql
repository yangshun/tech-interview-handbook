-- CreateTable
CREATE TABLE "OffersAdmin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OffersAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OffersAdmin_userId_key" ON "OffersAdmin"("userId");

-- AddForeignKey
ALTER TABLE "OffersAdmin" ADD CONSTRAINT "OffersAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
