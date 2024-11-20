-- CreateTable
CREATE TABLE "RefreshTokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identity" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("id")
);
