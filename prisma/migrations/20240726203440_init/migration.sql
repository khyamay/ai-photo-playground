-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "restoredUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
