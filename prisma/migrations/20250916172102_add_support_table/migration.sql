-- CreateTable
CREATE TABLE "Support" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Support_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Support" ADD CONSTRAINT "Support_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
