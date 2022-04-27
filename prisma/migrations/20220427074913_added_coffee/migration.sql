-- CreateTable
CREATE TABLE "Coffee" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
